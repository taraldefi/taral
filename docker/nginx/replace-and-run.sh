#!/bin/sh

# Use envsubst to substitute the environment variables
envsubst '$API_DOMAIN' < /etc/nginx/sites-enabled/backend.template > /etc/nginx/sites-enabled/backend.conf
envsubst '$FRONTEND_DOMAIN' < /etc/nginx/sites-enabled/frontend.template > /etc/nginx/sites-enabled/frontend.conf
envsubst '$SEQ_DOMAIN' < /etc/nginx/sites-enabled/seq.template > /etc/nginx/sites-enabled/seq.conf
envsubst '$SQLPAD_DOMAIN' < /etc/nginx/sites-enabled/sqlpad.template > /etc/nginx/sites-enabled/sqlpad.conf
envsubst '$LANDING_PAGE_DOMAIN' < /etc/nginx/sites-enabled/default.template > /etc/nginx/sites-enabled/default.conf

# Start Nginx in the foreground
nginx -g 'daemon off;'
