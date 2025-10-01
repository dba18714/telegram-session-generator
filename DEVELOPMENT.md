# 开发指南

本文档为 Telegram Session Generator 项目的开发指南。

### 提交代码

本项目使用 [Conventional Commits](https://conventionalcommits.org/) 规范。推荐使用 commitizen 来生成规范的提交信息：

```bash
npm run commit
```

或者手动遵循格式：

**会触发版本升级的：**
- `feat:` 新功能 → **MINOR** 版本升级 (x.Y.0)
- `fix:` 修复 bug → **PATCH** 版本升级 (x.x.Z)
- `perf:` 性能优化 → **PATCH** 版本升级 (x.x.Z)
- `refactor:` 重构（既不是新功能也不是 bug 修复）→ **PATCH** 版本升级 (x.x.Z)

**不会触发版本升级的：**
- `docs:` 文档更新
- `style:` 代码格式化（不影响功能）
- `test:` 添加或修改测试
- `chore:` 构建过程或辅助工具的变动
- `ci:` CI/CD 配置变更

**破坏性变更（MAJOR 版本升级 X.0.0）：**
- 在任何提交类型后添加 `!`，如：`feat!:`、`fix!:`
- 或在提交信息中包含 `BREAKING CHANGE:`

### 自动发布

项目使用 [semantic-release](https://semantic-release.gitbook.io/) 进行自动化发布：

- 推送到 `main` 分支会自动触发发布流程
- 根据 commit message 自动确定版本号（patch/minor/major）
- 自动生成 changelog 和 GitHub release
- 自动发布到 npm
