FROM node:lts-alpine

WORKDIR /usr/src/app

RUN apk --no-cache add git

COPY ./app .env ./

RUN npm install

CMD [ "npm", "run", "buildProd" ]