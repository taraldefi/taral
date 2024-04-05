#!/bin/bash

eval "$(
  cat .env | awk '!/^\s*#/' | awk '!/^\s*$/' | while IFS='' read -r line; do
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    echo "export $key=\"$value\""
  done
)"

# Variables
FULLCHAIN_FILE="./certs/prod/fullchain.pem"
PRIVKEY_FILE="./certs/prod/privkey.pem"
REMOTE_PATH="./certs/prod/"
KEY_PATH="./ssh/ConnectKey.pem"

if [ -z "${CLOUD_REMOTE_USER}" ]; then
  echo "CLOUD_REMOTE_USER is not set. Exiting.";
  exit -1;
fi

if [ -z "${CLOUD_REMOTE_HOST}" ]; then
  echo "CLOUD_REMOTE_HOST is not set. Exiting.";
  exit -1;
fi


# Check if the fullchain file exists
if [ ! -f "$FULLCHAIN_FILE" ]; then
    echo "Fullchain file does not exist, exiting with error.";
    exit -1;
fi

# Check if the privkey file exists
if [ ! -f "$PRIVKEY_FILE" ]; then
    echo "Fullchain file does not exist, exiting with error.";
    exit -1;
fi

# Use SSH to check if the remote directory exists, then copy the file if it does
ssh -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST" bash -c "'
if [ ! -d \"$REMOTE_PATH\" ]; then
    echo \"Remote directory does not exist, creating it.\"
    mkdir -p \"$REMOTE_PATH\"
fi
'"

# If the directory check is successful, copy the file
scp -i "$KEY_PATH" "$FULLCHAIN_FILE" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST":"$REMOTE_PATH"
scp -i "$KEY_PATH" "$PRIVKEY_FILE" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST":"$REMOTE_PATH"

if [ $? -eq 0 ]; then
    echo "Files copied successfully."
else
    echo "Error copying files."
    exit 1
fi
