FROM node:13

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn workspaces focus @foddex/auth --production

COPY . .

CMD ["yarn", "start"]
