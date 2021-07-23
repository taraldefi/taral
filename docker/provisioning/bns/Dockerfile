FROM alpine

RUN apk --update --no-progress  --no-cache upgrade

RUN apk add \
    dos2unix \
    --no-cache

COPY ./setup-bns.sh /setup-bns.sh
RUN dos2unix /setup-bns.sh
RUN chmod +x /setup-bns.sh

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN dos2unix /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]