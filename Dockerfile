FROM node:alpine

ARG port

# Install all build dependencies
# Add bash for debugging purposes
RUN apk update \
    && apk add --virtual git make \
    && apk add bash

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install all npm dependencies
RUN npm install --silent --production

# Copy entire app over
COPY . .

EXPOSE $port
CMD [ "npm", "start" ]