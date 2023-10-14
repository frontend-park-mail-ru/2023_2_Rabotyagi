FROM node:20-alpine3.17

WORKDIR /var/frontend/app
COPY public public
COPY src src
COPY server server
COPY package*.json . 
COPY webpack.config.js .
RUN apk add tmux
RUN apk add tree
RUN npm install

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "server" ]