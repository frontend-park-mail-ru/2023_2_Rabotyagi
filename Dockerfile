FROM node:20-alpine3.17 as build

WORKDIR /var/frontend/app
COPY public public
COPY src src
COPY server server
COPY package*.json . 
COPY webpack.config.js .
RUN npm install

ENV NODE_ENV=development
ENV API_URL=http://localhost

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "prod" ]