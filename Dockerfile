FROM node:lts-alpine
WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn 

COPY . .

EXPOSE 3001
RUN yarn build
CMD ["node", "dist/index.js"]