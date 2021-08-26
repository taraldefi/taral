FROM node:14 as builder

RUN apt-get update
RUN apt-get install -y git

RUN git clone https://github.com/taraldefi/btc-rpc-explorer

WORKDIR /btc-rpc-explorer
RUN npm install

FROM node:14-alpine
WORKDIR /workspace
COPY --from=builder /btc-rpc-explorer .
RUN apk --update add git
CMD npm start
EXPOSE 3002