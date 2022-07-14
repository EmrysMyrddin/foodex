from node:13

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --production

COPY . .

CMD ["node", "__sapper__/build"]