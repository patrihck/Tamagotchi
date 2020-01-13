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

# Copy entire app over
ADD ./src/ ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./docker-entrypoint.sh /

# Remove unnecessary dirs and files
RUN rm .eslintrc
RUN rm Makefile
RUN rm -rf node_modules
RUN rm -rf test

# Install all npm dependencies
RUN npm install --quiet --production --no-progress --registry=${registry:-https://registry.npmjs.org} && npm cache clean --force

EXPOSE $port

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["start"]