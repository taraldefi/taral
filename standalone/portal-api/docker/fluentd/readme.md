# Generate a private key
openssl genrsa -out ca_key.pem 2048

# Generate a self-signed certificate
openssl req -new -x509 -days 3650 -key ca_key.pem -out ca_cert.pem

# Generate a server private key
openssl genrsa -out server_key.pem 2048

# Generate a server certificate signing request
openssl req -new -key server_key.pem -out server_req.pem

# Generate a server certificate
openssl x509 -req -days 3650 -CA ca_cert.pem -CAkey ca_key.pem -CAcreateserial -in server_req.pem -out server_cert.pem
