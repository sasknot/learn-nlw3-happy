FROM node:14.14.0-alpine

WORKDIR /var/www
COPY web/package.json .
COPY web/package-lock.json .
RUN npm ci
COPY web .

RUN npm install pm2 -g

CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 8090
