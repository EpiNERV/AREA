FROM node:lts-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install

FROM base AS development
RUN npm install --save-dev ts-node-dev
EXPOSE 5000
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/server.ts"]

FROM base AS production
ENV NODE_ENV=production
RUN npm prune --production && npx tsc
EXPOSE 5000
CMD ["node", "dist/server.js"]
