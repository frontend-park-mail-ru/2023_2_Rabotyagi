FROM node:20-alpine3.17

WORKDIR /var/frontend/app
COPY public public
COPY src src
COPY server server
COPY package*.json . 
RUN npm install
RUN apk add tmux
RUN apk add tree

EXPOSE 3000
ENTRYPOINT [ "node", "./server/server.js" ]