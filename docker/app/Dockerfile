FROM node:18.15.0-slim
RUN apt-get update \
    && apt-get install -yq wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -yq google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN echo 'alias "ll"="ls -la"' >> ~/.bashrc \
    && mkdir -p /www/app
COPY . /www/app

WORKDIR /www/app
RUN yarn install

EXPOSE 3000
# CMD ["node", "dist/index.js"]
