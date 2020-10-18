FROM node:14.14.0-alpine

WORKDIR /var/www
COPY api/package.json .
COPY api/package-lock.json .
RUN npm ci
COPY api .

RUN npm install pm2 -g

CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 8090
