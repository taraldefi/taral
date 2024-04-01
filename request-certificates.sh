#!/usr/bin/env sh

eval "$(
  cat .env | awk '!/^\s*#/' | awk '!/^\s*$/' | while IFS='' read -r line; do
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    echo "export $key=\"$value\""
  done
)"

if [[ -z "${ACME_GD_KEY}" ]]; then
  echo "ACME_GD_KEY is not set. Exiting.";
  exit -1;
else
  export GD_Key="${ACME_GD_KEY}"
fi

if [[ -z "${ACME_GD_SECRET}" ]]; then
  echo "ACME_GD_SECRET is not set. Exiting.";
  exit -1;
else
  export GD_Secret="${ACME_GD_SECRET}"
fi

export CERT_HOME="./certs/root"

./tools/acme.sh/acme.sh \
    --issue \
    --dns dns_gd \
    -d tariala.com \
    -d *.tariala.com \
    -m noreply@tariala.xyz.com \
    --cert-file ./certs/prod/cert.pem \
    --key-file ./certs/prod/privkey.pem \
    --fullchain-file ./certs/prod/fullchain.pem \
    --ca-file ./certs/prod/chain.pem \
    --force
