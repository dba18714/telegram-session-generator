#!/bin/bash

# Telegram Session Manager Release Script

set -e

echo "🚀 准备发布 Telegram Session Manager..."

# 检查工作目录是否干净
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ 工作目录不干净，请先提交所有更改"
    exit 1
fi

# 运行测试
echo "🧪 运行测试..."
npm test

# 运行 linting
echo "🔍 运行代码检查..."
npm run lint

# 构建项目
echo "🔨 构建项目..."
npm run build

# 询问版本类型
echo "📋 选择版本类型:"
echo "1) patch (1.0.0 -> 1.0.1)"
echo "2) minor (1.0.0 -> 1.1.0)"  
echo "3) major (1.0.0 -> 2.0.0)"
read -p "请选择 (1-3): " version_type

case $version_type in
    1) VERSION_TYPE="patch";;
    2) VERSION_TYPE="minor";;
    3) VERSION_TYPE="major";;
    *) echo "❌ 无效选择"; exit 1;;
esac

# 更新版本
echo "📈 更新版本..."
NEW_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version)

echo "✅ 新版本: $NEW_VERSION"

# 确认发布
read -p "确认创建版本 $NEW_VERSION 的 GitHub Release? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 取消发布"
    git checkout package.json
    exit 1
fi

# 提交版本更新
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"
git tag "$NEW_VERSION"

# 推送到 GitHub
echo "⬆️ 推送到 GitHub..."
git push origin main
git push origin "$NEW_VERSION"

echo "🎉 版本标签已创建并推送！"
echo "📋 新版本: $NEW_VERSION"
echo "🔗 GitHub Actions 将自动发布到 npm"
echo "📦 请在 GitHub 上创建 Release 以触发自动发布"
echo "🌐 GitHub Releases: https://github.com/dba18714/telegram-session-manager/releases"