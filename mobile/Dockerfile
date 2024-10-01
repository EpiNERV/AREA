FROM node:lts AS builder

WORKDIR /usr/src/mobile

COPY package*.json ./
RUN npm ci

COPY . .

RUN apt-get update \
    && apt-get install -y openjdk-17-jdk android-sdk \
    && apt-get clean
ENV ANDROID_HOME /usr/lib/android-sdk
# RUN yes | sdkmanager --licenses

RUN npx react-native run-android

FROM nginx:alpine

COPY --from=builder /usr/src/mobile/android/app/build/outputs/apk/release/app-release.apk /usr/share/nginx/html/client.apk

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
