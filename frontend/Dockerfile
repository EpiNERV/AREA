FROM node:lts AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci && npm run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# COPY --from=builder /usr/src/mobile/client.apk /usr/share/nginx/html/client.apk

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
