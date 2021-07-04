FROM node:9.2.1
RUN mkdir -p /export/app
WORKDIR /export/app
COPY ./nodejs_awesome_chat/package.json /export/app
RUN npm install
COPY ./nodejs_awesome_chat /export/app

# EXPOSE 8020
# CMD [ "npm", "debug" ]
# CMD [ "node", "src/server.js" ]