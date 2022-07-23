FROM node:lts-alpine3.16
WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "ci", "--legacy-peer-deps"]
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "start" ]