FROM node:22-alpine AS base
# gramjs 依赖安装时需要这些构建工具
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS deps
RUN npm ci

FROM base AS prod-deps
RUN npm ci --only=production && npm cache clean --force

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY tsconfig*.json ./
RUN npm run build

FROM node:22-alpine AS runtime
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./
COPY README.md LICENSE ./
ENV NODE_ENV=production
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/cli.js"]
