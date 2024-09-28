FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .

ARG REACT_APP_ENV=production
RUN if [ "$REACT_APP_ENV" = "production" ]; then npm run build; fi

FROM nginx:alpine AS production
RUN addgroup -S area && adduser -S area -G area
USER area
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

FROM node:lts AS development
RUN addgroup -S area && adduser -S area -G area
USER area
WORKDIR /app
COPY --from=build /app .
EXPOSE 5173
CMD ["npm", "run", "dev"]
