FROM alpine

WORKDIR /

RUN apk add --update \
    curl \
    dos2unix

COPY ./docker-entrypoint.sh /bin/docker-entrypoint.sh
RUN dos2unix /bin/docker-entrypoint.sh
RUN chmod +x /bin/docker-entrypoint.sh

COPY wait /bin/wait
RUN chmod +x /bin/wait

ENTRYPOINT ["/bin/docker-entrypoint.sh"]
