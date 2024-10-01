FROM node:lts AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci --omit=dev && npx tsc

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json

EXPOSE 8080

CMD ["node", "dist/server.js"]
