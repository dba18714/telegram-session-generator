/**
 * Telegram Session Generator Types
 */

export interface TelegramSessionConfig {
  /** Telegram API ID from https://my.telegram.org */
  apiId: number;
  /** Telegram API Hash from https://my.telegram.org */
  apiHash: string;
  /** Connection retry attempts (default: 3) */
  connectionRetries?: number;
  /** Custom session string (optional) */
  sessionString?: string | undefined;
}

export interface AuthenticationOptions {
  /** Phone number prompt function */
  phoneNumber?: () => Promise<string>;
  /** Verification code prompt function */
  phoneCode?: () => Promise<string>;
  /** Two-factor authentication password prompt function */
  password?: () => Promise<string>;
  /** Error handler function */
  onError?: (error: Error) => void;
}

export interface SessionResult {
  /** Generated session string */
  sessionString: string;
  /** Whether authentication was successful */
  success: boolean;
  /** Error message if authentication failed */
  error?: string;
}

export interface UserInfo {
  /** User ID */
  id: string;
  /** First name */
  firstName: string;
  /** Last name (optional) */
  lastName?: string | undefined;
  /** Username (optional) */
  username?: string | undefined;
  /** Phone number */
  phone?: string | undefined;
}
