FROM node:22-alpine

WORKDIR /usr/src/app

RUN chown node:node ./

USER node

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]