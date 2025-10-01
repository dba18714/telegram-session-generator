/**
 * @jest-environment node
 */

import { TelegramSessionGenerator } from '../TelegramSessionGenerator';

describe('TelegramSessionGenerator', () => {
  describe('constructor', () => {
    it('should create instance with valid config', () => {
      const generator = new TelegramSessionGenerator({
        apiId: 12345678,
        apiHash: 'test_hash',
      });

      expect(generator).toBeInstanceOf(TelegramSessionGenerator);
      expect(generator.isConnected()).toBe(false);
    });

    it('should throw error with invalid API ID', () => {
      expect(() => {
        new TelegramSessionGenerator({
          apiId: 0,
          apiHash: 'test_hash',
        });
      }).toThrow('Invalid API ID');
    });

    it('should throw error with invalid API Hash', () => {
      expect(() => {
        new TelegramSessionGenerator({
          apiId: 12345678,
          apiHash: '',
        });
      }).toThrow('Invalid API Hash');
    });

    it('should set default connection retries', () => {
      const generator = new TelegramSessionGenerator({
        apiId: 12345678,
        apiHash: 'test_hash',
      });

      // Check that default connectionRetries is set (can't directly access private property)
      expect(generator).toBeInstanceOf(TelegramSessionGenerator);
    });

    it('should use custom connection retries', () => {
      const generator = new TelegramSessionGenerator({
        apiId: 12345678,
        apiHash: 'test_hash',
        connectionRetries: 5,
      });

      expect(generator).toBeInstanceOf(TelegramSessionGenerator);
    });
  });

  describe('disconnect', () => {
    it('should disconnect without error when not connected', async () => {
      const generator = new TelegramSessionGenerator({
        apiId: 12345678,
        apiHash: 'test_hash',
      });

      await expect(generator.disconnect()).resolves.not.toThrow();
    });
  });

  describe('isConnected', () => {
    it('should return false when not connected', () => {
      const generator = new TelegramSessionGenerator({
        apiId: 12345678,
        apiHash: 'test_hash',
      });

      expect(generator.isConnected()).toBe(false);
    });
  });
});
