FROM node:12-buster-slim AS installer

ARG commitHash
ENV DOCKER_COMMIT_HASH=${commitHash}
ENV CYPRESS_INSTALL_BINARY=0

RUN apt-get update
RUN apt-get install -y build-essential rsync git

RUN git clone https://github.com/dorucioclea/mempool

WORKDIR /mempool

COPY . .

RUN cd frontend && npm i

FROM node:12-buster-slim AS builder

RUN apt-get update
RUN apt-get install -y rsync dos2unix

WORKDIR /mempool

COPY --from=installer /mempool .

RUN cd frontend && npm run build

FROM nginx:1.17.8-alpine


RUN apt-get update
RUN apt-get install -y dos2unix

WORKDIR /patch

COPY --from=builder /mempool/entrypoint.sh .
COPY --from=builder /mempool/wait-for .
COPY --from=builder /mempool/nginx.conf /etc/nginx/
COPY --from=builder /mempool/nginx-mempool.conf /etc/nginx/conf.d/
COPY --from=builder /mempool/frontend/dist/mempool /var/www/mempool


RUN dos2unix /patch/entrypoint.sh
RUN dos2unix /patch/wait-for

RUN chmod +x /patch/entrypoint.sh
RUN chmod +x /patch/wait-for

RUN chown -R 1000:1000 /patch && chmod -R 755 /patch && \
        chown -R 1000:1000 /var/cache/nginx && \
        chown -R 1000:1000 /var/log/nginx && \
        chown -R 1000:1000 /etc/nginx/nginx.conf && \
        chown -R 1000:1000 /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
        chown -R 1000:1000 /var/run/nginx.pid

USER 1000

ENTRYPOINT ["/patch/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]