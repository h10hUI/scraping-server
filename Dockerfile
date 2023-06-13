FROM node:18.15.0
RUN apt-get update && apt-get install -y chromium sqlite3

RUN groupadd app && useradd -m -g app app

RUN mkdir -p /var/www/app && chown -R app:app /var/www/app
RUN ln -s /usr/bin/chromium /usr/bin/chromium-browser

WORKDIR /var/www/app

COPY package.json yarn.lock ./

USER app
RUN yarn install --frozen-lockfile \
    && echo "alias ll='ls -alG'" >> ~/.bashrc

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["npx", "concurrently", "node dist/src/index.js", "node dist/src/api/index.js"]
