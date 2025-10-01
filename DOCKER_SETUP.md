# 配置自动发布的步骤

## 1. 设置 GitHub Secrets

在你的 GitHub 仓库中，需要添加以下 Secrets：

### 必需的 Secrets：

1. **NPM_TOKEN** (已有)
   - 用于发布到 npm registry

2. **DOCKER_USERNAME** (新增)
   - 你的 Docker Hub 用户名
   - 例如: `dba18714`

3. **DOCKER_PASSWORD** (新增)
   - 你的 Docker Hub 访问令牌 (不是密码!)
   - 在 Docker Hub 创建: Account Settings > Security > New Access Token

### 设置步骤：

1. 进入你的 GitHub 仓库
2. 点击 "Settings" 选项卡
3. 在左侧菜单中点击 "Secrets and variables" > "Actions"
4. 点击 "New repository secret"
5. 添加上述的每个 secret

## 2. Docker Hub 访问令牌创建

1. 登录 [Docker Hub](https://hub.docker.com)
2. 点击右上角你的用户名 > "Account Settings"
3. 点击左侧的 "Security"
4. 点击 "New Access Token"
5. 给令牌一个描述性名称，如 "GitHub Actions"
6. 选择适当的权限 (Read, Write, Delete)
7. 点击 "Generate"
8. 复制生成的令牌 (它只会显示一次!)
9. 将这个令牌添加到 GitHub Secrets 中作为 `DOCKER_PASSWORD`

## 3. 自动发布流程

设置完成后，当你：

1. 提交代码到 `main` 分支
2. 使用 conventional commits 格式 (feat:, fix:, etc.)
3. GitHub Actions 会自动:
   - 运行测试
   - 创建新的版本号
   - 发布到 npm
   - 构建并推送 Docker 镜像到 Docker Hub 和 GitHub Container Registry
   - 更新 CHANGELOG.md
   - 创建 GitHub Release

## 4. 验证发布

发布完成后，你可以检查：

- npm: `npm info telegram-session-generator`
- Docker Hub: https://hub.docker.com/r/dba18714/telegram-session-generator
- GitHub Packages: https://github.com/dba18714/telegram-session-generator/pkgs/container/telegram-session-generator

## 5. 本地测试 Docker 构建

在推送到 GitHub 之前，你可以本地测试 Docker 构建：

```bash
# 构建镜像
npm run docker:build

# 测试镜像
npm run docker:test

# 运行镜像
npm run docker:run
```