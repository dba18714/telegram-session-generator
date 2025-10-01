# 🔧 GitHub Actions 权限问题修复

## 问题分析

GitHub Actions 的 semantic-release 失败，错误信息：
```
remote: Permission to dba18714/telegram-session-manager.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/dba18714/telegram-session-manager.git/': The requested URL returned error: 403.
```

## ✅ 已修复的配置

### 1. 更新了 `.github/workflows/release.yml`
- ✅ 添加了必要的权限 (`permissions`)
- ✅ 配置了 Git 用户信息
- ✅ 设置了 `persist-credentials: false`

### 2. 更新了 `.releaserc.json`
- ✅ 配置了 `@semantic-release/git` 插件
- ✅ 指定了要提交的文件 (`CHANGELOG.md`, `package.json`)
- ✅ 设置了提交信息模板

### 3. 更新了 `.gitignore`
- ✅ 移除了 `CHANGELOG.md`（现在需要提交到仓库）

## 🚨 还需要手动配置

### GitHub 仓库设置

1. **检查仓库权限**：
   - 去 GitHub 仓库 → Settings → Actions → General
   - 确保 "Workflow permissions" 设置为 "Read and write permissions"
   - 勾选 "Allow GitHub Actions to create and approve pull requests"

2. **添加 NPM Token**：
   - 去 [npmjs.com](https://www.npmjs.com/) → Account Settings → Access Tokens
   - 创建 "Automation" 类型的 token
   - 在 GitHub 仓库 → Settings → Secrets and variables → Actions
   - 添加名为 `NPM_TOKEN` 的 secret

## 🧪 测试方法

在本地测试配置：
```bash
# 测试 semantic-release 配置
npm run semantic-release:dry-run

# 查看详细日志
npm run semantic-release:debug
```

## 🚀 现在可以工作的流程

1. **提交代码**：
   ```bash
   npm run commit  # 使用 commitizen
   ```

2. **推送到 main**：
   ```bash
   git push origin main
   ```

3. **GitHub Actions 会自动**：
   - 运行测试
   - 分析 commit message
   - 确定版本号
   - 生成 CHANGELOG.md
   - 创建 GitHub release
   - 发布到 npm

## 📋 权限说明

现在 GitHub Actions 具有以下权限：
- `contents: write` - 修改仓库文件（CHANGELOG.md, package.json）
- `issues: write` - 创建和管理 issues
- `pull-requests: write` - 创建和管理 PR
- `id-token: write` - 用于 OIDC 认证