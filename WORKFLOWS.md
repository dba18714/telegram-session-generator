# GitHub Actions Workflows

本项目使用两个独立的 GitHub Actions workflows 来管理发布流程：

## 📦 Release Workflow (`.github/workflows/release.yml`)

**触发条件**: 推送代码到 `main` 分支

**功能**:
- 运行测试套件 (Node.js 20 & 22)
- 代码质量检查 (ESLint)
- 使用 semantic-release 自动版本管理
- 发布到 npm registry
- 生成 CHANGELOG.md
- 创建 GitHub Release

## 🐳 Docker Publish Workflow (`.github/workflows/docker-publish.yml`)

**触发条件**:
- Release workflow 成功完成后自动触发
- 创建新的 GitHub Release 时
- 手动触发 (用于测试和紧急发布)

**功能**:
- 构建多架构 Docker 镜像 (AMD64/ARM64)
- 推送到 Docker Hub 和 GitHub Container Registry
- 自动标签管理 (latest, 版本号, 语义版本)
- 镜像测试验证
- 更新 Docker Hub 描述

## 🚀 使用方式

### 标准发布流程
1. 使用 conventional commits 提交代码
2. 推送到 `main` 分支
3. Release workflow 自动运行
4. Docker Publish workflow 自动跟进

### 手动 Docker 发布
1. 访问 GitHub Actions 页面
2. 选择 "Docker Publish" workflow
3. 点击 "Run workflow"
4. 指定版本号和发布选项

## 📋 所需的 GitHub Secrets

- `NPM_TOKEN`: npm 发布令牌
- `DOCKER_USERNAME`: Docker Hub 用户名
- `DOCKER_PASSWORD`: Docker Hub 访问令牌

详细设置说明请参考 [DOCKER_SETUP.md](./DOCKER_SETUP.md)。