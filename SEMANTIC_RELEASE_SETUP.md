# Semantic Release 配置完成 ✅

## 🎉 配置摘要

已成功为你的项目配置了 semantic-release 自动化发布流程！

### 📁 新增文件

- `.releaserc.json` - semantic-release 配置文件
- `.github/workflows/release.yml` - GitHub Actions 工作流
- `CHANGELOG.md` 已添加到 `.gitignore`

### 📦 安装的包

```json
{
  "semantic-release": "^24.2.9",
  "@semantic-release/git": "^10.0.1",
  "@semantic-release/github": "^11.0.0", 
  "@semantic-release/npm": "^12.0.1",
  "@semantic-release/changelog": "^6.0.3",
  "commitizen": "^4.3.1",
  "cz-conventional-changelog": "^3.3.0"
}
```

### 🔧 更新的脚本

- 移除了 `"release": "npm version patch && npm publish"`
- 添加了 `"semantic-release": "semantic-release"`
- 添加了 `"commit": "git-cz"`

## 🚀 使用方法

### 1. 配置 GitHub Secrets

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加：

- `NPM_TOKEN`: 你的 npm 发布令牌

### 2. 提交代码

使用 conventional commits 格式：

```bash
# 推荐：使用 commitizen
npm run commit

# 或手动遵循格式
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复 bug"
git commit -m "feat!: 破坏性更改"
```

### 3. 推送到 main 分支

```bash
git push origin main
```

自动发布就会开始！🎉

## 📋 版本控制规则

- `fix:` → patch 版本 (1.0.0 → 1.0.1)
- `feat:` → minor 版本 (1.0.0 → 1.1.0)  
- `feat!:` 或 `BREAKING CHANGE:` → major 版本 (1.0.0 → 2.0.0)

## 🗑️ 可以删除的文件

现在可以安全删除：
- `scripts/release.sh` (已被自动化流程替代)

## 📊 监控

- GitHub Actions: https://github.com/dba18714/telegram-session-generator/actions
- npm 包: https://www.npmjs.com/package/telegram-session-generator
- Releases: https://github.com/dba18714/telegram-session-generator/releases