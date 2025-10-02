## [1.5.5](https://github.com/dba18714/telegram-session-generator/compare/v1.5.4...v1.5.5) (2025-10-02)

### Bug Fixes

* 在生产镜像阶段添加 gramjs 安装所需的构建工具 ([e4aaaf7](https://github.com/dba18714/telegram-session-generator/commit/e4aaaf7b4f9582a9356a662e29dc57edb9a72505))

## [1.5.4](https://github.com/dba18714/telegram-session-generator/compare/v1.5.3...v1.5.4) (2025-10-02)

### Bug Fixes

* 添加 gramjs 安装所需的构建工具 ([d86d674](https://github.com/dba18714/telegram-session-generator/commit/d86d6747e2d58f7f38fa8bb01e144f280bb50071))

## [1.5.3](https://github.com/dba18714/telegram-session-generator/compare/v1.5.2...v1.5.3) (2025-10-02)

### Bug Fixes

* 更新 Dockerfile，明确安装生产依赖时忽略可选依赖的错误 ([36db096](https://github.com/dba18714/telegram-session-generator/commit/36db09627edcb5e9533ab39aeeec29cc40f5c580))
* 精简事件输出，移除错误的 JSON 转换 ([f28a842](https://github.com/dba18714/telegram-session-generator/commit/f28a84273a8452dfa8e50bb8093b3943a6a180a7))

## [1.5.2](https://github.com/dba18714/telegram-session-generator/compare/v1.5.1...v1.5.2) (2025-10-02)

### Bug Fixes

* 添加发布事件输出步骤 ([7464e0e](https://github.com/dba18714/telegram-session-generator/commit/7464e0ed514f6bd3822c414169efb83c653f32d7))

## [1.5.1](https://github.com/dba18714/telegram-session-generator/compare/v1.5.0...v1.5.1) (2025-10-02)

### Bug Fixes

* 更新 GITHUB_TOKEN 的引用为 GH_TOKEN ([ee347a0](https://github.com/dba18714/telegram-session-generator/commit/ee347a05b98c81b0292b9f7734a38608152b37ea))

## [1.5.0](https://github.com/dba18714/telegram-session-generator/compare/v1.4.0...v1.5.0) (2025-10-02)

### Features

* 添加 Foo 工作流 ([0d0cd25](https://github.com/dba18714/telegram-session-generator/commit/0d0cd25ca434aee6905acd385f5a9c7ea55f0caa))

## [1.4.0](https://github.com/dba18714/telegram-session-generator/compare/v1.3.0...v1.4.0) (2025-10-02)

### Features

* 添加手动触发工作流的支持 ([1b6b7b5](https://github.com/dba18714/telegram-session-generator/commit/1b6b7b5a7064426ec6311932b43b5df4aa395b55))

## [1.3.0](https://github.com/dba18714/telegram-session-generator/compare/v1.2.0...v1.3.0) (2025-10-02)

### Features

* 更新工作流配置 ([d478996](https://github.com/dba18714/telegram-session-generator/commit/d4789960f2f8b82d89a32c36ad3f6de618a2c95e))

## [1.2.0](https://github.com/dba18714/telegram-session-generator/compare/v1.1.1...v1.2.0) (2025-10-02)

### Features

* 添加 Docker 支持 ([3351997](https://github.com/dba18714/telegram-session-generator/commit/3351997144c54927990ebfe4ec01377ebd60453f))
* 独立 Docker 发布工作流 ([a333e6d](https://github.com/dba18714/telegram-session-generator/commit/a333e6d2d35714cb5693a3cc7ec2bf1bacaa095b))
* 独立出“测试工作流” ([c712bde](https://github.com/dba18714/telegram-session-generator/commit/c712bdeb2b518601b6a7f1c93251c73202d822be))
* 精简 Docker 发布工作流，移除不必要的触发条件和步骤 ([e4064bb](https://github.com/dba18714/telegram-session-generator/commit/e4064bbd6fa0732f8544d984c4cf01471ab51f3a))

### Bug Fixes

* 修正 Docker 登录步骤中的密码变量，使用 TOKEN ([ef5f85b](https://github.com/dba18714/telegram-session-generator/commit/ef5f85bca92a6c401503bed29e99af6385bb8ff6))

## [1.1.1](https://github.com/dba18714/telegram-session-generator/compare/v1.1.0...v1.1.1) (2025-10-01)

### Bug Fixes

* "ReferenceError: exports is not defined in ES module scope" ([1a6c4b7](https://github.com/dba18714/telegram-session-generator/commit/1a6c4b7cdd2ea39266e1720966d8a7d5c6c30c87))

## [1.1.0](https://github.com/dba18714/telegram-session-generator/compare/v1.0.0...v1.1.0) (2025-10-01)

### Features

* 重命名项目为 telegram-session-generator ([1055eee](https://github.com/dba18714/telegram-session-generator/commit/1055eee16010148ea702ef2d030401fbc0a0cd6c))

## 1.0.0 (2025-10-01)

### Features

* migrate ESLint config to v9 format ([94b88bd](https://github.com/dba18714/telegram-session-manager/commit/94b88bdc1b61ee69a3defe224045f9ca9ba529d5))
* 使用 semantic-release 自动化发布流程 ([b2122e8](https://github.com/dba18714/telegram-session-manager/commit/b2122e8b7600caaeb7991b8dc21066bc53b71063))
* 完善 GitHub Actions 自动化发布流程，支持版本类型选择并更新发布指南 ([3e4458a](https://github.com/dba18714/telegram-session-manager/commit/3e4458ab20739a14117e26ce6af8b8edfa90399b))
* 添加 conventional-changelog-conventionalcommits 依赖以支持规范化的变更日志生成 ([934bcc0](https://github.com/dba18714/telegram-session-manager/commit/934bcc041e3d389ef697f27e6b5dd7d3e0b17524))
* 重新初始化版本为 1.0.0，清理所有先前版本 ([45cc149](https://github.com/dba18714/telegram-session-manager/commit/45cc149de3a3940f35e39153120cb4cf133a3f6d))

### Bug Fixes

* update Jest config to ES module format ([3ef79c2](https://github.com/dba18714/telegram-session-manager/commit/3ef79c25d0b936011961bcc7a84d483afd499ab7))
* 修复 GitHub Actions 中的凭据持久化问题，确保正确使用 GitHub 令牌 ([963e0a5](https://github.com/dba18714/telegram-session-manager/commit/963e0a54dd1ad1ee3ee2341cd81def9f83a67829))
* 修复 GitHub Actions 权限问题，添加必要的权限配置并更新相关文件 ([1baf24b](https://github.com/dba18714/telegram-session-manager/commit/1baf24bbd2fc24ee159bdfbb8309107733b26853))
* 更新版本号以避免 npm 发布冲突 ([c7e077b](https://github.com/dba18714/telegram-session-manager/commit/c7e077bb0abb8bbc37c34164deaccba554b633cd))

## [1.0.1](https://github.com/dba18714/telegram-session-manager/compare/v1.0.0...v1.0.1) (2025-10-01)

### Bug Fixes

* 更新版本号以避免 npm 发布冲突 ([c7e077b](https://github.com/dba18714/telegram-session-manager/commit/c7e077bb0abb8bbc37c34164deaccba554b633cd))

## 1.0.0 (2025-10-01)

### Features

* migrate ESLint config to v9 format ([94b88bd](https://github.com/dba18714/telegram-session-manager/commit/94b88bdc1b61ee69a3defe224045f9ca9ba529d5))
* 使用 semantic-release 自动化发布流程 ([b2122e8](https://github.com/dba18714/telegram-session-manager/commit/b2122e8b7600caaeb7991b8dc21066bc53b71063))
* 完善 GitHub Actions 自动化发布流程，支持版本类型选择并更新发布指南 ([3e4458a](https://github.com/dba18714/telegram-session-manager/commit/3e4458ab20739a14117e26ce6af8b8edfa90399b))
* 添加 conventional-changelog-conventionalcommits 依赖以支持规范化的变更日志生成 ([934bcc0](https://github.com/dba18714/telegram-session-manager/commit/934bcc041e3d389ef697f27e6b5dd7d3e0b17524))

### Bug Fixes

* update Jest config to ES module format ([3ef79c2](https://github.com/dba18714/telegram-session-manager/commit/3ef79c25d0b936011961bcc7a84d483afd499ab7))
* 修复 GitHub Actions 中的凭据持久化问题，确保正确使用 GitHub 令牌 ([963e0a5](https://github.com/dba18714/telegram-session-manager/commit/963e0a54dd1ad1ee3ee2341cd81def9f83a67829))
* 修复 GitHub Actions 权限问题，添加必要的权限配置并更新相关文件 ([1baf24b](https://github.com/dba18714/telegram-session-manager/commit/1baf24bbd2fc24ee159bdfbb8309107733b26853))
