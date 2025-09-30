#!/usr/bin/env node

/**
 * Telegram Session Manager CLI
 *
 * A command-line tool to generate Telegram session strings
 */

import * as dotenv from 'dotenv';
import { TelegramSessionManager } from './TelegramSessionManager';
import { CLIUtils } from './utils';

// Load environment variables
dotenv.config();

/**
 * Interactive phone number prompt
 */
async function promptPhoneNumber(): Promise<string> {
  const phone = await CLIUtils.question('📞 请输入你的手机号 (格式: +86xxxxxxxxx): ');
  CLIUtils.log(`手机号: ${phone}`, 'success');
  console.log();
  return phone;
}

/**
 * Interactive verification code prompt
 */
async function promptVerificationCode(): Promise<string> {
  CLIUtils.log('验证码已发送到你的手机', 'info');
  const code = await CLIUtils.question('🔢 请输入验证码: ');
  CLIUtils.log('验证码已输入', 'success');
  console.log();
  return code;
}

/**
 * Interactive password prompt
 */
async function promptPassword(): Promise<string> {
  const password = await CLIUtils.question('🔐 请输入两步验证密码 (如果没有设置请直接回车): ');
  return password;
}

/**
 * Error handler
 */
function handleError(error: Error): void {
  CLIUtils.log(`认证错误: ${error.message}`, 'error');
}

/**
 * Display setup instructions
 */
function displaySetupInstructions(): void {
  CLIUtils.log('获取 API 凭据:', 'info');
  console.log('1. 访问 https://my.telegram.org');
  console.log('2. 登录你的 Telegram 账号');
  console.log('3. 创建一个新的应用程序');
  console.log('4. 将 api_id 和 api_hash 添加到环境变量中\n');
}

/**
 * Display usage instructions
 */
function displayUsageInstructions(sessionString: string): void {
  CLIUtils.log('会话字符串获取成功:', 'success');
  CLIUtils.separator();
  console.log(sessionString);
  CLIUtils.separator();
  console.log();

  CLIUtils.log('接下来的步骤:', 'info');
  console.log('1. 复制上面的会话字符串');
  console.log('2. 将其添加到 .env 文件中:');
  console.log(`   TELEGRAM_SESSION_STRING="${sessionString}"`);
  console.log('3. 在你的应用程序中使用\n');

  CLIUtils.log('重要提醒:', 'warning');
  console.log('- 请妥善保管会话字符串，不要泄露给他人');
  console.log('- 会话字符串相当于你的登录凭据');
  console.log('- 如果泄露，请立即在 Telegram 中终止所有会话\n');
}

/**
 * Display help information
 */
function displayHelp(): void {
  console.log(`
Telegram Session Manager CLI

用法:
  telegram-session [选项]

选项:
  --help, -h        显示帮助信息
  --version, -v     显示版本信息
  --verify <session>    验证现有会话字符串

环境变量:
  TELEGRAM_API_ID       Telegram API ID (必需)
  TELEGRAM_API_HASH     Telegram API Hash (必需)

示例:
  # 生成新的会话字符串
  telegram-session

  # 验证现有会话字符串
  telegram-session --verify "your_session_string_here"

获取 API 凭据:
  1. 访问 https://my.telegram.org
  2. 登录你的 Telegram 账号
  3. 创建一个新的应用程序
  4. 获取 api_id 和 api_hash
`);
}

/**
 * Main CLI function
 */
async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2);

    // Handle help
    if (args.includes('--help') || args.includes('-h')) {
      displayHelp();
      return;
    }

    // Handle version
    if (args.includes('--version') || args.includes('-v')) {
      const packageJson = require('../package.json');
      console.log(`telegram-session-manager v${packageJson.version}`);
      return;
    }

    CLIUtils.header('Telegram 会话获取工具');

    // Check for verify mode
    const verifyIndex = args.indexOf('--verify');
    if (verifyIndex !== -1 && args[verifyIndex + 1]) {
      const sessionString = args[verifyIndex + 1];

      // Get API credentials
      const apiId = parseInt(process.env.TELEGRAM_API_ID || '0', 10);
      const apiHash = process.env.TELEGRAM_API_HASH;

      if (!apiId || !apiHash) {
        CLIUtils.log('错误: 请先设置环境变量 TELEGRAM_API_ID 和 TELEGRAM_API_HASH', 'error');
        displaySetupInstructions();
        process.exit(1);
      }

      CLIUtils.log('正在验证会话字符串...', 'info');

      const manager = new TelegramSessionManager({ apiId, apiHash });
      const result = await manager.verifySession(sessionString);

      if (result.success) {
        CLIUtils.log('会话字符串验证成功！', 'success');

        // Try to get user info
        const userInfo = await manager.getUserInfo(sessionString);
        if (userInfo) {
          console.log(
            `用户: ${userInfo.firstName}${userInfo.lastName ? ' ' + userInfo.lastName : ''}`
          );
          if (userInfo.username) {
            console.log(`用户名: @${userInfo.username}`);
          }
          if (userInfo.phone) {
            console.log(`手机号: ${userInfo.phone}`);
          }
        }
      } else {
        CLIUtils.log(`会话字符串验证失败: ${result.error}`, 'error');
        process.exit(1);
      }
      return;
    }

    // Regular session generation mode
    const apiId = parseInt(process.env.TELEGRAM_API_ID || '0', 10);
    const apiHash = process.env.TELEGRAM_API_HASH;

    if (!apiId || !apiHash) {
      CLIUtils.log('错误: 请先设置环境变量 TELEGRAM_API_ID 和 TELEGRAM_API_HASH', 'error');
      displaySetupInstructions();
      process.exit(1);
    }

    CLIUtils.log('API 凭据已配置', 'success');
    console.log(`📱 API ID: ${apiId}`);
    console.log(`🔑 API Hash: ${apiHash.substring(0, 8)}...\n`);

    CLIUtils.log('正在连接到 Telegram...', 'info');
    console.log();

    const manager = new TelegramSessionManager({ apiId, apiHash });

    const result = await manager.createSession({
      phoneNumber: promptPhoneNumber,
      phoneCode: promptVerificationCode,
      password: promptPassword,
      onError: handleError,
    });

    if (result.success) {
      CLIUtils.log('认证成功!', 'success');
      console.log();
      displayUsageInstructions(result.sessionString);
      CLIUtils.log('已断开连接', 'success');
    } else {
      CLIUtils.log(`获取会话失败: ${result.error}`, 'error');
      process.exit(1);
    }

    await manager.disconnect();
  } catch (error) {
    CLIUtils.log(`脚本执行失败: ${error instanceof Error ? error.message : error}`, 'error');
    process.exit(1);
  } finally {
    CLIUtils.closeReadline();
  }
}

// Run CLI if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    CLIUtils.log(`脚本执行失败: ${error instanceof Error ? error.message : error}`, 'error');
    process.exit(1);
  });
}
