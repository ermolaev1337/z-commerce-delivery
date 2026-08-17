FROM node:20

WORKDIR /app
COPY ./package.json ./yarn.lock /app/
RUN yarn --frozen-lockfile
COPY ./src /app/src
COPY ./public /app/public