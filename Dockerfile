FROM node:lts-alpine

WORKDIR /usr/src/EatSwift

RUN apk --no-cache add git

COPY . .

WORKDIR /usr/src/EatSwift/client

RUN npm install

CMD [ "tail", "-f", "/dev/null" ]
