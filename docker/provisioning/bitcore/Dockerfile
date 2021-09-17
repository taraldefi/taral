FROM node:10

# Install Chrome

RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN set -x \
    && apt-get update \
    && apt-get install -y \
        google-chrome-stable \
        git

ENV CHROME_BIN /usr/bin/google-chrome

# Log versions

RUN set -x \
    && node -v \
    && npm -v \
    && google-chrome --version 


RUN npm i -g npm@6.14.5

RUN git clone https://github.com/bitpay/bitcore

WORKDIR /bitcore

RUN npm install
RUN npm run bootstrap
RUN npm run compile
