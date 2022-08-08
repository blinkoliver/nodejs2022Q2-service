FROM node:lts-alpine3.16
WORKDIR /usr/app
COPY package*.json ./
RUN ["npm", "install"]
COPY . .
EXPOSE ${PORT}
RUN [ "npm", "run", "build"]
