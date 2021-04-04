FROM node:14.16.0-alpine3.13 AS development

WORKDIR /var/www
COPY api/package.json .
COPY api/package-lock.json .
RUN npm ci
COPY api .

CMD ["npm", "run", "dev"]

EXPOSE 8090

FROM node:14.16.0-alpine3.13 AS production

WORKDIR /var/www
COPY api/package.json .
COPY api/package-lock.json .
RUN npm ci
COPY api .
