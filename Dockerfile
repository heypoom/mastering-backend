# ======================= Stage 0: Build Phase =======================
FROM node:10-alpine as build
MAINTAINER Phoomparin Mano <phoomparin@gmail.com>

# Setup the build directory
ENV build /opt/build
RUN mkdir -p $build
WORKDIR $build

# Install system dependencies for building
RUN apk update && apk --no-cache add python g++ make

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

# Build the production bundle
RUN npx backpack build

# Prune the development dependencies
RUN cd /tmp && yarn --production --prefer-offline --ignore-scripts

# ======================= Stage 1: Production Phase =======================
FROM node:10-alpine

# Set the node environment to production mode
ENV NODE_ENV production

# Set the build directory from the previous build stage
ENV build /opt/build

# Setup the application workspace directory
ENV app /opt/app
RUN mkdir -p $app
WORKDIR $app

# Globally install PM2 Runtime
RUN yarn global add pm2

# Copy the built files
COPY --from=build $build/dist $app/

# Copy the node_modules over from the build phase
COPY --from=build $build/node_modules $app/node_modules

# Copy the configuration files over
COPY package.json tsconfig.json yarn.lock pm2.yml $app/

# Configure the file uploads directory
RUN cd $app && mkdir uploads && chmod -R 744 uploads && chown -R node:node uploads

# Clean the yarn cache
RUN yarn cache clean

# Set the current user to the unprivileged `node` user
USER node

# Expose Port
EXPOSE 3030

# Start PM2 runtime
CMD ["pm2-runtime", "pm2.yml"]

