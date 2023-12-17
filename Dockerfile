FROM node:20-alpine3.17 as build

WORKDIR /var/frontend/app

ARG API_URL
ARG SCHEMA

ENV API_URL=$API_URL
ENV SCHEMA=$SCHEMA
ENV NODE_ENV=production

COPY public public
COPY src src
COPY server server
COPY package*.json . 
COPY webpack.* .
COPY tsconfig.json .
RUN npm ci
RUN npm run preprod


FROM nginx:stable-alpine3.17-slim as prod
COPY --from=build /var/frontend/app/public/ /var/www/
COPY --from=build /var/frontend/app/server/nginx.conf /etc/nginx/nginx.conf

ENV API_URL=$API_URL
ENV SCHEMA=$SCHEMA
# ENV API_URL=localhost
# ENV SCHEMA=http://

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]