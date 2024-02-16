FROM node:16.15.1

RUN npm i -g @nestjs/cli typescript ts-node

COPY /standalone/portal-api/package*.json /tmp/app/
RUN cd /tmp/app && npm install

COPY ./standalone/portal-api /usr/src/app
COPY ./standalone/modules /usr/src/modules
RUN cp -a /tmp/app/node_modules /usr/src/app
COPY ./wait-for-it.sh /opt/wait-for-it.sh
COPY ./startup.dev.sh /opt/startup.dev.sh

WORKDIR /usr/src/app
RUN rm -rf .env && cp env-example .env
RUN npm run build

CMD ["/bin/bash", "/opt/startup.dev.sh"]
