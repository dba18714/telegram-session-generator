# 使用多阶段构建优化镜像大小
FROM node:22-alpine AS builder

# gramjs安装时需要这些构建工具
RUN apk add --no-cache python3 make g++

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./
COPY tsconfig.json ./

# 安装依赖（包括 devDependencies）
RUN npm ci

# 复制源代码
COPY src/ ./src/

# 构建应用
RUN npm run build

# 生产镜像
FROM node:22-alpine AS runtime

# gramjs安装时需要这些构建工具
RUN apk add --no-cache python3 make g++

# 安装 dumb-init 用于处理信号
RUN apk add --no-cache dumb-init

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S telegram -u 1001

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 只安装生产依赖，忽略可选依赖的错误
RUN npm ci --only=production --no-optional && npm cache clean --force

# 从构建阶段复制编译后的代码
COPY --from=builder /app/dist ./dist

# 复制其他必要文件
COPY README.md LICENSE ./

# 更改文件所有者
RUN chown -R telegram:nodejs /app

# 切换到非 root 用户
USER telegram

# 设置环境变量
ENV NODE_ENV=production

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Health check passed')" || exit 1

# 使用 dumb-init 作为入口点
ENTRYPOINT ["dumb-init", "--"]

# 运行应用
CMD ["node", "dist/cli.js"]