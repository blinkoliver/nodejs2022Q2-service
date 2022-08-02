FROM node:lts-alpine3.16 as Dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "ci", "--legacy-peer-deps"]
COPY . .
EXPOSE ${PORT}
RUN [ "npm", "run", "build"]
