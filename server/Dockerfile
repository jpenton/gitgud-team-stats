FROM node:10

WORKDIR /app

COPY . .

RUN npm i -g yarn && yarn

ENTRYPOINT ["yarn", "start"]