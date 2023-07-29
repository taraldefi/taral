#!/bin/bash

# Configuration
CERTS_DIR="grafana/certs"
COMMON_NAME="grafana.example.com"

# Create the certificates directory
mkdir -p "$CERTS_DIR"

# Generate private key and certificate signing request (CSR)
MSYS_NO_PATHCONV=1 openssl req -newkey rsa:2048 -nodes -keyout "$CERTS_DIR/server.key" -out "$CERTS_DIR/server.csr" -subj "/C=US/ST=State/L=City/O=Organization/CN=$COMMON_NAME"

# Generate self-signed certificate
MSYS_NO_PATHCONV=1 openssl x509 -req -sha256 -days 365 -in "$CERTS_DIR/server.csr" -signkey "$CERTS_DIR/server.key" -out "$CERTS_DIR/server.crt"

# Set permissions
chmod 600 "$CERTS_DIR/server.key"
chmod 644 "$CERTS_DIR/server.crt"

echo "SSL/TLS certificates generated successfully!"