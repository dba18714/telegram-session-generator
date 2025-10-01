# Docker 使用指南

## 构建 Docker 镜像

### 本地构建
```bash
# 构建镜像
npm run docker:build

# 运行容器
npm run docker:run

# 测试容器是否正常工作
npm run docker:test
```

### 多架构构建
```bash
# 构建支持 AMD64 和 ARM64 的镜像
npm run docker:build-multi
```

## 使用预构建的镜像

### 从 Docker Hub 运行
```bash
# 运行最新版本
docker run --rm -it dba18714/telegram-session-generator

# 交互式运行
docker run --rm -it dba18714/telegram-session-generator
```

### 从 GitHub Container Registry 运行
```bash
# 运行最新版本
docker run --rm -it ghcr.io/dba18714/telegram-session-generator

# 运行特定版本
docker run --rm -it ghcr.io/dba18714/telegram-session-generator:1.1.1
```

## Docker 镜像特性

- **多阶段构建**: 优化的镜像大小
- **非 root 用户**: 增强安全性
- **多架构支持**: 支持 AMD64 和 ARM64
- **健康检查**: 内置容器健康监控
- **信号处理**: 使用 dumb-init 正确处理进程信号

## 自动发布

当代码推送到 `main` 分支时，GitHub Actions 会自动：

1. 运行测试
2. 使用 semantic-release 创建新版本
3. 构建并推送 Docker 镜像到:
   - Docker Hub: `dba18714/telegram-session-generator`
   - GitHub Container Registry: `ghcr.io/dba18714/telegram-session-generator`

## 标签策略

- `latest`: 最新稳定版本
- `1.x.x`: 具体版本号
- `1.x`: 主要.次要版本
- `1`: 主要版本

## 环境变量

容器支持所有命令行工具的原生功能，无需额外的环境变量配置。