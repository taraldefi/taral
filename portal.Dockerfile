FROM node:20.5.1

RUN npm i -g @nestjs/cli typescript ts-node

COPY /standalone/portal-api/package*.json /tmp/app/
RUN cd /tmp/app && yarn

COPY ./standalone/portal-api /usr/portal/app
COPY ./standalone/modules /usr/portal/modules
COPY ./libs/api /usr/libs/api
COPY ./libs/bitcoin /usr/libs/bitcoin
COPY ./libs/clarity-bin /usr/libs/clarity-bin
COPY ./libs/generate /usr/libs/generate
COPY ./libs/infrastructure /usr/libs/infrastructure
COPY ./libs/node /usr/libs/node
COPY ./libs/oracle /usr/libs/oracle
COPY ./libs/shared /usr/libs/shared
COPY ./libs/stacks /usr/libs/stacks
COPY ./libs/storage /usr/libs/storage
COPY ./libs/swap /usr/libs/swap
COPY ./libs/testing /usr/libs/testing

COPY ./packages /usr/packages

COPY ./apps/oracle /usr/apps/oracle
COPY ./apps/scripts /usr/apps/scripts

RUN cp -a /tmp/app/node_modules /usr/portal/app

COPY package.json /usr/package.json
COPY tsconfig.json /usr/tsconfig.json
COPY yarn.lock /usr/yarn.lock

RUN cd /usr && yarn

WORKDIR /usr/portal/app

RUN yarn build

CMD ["/bin/bash", "/usr/portal/app/startup.dev.sh"]
