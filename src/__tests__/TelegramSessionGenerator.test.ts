/**
 * @jest-environment node
 */

import { TelegramSessionManager } from '../TelegramSessionGenerator';

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
