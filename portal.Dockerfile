FROM node:20.5.1 as build

RUN npm i -g @nestjs/cli@9.4.2 typescript@4.6.4 ts-node@10.9.1

RUN apt-get update && \
    apt-get install dos2unix && \
    apt-get clean

COPY ./libs/api /usr/libs/api
COPY ./libs/shared /usr/libs/shared
COPY ./libs/stacks /usr/libs/stacks
COPY ./libs/storage /usr/libs/storage
COPY ./libs/infrastructure /usr/libs/infrastructure
COPY ./libs/clarity-bin /usr/libs/clarity-bin
COPY ./packages/configuration /usr/packages/configuration
COPY ./packages/contracts /usr/packages/contracts
COPY ./standalone/modules /usr/standalone/modules

COPY package.json /usr/package.json
COPY tsconfig.json /usr/tsconfig.json
COPY yarn.lock /usr/yarn.lock

RUN cd /usr && yarn

RUN cd /usr/packages/configuration && yarn && yarn compile

RUN cd /usr/libs/api && yarn && yarn compile
RUN cd /usr/libs/clarity-bin && yarn && yarn compile
RUN cd /usr/libs/infrastructure && yarn && yarn compile
RUN cd /usr/libs/shared && yarn && yarn compile
RUN cd /usr/libs/stacks && yarn && yarn compile
RUN cd /usr/libs/storage && yarn && yarn compile

RUN cd /usr/packages/contracts && yarn && yarn compile

RUN cd /usr/standalone/modules/cron && yarn && yarn build
RUN cd /usr/standalone/modules/events && yarn && yarn build
RUN cd /usr/standalone/modules/logger-telemetry && yarn && yarn build
RUN cd /usr/standalone/modules/multipart && yarn && yarn build
RUN cd /usr/standalone/modules/storage && yarn && yarn build
RUN cd /usr/standalone/modules/telemetry && yarn && yarn build


COPY ./standalone/portal-api /usr/standalone/portal-api

RUN cd /usr/standalone/portal-api/ && yarn

WORKDIR /usr/standalone/portal-api

RUN yarn build

FROM node:20.5.1 as production

RUN apt-get update && \
    apt-get install dos2unix && \
    apt-get clean

RUN npm i -g @nestjs/cli typescript ts-node

COPY --from=build /usr/standalone/portal-api/ /usr/portal/app/

RUN dos2unix /usr/portal/app/startup.ci.sh
RUN dos2unix /usr/portal/app/wait-for-it.sh
RUN dos2unix /usr/portal/app/startup.dev.sh
RUN dos2unix /usr/portal/app/startup.prod.sh

WORKDIR /usr/portal/app

CMD ["/bin/bash", "/usr/portal/app/startup.prod.sh"]