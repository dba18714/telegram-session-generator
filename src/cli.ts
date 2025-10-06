#!/usr/bin/env node

/**
 * Telegram Session Generator CLI
 *
 * A command-line tool to generate Telegram session strings
 */

import { TelegramSessionGenerator } from './TelegramSessionGenerator';
import { CLIUtils } from './utils';

/**
 * Interactive API ID prompt
 */
async function promptApiId(): Promise<number> {
  const apiIdStr = await CLIUtils.question('📱 请输入你的 API ID: ');
  const apiId = parseInt(apiIdStr, 10);
  if (!apiId || apiId <= 0) {
    CLIUtils.log('❌ 无效的 API ID，请输入有效的数字', 'error');
    return promptApiId();
  }
  CLIUtils.log(`API ID: ${apiId}`, 'success');
  return apiId;
}

/**
 * Interactive API Hash prompt
 */
async function promptApiHash(): Promise<string> {
  const apiHash = await CLIUtils.question('🔑 请输入你的 API Hash: ');
  if (!apiHash || apiHash.trim() === '') {
    CLIUtils.log('❌ 无效的 API Hash，请输入有效的值', 'error');
    return promptApiHash();
  }
  CLIUtils.log(`API Hash: ${apiHash.substring(0, 8)}...`, 'success');
  return apiHash;
}

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
 * Interactive menu prompt
 */
async function promptMenuChoice(): Promise<'generate' | 'verify'> {
  console.log('请选择操作:');
  console.log('1. 生成新的会话字符串');
  console.log('2. 验证现有会话字符串');
  console.log();
  
  const choice = await CLIUtils.question('请输入选项 (1 或 2): ');
  
  if (choice === '1') {
    return 'generate';
  } else if (choice === '2') {
    return 'verify';
  } else {
    CLIUtils.log('❌ 无效的选项，请输入 1 或 2', 'error');
    return promptMenuChoice();
  }
}

/**
 * Interactive session string prompt
 */
async function promptSessionString(): Promise<string> {
  const sessionString = await CLIUtils.question('📝 请输入要验证的会话字符串: ');
  if (!sessionString || sessionString.trim() === '') {
    CLIUtils.log('❌ 无效的会话字符串，请输入有效的值', 'error');
    return promptSessionString();
  }
  return sessionString.trim();
}

/**
 * Error handler
 */
function handleError(error: Error): void {
  CLIUtils.log(`认证错误: ${error.message}`, 'error');
}

/**
 * Display API credentials instructions
 */
function displayApiInstructions(): void {
  CLIUtils.log('获取 API 凭据:', 'info');
  console.log('1. 访问 https://my.telegram.org');
  console.log('2. 登录你的 Telegram 账号');
  console.log('3. 创建一个新的应用程序');
  console.log('4. 获取 api_id 和 api_hash\n');
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
 * Handle session verification
 */
async function handleSessionVerification(): Promise<void> {
  CLIUtils.log('验证会话字符串需要 API 凭据', 'info');
  displayApiInstructions();

  // Get API credentials interactively
  const apiId = await promptApiId();
  const apiHash = await promptApiHash();
  console.log();

  // Get session string to verify
  const sessionString = await promptSessionString();
  console.log();

  CLIUtils.log('正在验证会话字符串...', 'info');

  const generator = new TelegramSessionGenerator({ apiId, apiHash });
  const result = await generator.verifySession(sessionString);

  if (result.success) {
    CLIUtils.log('会话字符串验证成功！', 'success');

    // Try to get user info
    const userInfo = await generator.getUserInfo(sessionString);
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

  await generator.disconnect();
}

/**
 * Handle session generation
 */
async function handleSessionGeneration(): Promise<void> {
  CLIUtils.log('请输入你的 Telegram API 凭据', 'info');
  displayApiInstructions();

  const apiId = await promptApiId();
  const apiHash = await promptApiHash();
  console.log();

  CLIUtils.log('正在连接到 Telegram...', 'info');
  console.log();

  const generator = new TelegramSessionGenerator({ apiId, apiHash });

  const result = await generator.createSession({
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

  await generator.disconnect();
}
function displayHelp(): void {
  console.log(`
Telegram Session Generator CLI

用法:
  telegram-session-generator [选项]

选项:
  --help, -h        显示帮助信息
  --version, -v     显示版本信息

示例:
  # 生成新的会话字符串
  telegram-session-generator

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
      console.log(`telegram-session-generator v${packageJson.version}`);
      return;
    }

    CLIUtils.header('Telegram 会话获取工具');

    // Show interactive menu
    const choice = await promptMenuChoice();
    console.log();

    if (choice === 'verify') {
      await handleSessionVerification();
    } else {
      await handleSessionGeneration();
    }

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
