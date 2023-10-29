FROM node:lts-alpine

WORKDIR /usr/src/EatSwift

RUN apk --no-cache add git

COPY . .

WORKDIR /usr/src/EatSwift/backend

RUN npm install

CMD [ "npm", "run", "buildProd" ]
