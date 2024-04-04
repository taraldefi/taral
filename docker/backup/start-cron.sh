#!/bin/bash

# Create or overwrite the .pgpass file in the root's home directory
# Adjust the path as needed depending on which user runs the pg_dump command
echo "${DB_HOST}:5432:${DB_NAME}:${DB_USER}:${DB_PASS}" > /root/.pgpass

# Secure the .pgpass file
chmod 600 /root/.pgpass

# Add cron job
echo "0 0 * * * /backup-script.sh >> /var/log/cron.log 2>&1" | crontab -

# Run the backup script immediately in the background
/backup-script.sh &

# Start cron in the foreground
cron -f
