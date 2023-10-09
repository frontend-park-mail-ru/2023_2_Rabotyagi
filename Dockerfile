FROM node:20-alpine3.17

WORKDIR /var/frontend/app
ADD public public
ADD server server
ADD src src
ADD package*.json ./
RUN npm install

EXPOSE 3000
CMD [ "node", "./server/server.js" ]