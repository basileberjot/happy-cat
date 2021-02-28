FROM node:12.2.0-slim

ARG APP_HOME=/client

# set working directory
WORKDIR $APP_HOME

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./package.json $APP_HOME/
COPY ./yarn.lock $APP_HOME/

RUN yarn install
CMD yarn start
