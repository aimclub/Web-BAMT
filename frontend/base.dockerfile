FROM node:17-alpine

COPY package.json /home/ddp/front/package.json
WORKDIR /home/ddp/front

RUN npm config set fetch-retry-mintimeout 2000000
RUN npm config set fetch-retry-maxtimeout 12000000

RUN npm set timeout=10000000

RUN npm install --legacy-peer-deps --loglevel verbose
