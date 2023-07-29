#!/bin/bash

# Generate a self-signed certificate
# No password
MSYS_NO_PATHCONV=1 openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365 -subj "/C=US/ST=CA/L=SF/O=IT/CN=www.example.com"

# Ensure the permissions are correct
chmod 600 server.key server.cert

# Create directories for RabbitMQ nodes to store certificates
mkdir -p rabbitmq1 rabbitmq2

# Copy the certificates to RabbitMQ nodes
cp server.cert server.key rabbitmq1
cp server.cert server.key rabbitmq2
