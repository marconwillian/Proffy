FROM node:12-alpine

ARG CACHEBUST=1

RUN mkdir -p /home/node/proffy/node_modules && mkdir -p /home/node/proffy/dist && chown -R node:node /home/node/proffy

WORKDIR /home/node/proffy

COPY --chown=node:node ./package.json ./yarn.* ./

USER node

RUN yarn

COPY --chown=node:node ./ .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
