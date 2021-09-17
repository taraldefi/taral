FROM node:12-buster-slim AS builder

RUN apt-get update
RUN apt-get install -y build-essential python3 pkg-config git

RUN git clone https://github.com/dorucioclea/mempool

WORKDIR /mempool/backend
COPY . .

RUN npm install
RUN npm run build

FROM node:12-buster-slim

RUN apt-get update
RUN apt-get install -y dos2unix

WORKDIR /backend

COPY --from=builder /mempool/backend/ .

RUN dos2unix /backend/start.sh
RUN dos2unix /backend/wait-for-it.sh

RUN chmod +x /backend/start.sh
RUN chmod +x /backend/wait-for-it.sh

RUN chown -R 1000:1000 /backend && chmod -R 755 /backend

USER 1000

EXPOSE 8999

CMD ["/backend/start.sh"]