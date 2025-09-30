/**
 * CommonJS usage example for Node.js
 */

const { TelegramSessionManager } = require('../dist');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(prompt) {
    return new Promise(resolve => {
        rl.question(prompt, resolve);
    });
}

async function main() {
    try {
        console.log('🔐 Telegram Session Manager - CommonJS Example\n');

        // Create manager with explicit config
        const manager = new TelegramSessionManager({
            apiId: parseInt(process.env.TELEGRAM_API_ID || '0', 10),
            apiHash: process.env.TELEGRAM_API_HASH || '',
        });

        const result = await manager.createSession({
            phoneNumber: () => question('📞 Enter your phone number: '),
            phoneCode: () => question('🔢 Enter verification code: '),
            password: () => question('🔐 Enter 2FA password (optional): '),
        });

        if (result.success) {
            console.log('\n✅ Session created successfully!');
            console.log('📋 Session string:', result.sessionString);

            console.log('\n💡 Add this to your .env file:');
            console.log(`TELEGRAM_SESSION_STRING="${result.sessionString}"`);
        } else {
            console.log('❌ Failed:', result.error);
        }

        await manager.disconnect();
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        rl.close();
    }
}

main();