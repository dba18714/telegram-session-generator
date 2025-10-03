# Telegram Session Generator

[![npm version](https://badge.fury.io/js/telegram-session-generator.svg)](https://badge.fury.io/js/telegram-session-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

简单、安全的 Telegram 会话字符串生成工具。通过 npx 一键运行，交互式引导输入 api_id/api_hash，快速生成会话字符串，用于客户端开发与自动化任务。

## 使用方法

```bash
# 使用 npx 直接运行（推荐）
npx telegram-session-generator

# 或者全局安装
npm install -g telegram-session-generator
telegram-session
```

## 使用方法 (Docker)

如果你更喜欢使用 Docker，可以直接运行预构建的镜像：

```bash
docker run --rm -it dba18714/telegram-session-generator
```

如果你想自己构建镜像：

```bash
# 克隆仓库
git clone https://github.com/dba18714/telegram-session-generator.git
cd telegram-session-generator

# 构建镜像
npm run docker:build

# 运行容器
npm run docker:run
```

更多 Docker 使用详情请参考 [DOCKER.md](DOCKER.md)。

## 获取 API 凭据

运行工具前，请先获取 Telegram API 凭据：

1. 访问 [https://my.telegram.org](https://my.telegram.org)
2. 登录你的 Telegram 账号
3. 创建一个新的应用程序
4. 获取 `api_id` 和 `api_hash`

运行工具时会提示你输入这些凭据。

## 开发维护

详情请参考 [DEVELOPMENT.md](https://github.com/dba18714/telegram-session-generator/blob/main/DEVELOPMENT.md)。

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。
