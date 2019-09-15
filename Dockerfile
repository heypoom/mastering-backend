# ======================= Stage 0: Build Phase =======================
FROM node:10-jessie as build
MAINTAINER Phoomparin Mano <phoomparin@gmail.com>

# Setup the build directory
ENV build /opt/build
RUN mkdir -p $build
WORKDIR $build

# Install system dependencies for building
# RUN apk update && apk --no-cache add python g++ make

# Copy over package.json
COPY package.json yarn.lock /tmp/

# Add the yarn cache to speed up things
# ADD .yarn-cache.tgz /

# Install node dependencies with yarn
RUN cd /tmp && yarn --pure-lockfile

# Link node modules to the build directory
RUN cd $build && ln -s /tmp/node_modules

# Copy files into workspace
COPY package.json backpack.config.js tsconfig.json $build/
COPY src $build/src

# Set the node environment to production mode for webpack
ENV NODE_ENV production

# Prune the development dependencies
# RUN cd /tmp && yarn --production --prefer-offline --ignore-scripts

# Set the node environment to production mode
ENV NODE_ENV production

# Clean the yarn cache
RUN yarn cache clean

# Set the current user to the unprivileged `node` user
USER node

# Expose Port
EXPOSE 3030

# Start PM2 runtime
CMD ["npx", "backpack", "start"]

