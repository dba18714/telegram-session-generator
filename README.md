# Telegram Session Manager

[![npm version](https://badge.fury.io/js/telegram-session-manager.svg)](https://badge.fury.io/js/telegram-session-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个简单、安全的 Telegram 会话字符串生成工具，专为 Telegram Bot 开发而设计。

## 使用方法

```bash
# 使用 npx 直接运行（推荐）
npx telegram-session-manager

# 或者全局安装
npm install -g telegram-session-manager
telegram-session
```

## 获取 API 凭据

运行工具前，请先获取 Telegram API 凭据：

1. 访问 [https://my.telegram.org](https://my.telegram.org)
2. 登录你的 Telegram 账号
3. 创建一个新的应用程序
4. 获取 `api_id` 和 `api_hash`

运行工具时会提示你输入这些凭据。

## 开发

### 提交代码

本项目使用 [Conventional Commits](https://conventionalcommits.org/) 规范。推荐使用 commitizen 来生成规范的提交信息：

```bash
npm run commit
```

或者手动遵循格式：
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式化（不影响功能）
- `refactor:` 重构（既不是新功能也不是 bug 修复）
- `chore:` 构建过程或辅助工具的变动

### 自动发布

项目使用 [semantic-release](https://semantic-release.gitbook.io/) 进行自动化发布：

- 推送到 `main` 分支会自动触发发布流程
- 根据 commit message 自动确定版本号（patch/minor/major）
- 自动生成 changelog 和 GitHub release
- 自动发布到 npm

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。
