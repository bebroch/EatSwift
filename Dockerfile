FROM node:lts-alpine

WORKDIR /usr/src/EatSwift

RUN apk --no-cache add git

# Клонируем репозиторий
RUN git clone https://github.com/bebroch/EatSwift.git .

WORKDIR /usr/src/EatSwift/backend

RUN npm install

CMD [ "npm", "run", "buildProd" ]
