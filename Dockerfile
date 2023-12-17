FROM node:20-alpine3.17 as build

WORKDIR /var/frontend/app
COPY public public
COPY src src
COPY server server
COPY package*.json . 
COPY webpack.* .
COPY tsconfig.json .
RUN npm ci

ENV NODE_ENV=development
ENV API_URL=localhost
ENV SCHEMA=http://

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "prod" ]