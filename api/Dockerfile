FROM node:10-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

ADD package*.json ./
RUN npm install

ADD . .

CMD [ "npm", "start"]