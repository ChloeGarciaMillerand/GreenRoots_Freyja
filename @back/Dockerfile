FROM node:22-slim

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3001

# Use tsx directly, not through pnpm script
CMD ["npx", "tsx", "watch", "src/index.ts"]