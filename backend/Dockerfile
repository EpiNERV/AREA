FROM node:lts AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000


FROM base AS development

RUN npm install --save-dev ts-node-dev

EXPOSE 5000

CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/server.ts"]


FROM base AS production

ENV NODE_ENV=production

RUN npm prune --production && npx tsc

EXPOSE 5000

CMD ["node", "dist/server.js"]
