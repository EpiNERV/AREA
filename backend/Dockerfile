FROM node:lts-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000

FROM base AS development
RUN addgroup -S areagroup && adduser -S area -G areagroup && chown -R area:areagroup /app
USER area
RUN npm install --save-dev ts-node-dev
EXPOSE 5000
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/server.ts"]

FROM base AS production
ENV NODE_ENV=production
RUN addgroup -S areagroup && adduser -S area -G areagroup && chown -R area:areagroup /app
USER area
RUN npm prune --production && npx tsc
EXPOSE 5000
CMD ["node", "dist/server.js"]
