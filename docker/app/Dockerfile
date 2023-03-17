FROM node:18.15.0-slim
RUN apt-get update && apt-get install -y
RUN apt-get install -y chromium
RUN mkdir -p /www/app
COPY . /www/app
WORKDIR /www/app
RUN yarn install
EXPOSE 3000
# CMD ["node", "dist/index.js"]
