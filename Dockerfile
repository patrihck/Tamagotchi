FROM node:alpine

ARG port
ARG registry

# Install all build dependencies
# Add bash for debugging purposes
RUN apk update \
    && apk add --virtual git make postgresql-client \
    && apk add bash

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./docker-entrypoint.sh /
COPY package*.json ./

# Install all npm dependencies
RUN npm install --quiet --production --no-progress --registry=${registry:-https://registry.npmjs.org} && npm cache clean --force

# Copy entire app over
ADD . /usr/src/app

RUN rm -rf test

EXPOSE $port
VOLUME ["/usr/src/app/log"]
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["start"]