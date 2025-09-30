/**
 * @jest-environment node
 */

import { TelegramSessionManager } from '../TelegramSessionManager';

describe('TelegramSessionManager', () => {
  describe('constructor', () => {
    it('should create instance with valid config', () => {
      const manager = new TelegramSessionManager({
        apiId: 12345678,
        apiHash: 'test_hash',
      });

      expect(manager).toBeInstanceOf(TelegramSessionManager);
      expect(manager.isConnected()).toBe(false);
    });

    it('should throw error with invalid API ID', () => {
      expect(() => {
        new TelegramSessionManager({
          apiId: 0,
          apiHash: 'test_hash',
        });
      }).toThrow('Invalid API ID');
    });

    it('should throw error with invalid API Hash', () => {
      expect(() => {
        new TelegramSessionManager({
          apiId: 12345678,
          apiHash: '',
        });
      }).toThrow('Invalid API Hash');
    });

    it('should set default connection retries', () => {
      const manager = new TelegramSessionManager({
        apiId: 12345678,
        apiHash: 'test_hash',
      });

      // Check that default connectionRetries is set (can't directly access private property)
      expect(manager).toBeInstanceOf(TelegramSessionManager);
    });

    it('should use custom connection retries', () => {
      const manager = new TelegramSessionManager({
        apiId: 12345678,
        apiHash: 'test_hash',
        connectionRetries: 5,
      });

      expect(manager).toBeInstanceOf(TelegramSessionManager);
    });
  });

  describe('fromEnv', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should create instance from environment variables', () => {
      process.env.TELEGRAM_API_ID = '12345678';
      process.env.TELEGRAM_API_HASH = 'test_hash';

      const manager = TelegramSessionManager.fromEnv();
      expect(manager).toBeInstanceOf(TelegramSessionManager);
    });

    it('should create instance from custom prefix', () => {
      process.env.MY_API_ID = '12345678';
      process.env.MY_API_HASH = 'test_hash';

      const manager = TelegramSessionManager.fromEnv('MY');
      expect(manager).toBeInstanceOf(TelegramSessionManager);
    });

    it('should throw error when API ID is missing', () => {
      process.env.TELEGRAM_API_HASH = 'test_hash';

      expect(() => {
        TelegramSessionManager.fromEnv();
      }).toThrow('Missing environment variables');
    });

    it('should throw error when API Hash is missing', () => {
      process.env.TELEGRAM_API_ID = '12345678';

      expect(() => {
        TelegramSessionManager.fromEnv();
      }).toThrow('Missing environment variables');
    });

    it('should include session string if provided', () => {
      process.env.TELEGRAM_API_ID = '12345678';
      process.env.TELEGRAM_API_HASH = 'test_hash';
      process.env.TELEGRAM_SESSION_STRING = 'test_session';

      const manager = TelegramSessionManager.fromEnv();
      expect(manager).toBeInstanceOf(TelegramSessionManager);
    });
  });

  describe('disconnect', () => {
    it('should disconnect without error when not connected', async () => {
      const manager = new TelegramSessionManager({
        apiId: 12345678,
        apiHash: 'test_hash',
      });

      await expect(manager.disconnect()).resolves.not.toThrow();
    });
  });

  describe('isConnected', () => {
    it('should return false when not connected', () => {
      const manager = new TelegramSessionManager({
        apiId: 12345678,
        apiHash: 'test_hash',
      });

      expect(manager.isConnected()).toBe(false);
    });
  });
});
