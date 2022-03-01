FROM node:16.14.0-alpine
# Env
ENV TIME_ZONE=America/Sao_Paulo
ENV ENV_NAME dev
ENV EGG_SERVER_ENV dev
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev
# Set the timezone in docker
RUN apk --update add tzdata \
   && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
   && echo "America/Sao_Paulo" > /etc/timezone \
   && apk del tzdata
# Create Directory for the Container
WORKDIR /usr/src/niverweb
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/niverweb
# TypeScript
RUN npm run tsc
# Start
CMD [ "npm", "start" ]
EXPOSE 7001