FROM node:20-alpine3.17

WORKDIR /var/frontend/app
COPY . .
RUN npm install

EXPOSE 3000
CMD [ "node", "./server/server.js" ]