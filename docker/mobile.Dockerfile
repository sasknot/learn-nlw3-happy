FROM node:14.16.0-alpine3.13 AS development

WORKDIR /var/www
COPY mobile/package.json .
COPY mobile/package-lock.json .
RUN npm ci
COPY mobile .

RUN npm install expo-cli -g

CMD ["npm", "start"]

EXPOSE 8090
