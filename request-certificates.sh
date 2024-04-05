#!/usr/bin/env sh

eval "$(
  cat .env | awk '!/^\s*#/' | awk '!/^\s*$/' | while IFS='' read -r line; do
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    echo "export $key=\"$value\""
  done
)"

# Set the domain to check
domain="*.tariala.com"

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

# Get today's date in the same format as acme.sh output, adjust the format as per your locale if needed
today=$(date -u +"%Y-%m-%dT%H:%M:%S")

# Use acme.sh --list to find the domain and extract the renewal date
renewalDate=$(./tools/acme.sh/acme.sh --list | grep "$domain" | awk '{print $6}')

if [[ "$renewalDate" > "$today" ]]; then
    echo "Doesn't need renewal"
else
    ./tools/acme.sh/acme.sh \
        --issue \
        --dns dns_gd \
        -d tariala.com \
        -d *.tariala.com \
        -m noreply@tariala.com \
        --cert-file ./certs/prod/cert.pem \
        --key-file ./certs/prod/privkey.pem \
        --fullchain-file ./certs/prod/fullchain.pem \
        --ca-file ./certs/prod/chain.pem \
        --force
fi