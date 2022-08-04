FROM node:lts-alpine3.16
WORKDIR /usr/app
COPY package*.json ./
RUN ["npm", "install", "--legacy-peer-deps"]
COPY . .
EXPOSE ${PORT}
RUN [ "npm", "run", "build"]
