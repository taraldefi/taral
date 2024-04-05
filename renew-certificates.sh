#!/bin/bash

eval "$(
  cat .env | awk '!/^\s*#/' | awk '!/^\s*$/' | while IFS='' read -r line; do
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    echo "export $key=\"$value\""
  done
)"

DOCKER_COMPOSE_FILE="./docker-compose.prod.yml"
KEY_PATH="./ssh/ConnectKey.pem"

if [ -z "${CLOUD_REMOTE_USER}" ]; then
  echo "CLOUD_REMOTE_USER is not set. Exiting.";
  exit -1;
fi

if [ -z "${CLOUD_REMOTE_HOST}" ]; then
  echo "CLOUD_REMOTE_HOST is not set. Exiting.";
  exit -1;
fi

# Run the request-certificates.sh script
./request-certificates.sh

# Capture the exit status of the script
status=$?

# Check if the exit status is 0 or greater
if [ $status -eq 2 ]; then
    echo "Request certificates script succeeded, deploying certificates..."
    ./sync-certificates.sh

    # Use SSH to check if the remote directory exists, then copy the file if it does
    ssh -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST" bash -c "'
        echo \"Restarting docker-compose.\"
        sudo docker-compose -f $DOCKER_COMPOSE_FILE down
        sudo docker-compose -f $DOCKER_COMPOSE_FILE up -d
    '"
fi

echo "Ending..."
