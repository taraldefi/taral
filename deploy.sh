#!/bin/bash

eval "$(
  cat .env | awk '!/^\s*#/' | awk '!/^\s*$/' | while IFS='' read -r line; do
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    echo "export $key=\"$value\""
  done
)"


# Variables
DOCKER_COMPOSE_FILE="./docker-compose.prod.yml"
ENVIRONMENT_FILE="./.env"
KEY_PATH="./ssh/ConnectKey.pem"
REMOTE_PATH="./"

if [ -z "${CLOUD_REMOTE_USER}" ]; then
  echo "CLOUD_REMOTE_USER is not set. Exiting.";
  exit -1;
fi

if [ -z "${CLOUD_REMOTE_HOST}" ]; then
  echo "CLOUD_REMOTE_HOST is not set. Exiting.";
  exit -1;
fi

if ssh -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST" "test -e $DOCKER_COMPOSE_FILE"; then
    # your file exists
    echo "Docker compose exists, stopping"
    ssh -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST" "sudo docker-compose -f $DOCKER_COMPOSE_FILE down --rmi all"
    scp -i "$KEY_PATH" "$DOCKER_COMPOSE_FILE" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST":"$REMOTE_PATH"
    scp -i "$KEY_PATH" "$ENVIRONMENT_FILE" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST":"$REMOTE_PATH"

else
    # your file doesn't exist
    echo "Docker compose file does not exist, copying it"
    scp -i "$KEY_PATH" "$DOCKER_COMPOSE_FILE" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST":"$REMOTE_PATH"
    scp -i "$KEY_PATH" "$ENVIRONMENT_FILE" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST":"$REMOTE_PATH"
fi

# Use SSH to check if the remote directory exists, then copy the file if it does
ssh -i "$KEY_PATH" "$CLOUD_REMOTE_USER@$CLOUD_REMOTE_HOST" bash -c "'
    echo \"Starting docker-compose.\"
    sudo docker-compose -f $DOCKER_COMPOSE_FILE pull
    sudo docker-compose -f $DOCKER_COMPOSE_FILE up -d
'"

if [ $? -eq 0 ]; then
    echo "Deployed successfully."
else
    echo "Error deploying."
    exit 1
fi
