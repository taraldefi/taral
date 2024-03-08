#!/bin/bash

# Using wait-for-it to wait for Seq to be ready
/wait-for-it.sh seq:80 --timeout=30

# Variables
SEQ_URL=${SEQ_URL:-"http://seq:80"}
API_KEY_TITLE=${API_KEY_TITLE}
API_KEY_TOKEN=${API_KEY_TOKEN}
ADMIN_USERNAME=${ADMIN_USERNAME:-"admin"}
ADMIN_PASSWORD=${ADMIN_PASSWORD}
SEQCLI_PATH=${SEQCLI_PATH:-"/bin/seqcli/seqcli"}

# Attempt to create the API key
CREATE_OUTPUT=$($SEQCLI_PATH apikey create -t "$API_KEY_TITLE" --token="$API_KEY_TOKEN" -s $SEQ_URL --connect-username=$ADMIN_USERNAME --connect-password=$ADMIN_PASSWORD 2>&1)
CREATE_EXIT_CODE=$?

if [ $CREATE_EXIT_CODE -ne 0 ]; then
    # Check for the error message indicating the API key title already exists
    if echo "$CREATE_OUTPUT" | grep -q "API key '$API_KEY_TITLE' already exists."; then
        echo "API key '$API_KEY_TITLE' already exists. No action needed."
    # Check for the error message indicating the token is already in use
    elif echo "$CREATE_OUTPUT" | grep -q "The command failed: 409 - The specified token is already in use."; then
        echo "The specified token for API key '$API_KEY_TITLE' is already in use. No action needed."
    else
        # Some other error occurred
        echo "An error occurred: $CREATE_OUTPUT"
        exit $CREATE_EXIT_CODE
    fi
else
    echo "API key '$API_KEY_TITLE' created successfully."
fi
