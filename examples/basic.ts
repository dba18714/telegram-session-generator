/**
 * Basic example of using Telegram Session Manager
 */

import { TelegramSessionManager } from '../src';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(prompt, answer => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  try {
    // Create manager from environment variables
    const manager = TelegramSessionManager.fromEnv();

    console.log('🔐 Telegram Session Manager - Basic Example\n');

    // Create new session
    const result = await manager.createSession({
      phoneNumber: () => question('📞 Enter your phone number: '),
      phoneCode: () => question('🔢 Enter verification code: '),
      password: () => question('🔐 Enter 2FA password (if enabled, or press Enter): '),
      onError: error => console.error('❌ Error:', error.message),
    });

    if (result.success) {
      console.log('\n✅ Success!');
      console.log('📋 Session string:', result.sessionString);

      // Get user information
      const userInfo = await manager.getUserInfo(result.sessionString);
      if (userInfo) {
        console.log('\n👤 User Information:');
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
      console.log('❌ Failed to create session:', result.error);
    }

    await manager.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    rl.close();
  }
}

// Set environment variables before running:
// export TELEGRAM_API_ID="your_api_id"
// export TELEGRAM_API_HASH="your_api_hash"

main().catch(console.error);
