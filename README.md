# Telegram Session Manager

[![npm version](https://badge.fury.io/js/telegram-session-manager.svg)](https://badge.fury.io/js/telegram-session-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个简单、安全的 Telegram 会话字符串生成工具，专为 Telegram Bot 开发而设计。

## 特性

- 🔐 **安全认证**: 使用官方 Telegram API 进行安全认证
- 🚀 **易于使用**: 提供简单的 CLI 工具和编程 API
- 📦 **零配置**: 支持环境变量配置，开箱即用
- 🛡️ **类型安全**: 完整的 TypeScript 支持
- 🔄 **会话验证**: 支持验证现有会话字符串
- 📱 **跨平台**: 支持 CommonJS 和 ES Module

## 快速开始

### 使用 CLI 工具

```bash
# 使用 npx 直接运行（推荐）
npx telegram-session-manager

# 或者全局安装
npm install -g telegram-session-manager
telegram-session
```

### 作为依赖使用

```bash
npm install telegram-session-manager
```

## 前置要求

1. **获取 Telegram API 凭据**
   - 访问 [https://my.telegram.org](https://my.telegram.org)
   - 登录你的 Telegram 账号
   - 创建一个新的应用程序
   - 获取 `api_id` 和 `api_hash`

2. **设置环境变量**

   ```bash
   export TELEGRAM_API_ID="your_api_id"
   export TELEGRAM_API_HASH="your_api_hash"
   ```

   或者在 `.env` 文件中设置：

   ```env
   TELEGRAM_API_ID=your_api_id
   TELEGRAM_API_HASH=your_api_hash
   ```

## CLI 使用方法

### 生成新的会话字符串

```bash
# 基本用法
telegram-session

# 查看帮助
telegram-session --help

# 查看版本
telegram-session --version
```

### 验证现有会话字符串

```bash
telegram-session --verify "your_session_string_here"
```

## 编程 API

### 基本用法

```typescript
import { TelegramSessionManager } from 'telegram-session-manager';

const manager = new TelegramSessionManager({
  apiId: 12345678,
  apiHash: 'your_api_hash',
});

// 创建新会话
const result = await manager.createSession({
  phoneNumber: async () => {
    // 返回手机号
    return '+86xxxxxxxxx';
  },
  phoneCode: async () => {
    // 返回验证码
    return '12345';
  },
  password: async () => {
    // 返回两步验证密码（如果有的话）
    return 'your_password';
  },
});

if (result.success) {
  console.log('会话字符串:', result.sessionString);
} else {
  console.error('创建失败:', result.error);
}
```

### 从环境变量创建

```typescript
import { TelegramSessionManager } from 'telegram-session-manager';

// 从环境变量 TELEGRAM_API_ID 和 TELEGRAM_API_HASH 创建
const manager = TelegramSessionManager.fromEnv();

// 或使用自定义前缀
const manager2 = TelegramSessionManager.fromEnv('MY_TELEGRAM');
// 这将查找 MY_TELEGRAM_API_ID 和 MY_TELEGRAM_API_HASH
```

### 验证会话字符串

```typescript
const result = await manager.verifySession('your_session_string');

if (result.success) {
  console.log('会话有效');
} else {
  console.log('会话无效:', result.error);
}
```

### 获取用户信息

```typescript
const userInfo = await manager.getUserInfo('your_session_string');

if (userInfo) {
  console.log('用户信息:', {
    id: userInfo.id,
    name: `${userInfo.firstName} ${userInfo.lastName || ''}`,
    username: userInfo.username,
    phone: userInfo.phone,
  });
}
```

## 高级用法

### 自定义配置

```typescript
const manager = new TelegramSessionManager({
  apiId: 12345678,
  apiHash: 'your_api_hash',
  connectionRetries: 5, // 连接重试次数，默认 3
});
```

### 在 Node.js 中使用

```javascript
const { TelegramSessionManager } = require('telegram-session-manager');
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
  const manager = TelegramSessionManager.fromEnv();

  try {
    const result = await manager.createSession({
      phoneNumber: () => question('手机号: '),
      phoneCode: () => question('验证码: '),
      password: () => question('密码 (可选): '),
    });

    if (result.success) {
      console.log('成功!', result.sessionString);
    } else {
      console.error('失败:', result.error);
    }
  } finally {
    rl.close();
    await manager.disconnect();
  }
}

main();
```

## TypeScript 类型

```typescript
interface TelegramSessionConfig {
  apiId: number;
  apiHash: string;
  connectionRetries?: number;
  sessionString?: string;
}

interface AuthenticationOptions {
  phoneNumber?: () => Promise<string>;
  phoneCode?: () => Promise<string>;
  password?: () => Promise<string>;
  onError?: (error: Error) => void;
}

interface SessionResult {
  sessionString: string;
  success: boolean;
  error?: string;
}

interface UserInfo {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  phone?: string;
}
```

## 安全建议

1. **保护 API 凭据**:
   - 不要在代码中硬编码 API 凭据
   - 使用环境变量或安全的配置管理工具

2. **保护会话字符串**:
   - 会话字符串等同于登录凭据，请妥善保管
   - 不要在公开的代码仓库中提交会话字符串
   - 如果泄露，立即在 Telegram 中终止所有会话

3. **网络安全**:
   - 在生产环境中使用 HTTPS
   - 考虑使用 VPN 或代理在受限网络中使用

## 常见问题

### Q: 如何获取 API 凭据？

A: 访问 [https://my.telegram.org](https://my.telegram.org)，登录你的 Telegram 账号，创建一个新的应用程序即可获取。

### Q: 会话字符串多长时间过期？

A: Telegram 会话通常不会过期，除非手动终止或被系统回收。

### Q: 可以同时使用多个会话吗？

A: 可以，每个会话字符串代表一个独立的登录实例。

### Q: 支持代理吗？

A: 目前不直接支持代理配置，但你可以通过系统代理或修改网络配置实现。

## 错误处理

```typescript
try {
  const result = await manager.createSession(options);
  if (!result.success) {
    console.error('认证失败:', result.error);
    // 处理特定错误
    if (result.error?.includes('PHONE_CODE_INVALID')) {
      console.log('验证码错误，请重新输入');
    }
  }
} catch (error) {
  console.error('网络错误:', error);
}
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 相关链接

- [Telegram API 文档](https://core.telegram.org/api)
- [GramJS 文档](https://gram.js.org/)
- [问题反馈](https://github.com/yourusername/telegram-session-manager/issues)
