FROM ubuntu:latest

# Install cron and PostgreSQL client
RUN apt-get update && apt-get install -y cron postgresql-client

# Cleanup
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Add your scripts
ADD backup-script.sh /backup-script.sh
ADD start-cron.sh /start-cron.sh

# Make your scripts executable
RUN chmod +x /backup-script.sh /start-cron.sh

# Use the script to setup cron job and start cron
CMD ["/start-cron.sh"]
