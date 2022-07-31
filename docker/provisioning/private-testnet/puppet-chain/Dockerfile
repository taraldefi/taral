FROM blockstack/stacks-blockchain as builder
FROM alpine:3.14
ARG BTC_URL="https://github.com/blockstackpbc/bitcoin-docker/releases/download/0.21.1/musl-v0.21.1.tar.gz"

WORKDIR /

COPY --from=builder /bin/puppet-chain /bin/
RUN echo 'https://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories
RUN apk add --no-cache \
    curl \
    dos2unix \
    gnupg \
    boost-chrono \
    boost-system \
    boost-filesystem \
    boost-thread \
    libevent \
    libzmq \
    libgcc \
    tini \
    jq \
    && curl -L -o /bitcoin.tar.gz ${BTC_URL} \
    && tar -xzvf /bitcoin.tar.gz \
    && mkdir -p /root/.bitcoin \
    && mv /bitcoin-*/bin/* /usr/local/bin/ \
    && rm -rf /bitcoin-*


COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN dos2unix /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN chmod +x /bin/puppet-chain

COPY bitcoin.conf /etc/bitcoin/bitcoin.conf
RUN dos2unix /etc/bitcoin/bitcoin.conf

COPY puppet-chain.toml /etc/bitcoin/puppet-chain.toml
RUN dos2unix /etc/bitcoin/puppet-chain.toml

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "/docker-entrypoint.sh"]