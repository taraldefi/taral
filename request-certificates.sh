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
CERTS_PATH="./certs/prod/"

FULLCHAIN_FILE="./certs/prod/fullchain.pem"
PRIVKEY_FILE="./certs/prod/privkey.pem"

PRIVKEY_REMOTE_PATH="./certs/prod/privkey.pem"
FULLCHAIN_REMOTE_PATH="./certs/prod/fullchain.pem"

KEY_PATH="./ssh/ConnectKey.pem"
CERT_HOME="./certs/root"

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

# Get today's date in the same format as acme.sh output, adjust the format as per your locale if needed
today=$(date -u +"%Y-%m-%dT%H:%M:%S")

# Use acme.sh --list to find the domain and extract the renewal date
renewalDate=$(./tools/acme.sh/acme.sh --list | grep "$domain" | awk '{print $6}')

#
# Create directories if they do not exist.

mkdir -p $CERTS_PATH
mkdir -p $CERT_HOME

if ssh -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST" "test -e $FULLCHAIN_FILE"; then
    # your file exists
    echo "Fullchain certificate exists, copying it over"
    scp -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST":"$FULLCHAIN_REMOTE_PATH" "$FULLCHAIN_FILE" 
else 
    echo "Fullchain certificate does not exist.";
fi

if ssh -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST" "test -e $PRIVKEY_FILE"; then
    # your file exists
    echo "Private key exists, copying it over"
    scp -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST":"$PRIVKEY_REMOTE_PATH" "$PRIVKEY_FILE" 
else 
    echo "Private key does not exist.";
fi

if [[ "$renewalDate" > "$today" ]]; then
    echo "Doesn't need renewal"
    exit 1
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

      exit 2
fi