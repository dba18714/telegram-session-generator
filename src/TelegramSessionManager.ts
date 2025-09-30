import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { TelegramSessionConfig, AuthenticationOptions, SessionResult, UserInfo } from './types';

/**
 * TelegramSessionManager - A class to manage Telegram session creation and authentication
 */
export class TelegramSessionManager {
  private client: TelegramClient | null = null;
  private config: TelegramSessionConfig;

  constructor(config: TelegramSessionConfig) {
    this.validateConfig(config);
    this.config = {
      connectionRetries: 3,
      ...config,
    };
  }

  /**
   * Validate the configuration
   */
  private validateConfig(config: TelegramSessionConfig): void {
    if (!config.apiId || config.apiId <= 0) {
      throw new Error('Invalid API ID. Please provide a valid Telegram API ID.');
    }

    if (!config.apiHash || config.apiHash.trim() === '') {
      throw new Error('Invalid API Hash. Please provide a valid Telegram API Hash.');
    }
  }

  /**
   * Create a new session string through interactive authentication
   */
  async createSession(options: AuthenticationOptions = {}): Promise<SessionResult> {
    try {
      // Create client with empty session
      this.client = new TelegramClient(
        new StringSession(this.config.sessionString || ''),
        this.config.apiId,
        this.config.apiHash,
        {
          connectionRetries: this.config.connectionRetries!,
        }
      );

      // Start authentication process
      await this.client.start({
        phoneNumber: options.phoneNumber || this.defaultPhonePrompt,
        phoneCode: options.phoneCode || this.defaultCodePrompt,
        password: options.password || this.defaultPasswordPrompt,
        onError: options.onError || this.defaultErrorHandler,
      });

      // Get session string
      const sessionString = this.client.session.save() as unknown as string;

      return {
        sessionString,
        success: true,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        sessionString: '',
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Verify an existing session string
   */
  async verifySession(sessionString: string): Promise<SessionResult> {
    try {
      const client = new TelegramClient(
        new StringSession(sessionString),
        this.config.apiId,
        this.config.apiHash,
        {
          connectionRetries: this.config.connectionRetries!,
        }
      );

      await client.connect();

      // Try to get current user info to verify session
      await client.getMe();

      await client.disconnect();

      return {
        sessionString,
        success: true,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Session verification failed';
      return {
        sessionString,
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Get user information from session string
   */
  async getUserInfo(sessionString?: string): Promise<UserInfo | null> {
    try {
      const session = sessionString || this.config.sessionString;
      if (!session) {
        throw new Error('No session string provided');
      }

      const client = new TelegramClient(
        new StringSession(session),
        this.config.apiId,
        this.config.apiHash,
        {
          connectionRetries: this.config.connectionRetries!,
        }
      );

      await client.connect();
      const me = await client.getMe();
      await client.disconnect();

      return {
        id: me.id.toString(),
        firstName: me.firstName || '',
        lastName: me.lastName || undefined,
        username: me.username || undefined,
        phone: me.phone || undefined,
      };
    } catch (error) {
      console.error('Failed to get user info:', error);
      return null;
    }
  }

  /**
   * Disconnect the current client
   */
  async disconnect(): Promise<void> {
    if (this.client && this.client.connected) {
      await this.client.disconnect();
    }
  }

  /**
   * Check if client is connected
   */
  isConnected(): boolean {
    return this.client?.connected || false;
  }

  /**
   * Default phone number prompt (throws error - must be overridden)
   */
  private defaultPhonePrompt = async (): Promise<string> => {
    throw new Error(
      'Phone number prompt not provided. Please provide a phoneNumber function in AuthenticationOptions.'
    );
  };

  /**
   * Default verification code prompt (throws error - must be overridden)
   */
  private defaultCodePrompt = async (): Promise<string> => {
    throw new Error(
      'Verification code prompt not provided. Please provide a phoneCode function in AuthenticationOptions.'
    );
  };

  /**
   * Default password prompt (returns empty string)
   */
  private defaultPasswordPrompt = async (): Promise<string> => {
    return '';
  };

  /**
   * Default error handler
   */
  private defaultErrorHandler = (error: Error): void => {
    console.error('Authentication error:', error.message);
  };

  /**
   * Static method to create session manager from environment variables
   */
  static fromEnv(envPrefix = 'TELEGRAM'): TelegramSessionManager {
    const apiId = parseInt(process.env[`${envPrefix}_API_ID`] || '0', 10);
    const apiHash = process.env[`${envPrefix}_API_HASH`];
    const sessionString = process.env[`${envPrefix}_SESSION_STRING`];

    if (!apiId || !apiHash) {
      throw new Error(
        `Missing environment variables. Please set ${envPrefix}_API_ID and ${envPrefix}_API_HASH`
      );
    }

    return new TelegramSessionManager({
      apiId,
      apiHash,
      sessionString,
    });
  }
}
