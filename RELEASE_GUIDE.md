# 🚀 自动化发布指南

## 📋 Semantic Release 自动发布

本项目使用 [semantic-release](https://semantic-release.gitbook.io/) 进行完全自动化的发布流程。

### 🎯 如何触发发布

1. **遵循 Conventional Commits 规范**提交代码到 `main` 分支
2. GitHub Actions 会自动：
   - 分析 commit message
   - 确定版本号（patch/minor/major）
   - 生成 changelog
   - 创建 GitHub release
   - 发布到 npm

### 📝 Commit Message 规范

推荐使用 commitizen 生成规范的提交信息：

```bash
npm run commit
```

或手动遵循 [Conventional Commits](https://conventionalcommits.org/) 格式：

- `fix:` → **patch** 版本 (1.0.0 → 1.0.1) 
- `feat:` → **minor** 版本 (1.0.0 → 1.1.0)
- `feat!:` 或 `BREAKING CHANGE:` → **major** 版本 (1.0.0 → 2.0.0)

#### 示例

```bash
# Bug 修复 (patch)
fix: 修复会话验证失败的问题

# 新功能 (minor)
feat: 添加会话字符串验证功能

# 破坏性更改 (major)
feat!: 重构 API 接口
BREAKING CHANGE: 移除了旧的会话生成方法
```

### ✨ 自动化流程

推送到 main 分支后会自动：

1. ✅ **运行测试**（多个 Node.js 版本）
2. ✅ **代码检查**（ESLint）
1. ✅ **运行测试**（多个 Node.js 版本）
2. ✅ **代码检查**（ESLint）
3. ✅ **构建项目**
4. ✅ **分析 commit 确定版本**
5. ✅ **生成 changelog**
6. ✅ **更新版本号**
7. ✅ **创建 Git tag**
8. ✅ **创建 GitHub Release**
9. ✅ **发布到 npm**

### 🔧 配置要求

为了使自动发布正常工作，需要在 GitHub 仓库设置中配置：

1. **NPM_TOKEN**: npm 发布令牌
   - 访问 [npmjs.com](https://www.npmjs.com/) → Settings → Access Tokens
   - 创建 Automation token
   - 在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加

### 📊 监控发布状态

- **GitHub Actions**: https://github.com/dba18714/telegram-session-manager/actions
- **npm 包页面**: https://www.npmjs.com/package/telegram-session-manager
- **GitHub Releases**: https://github.com/dba18714/telegram-session-manager/releases

### 🚫 不再需要

- ❌ 手动运行 `./scripts/release.sh`
- ❌ 手动执行 `npm version`
- ❌ 手动执行 `npm publish`
- ❌ 手动创建 GitHub releases

一切都由 semantic-release 自动处理！

### 🎉 优势

- **完全无需本地操作**：在 GitHub 网页上一键发布
- **安全性高**：所有操作在 GitHub 服务器上进行
- **标准化**：版本管理和发布流程完全自动化
- **可追溯**：每次发布都有完整的历史记录

### 📱 移动端友好

由于是网页操作，您甚至可以在手机上发布新版本！

---

## 🗂️ 旧文件清理

您现在可以删除以下文件（可选）：
- `scripts/release.sh`

因为所有功能都已经集成到 GitHub Actions 中了。