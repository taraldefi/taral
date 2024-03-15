# Use an official Node.js runtime as the base image

FROM node:20.5.1 as build-target

# COPY package.json /usr/package.json
# COPY tsconfig.json /usr/tsconfig.json
# COPY yarn.lock /usr/yarn.lock

# RUN yarn --frozen-lockfile

# Set the working directory within the container

# Copy package.json and package-lock.json to the container
COPY ./apps/frontend ./apps/frontend

WORKDIR /apps/frontend

# Install dependencies
RUN yarn --frozen-lockfile

RUN \
    NEXT_PUBLIC_LOCALNET_API_SERVER=APP_NEXT_PUBLIC_LOCALNET_API_SERVER \
    NEXT_PUBLIC_TESTNET_API_SERVER=APP_NEXT_PUBLIC_TESTNET_API_SERVER \
    NEXT_PUBLIC_REGTEST_API_SERVER=APP_NEXT_PUBLIC_REGTEST_API_SERVER \
    NEXT_PUBLIC_MAINNET_API_SERVER=APP_NEXT_PUBLIC_MAINNET_API_SERVER \
    NEXT_PUBLIC_LOCALNET_EXPLORER=APP_NEXT_PUBLIC_LOCALNET_EXPLORER \
    NEXT_PUBLIC_TESTNET_EXPLORER=APP_NEXT_PUBLIC_TESTNET_EXPLORER \
    NEXT_PUBLIC_REGTEST_EXPLORER=APP_NEXT_PUBLIC_REGTEST_EXPLORER \
    NEXT_PUBLIC_MAINNET_EXPLORER=APP_NEXT_PUBLIC_MAINNET_EXPLORER \
    NEXT_PUBLIC_LOCALNET_BITCOIN_EXPLORER=APP_NEXT_PUBLIC_LOCALNET_BITCOIN_EXPLORER \
    NEXT_PUBLIC_TESTNET_BITCOIN_EXPLORER=APP_NEXT_PUBLIC_TESTNET_BITCOIN_EXPLORER \
    NEXT_PUBLIC_MAINNET_BITCOIN_EXPLORER=APP_NEXT_PUBLIC_MAINNET_BITCOIN_EXPLORER \
    NEXT_PUBLIC_BASE_URL=APP_NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_TARAL_BANK_CONTRACT=APP_NEXT_PUBLIC_TARAL_BANK_CONTRACT \
    NEXT_PUBLIC_TARAL_LENDER_ADDRESS=APP_NEXT_PUBLIC_TARAL_LENDER_ADDRESS \
    yarn build

# Build the React app
# RUN yarn build

# Archive
FROM node:20.5.1 as archive-target

RUN apt-get update && \
    apt-get install dos2unix && \
    apt-get clean

ENV NODE_ENV=production
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

COPY --from=build-target /apps/frontend/ .

RUN dos2unix /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

CMD ["next", "start"]