FROM node:6.10.2-alpine
MAINTAINER Harry Duong <thedv91@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install pm2
# RUN npm install pm2 -g

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 8000
CMD [ "node", "server.js" ]