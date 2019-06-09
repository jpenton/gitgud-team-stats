FROM node:10

WORKDIR /app
COPY . .

RUN npm i -g yarn && yarn && yarn build

ENTRYPOINT ["yarn", "start"]