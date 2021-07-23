FROM blockstack/stacks-blockchain as builder
FROM alpine
ARG BTC_URL="https://github.com/blockstackpbc/bitcoin-docker/releases/download/0.20.99.0.0/musl-v0.20.99.0.0.tar.gz"

WORKDIR /

COPY --from=builder /bin/puppet-chain /bin/

RUN apk add --update \
    curl \
    dos2unix \
    gnupg \
    boost-system \
    boost-filesystem \
    boost-thread \
    boost-chrono \
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