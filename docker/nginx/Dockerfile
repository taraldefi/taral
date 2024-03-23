FROM nginx:alpine

# Define build-time arguments
ARG PEM
ARG PEM_KEY
ARG API_DOMAIN
ARG FRONTEND_DOMAIN
ARG SEQ_DOMAIN
ARG SQLPAD_DOMAIN

# Set environment variables based on build-time arguments
ENV API_DOMAIN=${API_DOMAIN} \
    FRONTEND_DOMAIN=${FRONTEND_DOMAIN} \
    SEQ_DOMAIN=${SEQ_DOMAIN} \
    SQLPAD_DOMAIN=${SQLPAD_DOMAIN}

# Copy the template files

COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY ./sites-enabled/default.conf /etc/nginx/sites-enabled/default.template
COPY ./sites-enabled/backend.conf /etc/nginx/sites-enabled/backend.template
COPY ./sites-enabled/frontend.conf /etc/nginx/sites-enabled/frontend.template
COPY ./sites-enabled/seq.conf /etc/nginx/sites-enabled/seq.template
COPY ./sites-enabled/sqlpad.conf /etc/nginx/sites-enabled/sqlpad.template

COPY ./sites-enabled/default.conf /etc/nginx/sites-enabled/default.conf
COPY ./sites-enabled/default-redirect.conf /etc/nginx/sites-enabled/default-redirect.conf

COPY ./ssl/dhparam.pem /etc/nginx/ssl/dhparam.pem

COPY ./certs/cert.pem /etc/nginx/cert.pem
COPY ./certs/cert-key.pem /etc/nginx/cert-key.pem

# Copy a script that replaces the placeholders and moves the configs into place
COPY replace-and-run.sh /replace-and-run.sh

# Make the script executable
RUN chmod +x /replace-and-run.sh

# Start Nginx using the custom script
CMD ["/replace-and-run.sh"]
