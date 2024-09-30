FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . . 
RUN npm install

ARG REACT_APP_ENV=production
RUN if [ "$REACT_APP_ENV" = "production" ]; then npm run build; fi
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

FROM build AS development
WORKDIR /app
COPY --from=build /app .
EXPOSE 5173
CMD ["npm", "run", "dev"]
