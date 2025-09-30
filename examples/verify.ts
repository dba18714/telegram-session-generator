/**
 * Verify existing session string example
 */

import { TelegramSessionManager } from '../src';

async function main() {
  const apiId = parseInt(process.env.TELEGRAM_API_ID || '0', 10);
  const apiHash = process.env.TELEGRAM_API_HASH || '';
  const sessionString = process.env.TELEGRAM_SESSION_STRING || '';

  if (!apiId || !apiHash) {
    console.error('❌ Please set TELEGRAM_API_ID and TELEGRAM_API_HASH environment variables');
    process.exit(1);
  }

  if (!sessionString) {
    console.error('❌ Please set TELEGRAM_SESSION_STRING environment variable');
    process.exit(1);
  }

  const manager = new TelegramSessionManager({ apiId, apiHash });

  console.log('🔍 Verifying session string...\n');

  try {
    // Verify the session
    const result = await manager.verifySession(sessionString);

    if (result.success) {
      console.log('✅ Session is valid!');

      // Get user info
      const userInfo = await manager.getUserInfo(sessionString);
      if (userInfo) {
        console.log('\n👤 Logged in as:');
        console.log(
          `   Name: ${userInfo.firstName}${userInfo.lastName ? ' ' + userInfo.lastName : ''}`
        );
        console.log(`   ID: ${userInfo.id}`);
        if (userInfo.username) {
          console.log(`   Username: @${userInfo.username}`);
        }
        if (userInfo.phone) {
          console.log(`   Phone: ${userInfo.phone}`);
        }
      }
    } else {
      console.log('❌ Session is invalid:', result.error);
    }
  } catch (error) {
    console.error('❌ Error verifying session:', error);
  } finally {
    await manager.disconnect();
  }
}

// Set environment variables before running:
// export TELEGRAM_API_ID="your_api_id"
// export TELEGRAM_API_HASH="your_api_hash"
// export TELEGRAM_SESSION_STRING="your_session_string"

main().catch(console.error);
