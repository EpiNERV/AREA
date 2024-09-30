FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_ENV=production
RUN if [ "$REACT_APP_ENV" = "production" ]; then npm run build; fi
FROM nginx:alpine AS production
RUN addgroup -S areagroup && adduser -S area -G areagroup && chown -R area:areagroup /app
USER area
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

FROM build AS development
RUN addgroup -S areagroup && adduser -S area -G areagroup && chown -R area:areagroup /app
USER area
WORKDIR /app
COPY --from=build /app .
EXPOSE 5173
CMD ["npm", "run", "dev"]
