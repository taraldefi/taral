FROM fluent/fluentd:v1.14-debian

USER root

RUN mkdir -p /var/log/supervisor && \
    chown -R nobody:nogroup /var/log/supervisor

# Install supervisor
RUN apt-get update && apt-get install -y supervisor

# Install build tools and Ruby development headers
RUN apt-get update && apt-get install -y build-essential ruby-dev && rm -rf /var/lib/apt/lists/*

# Install the MongoDB plugin for Fluentd
RUN gem install fluent-plugin-mongo --version "~> 1.3.0"

# Install Fluentd plugins and UI
RUN gem install fluent-plugin-mongo fluentd-ui

RUN gem install fluent-plugin-secure-forward

# Create directories for supervisor logs and Fluentd
RUN mkdir -p /var/log/supervisor /fluentd/log

# Add supervisord configuration
COPY ./docker/fluentd/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy Fluentd configuration
COPY ./docker/fluentd/fluentd.conf /fluentd/etc/

# Expose ports for Fluentd and Fluentd-UI
# EXPOSE 24224 24224/udp 9292

CMD ["/usr/bin/supervisord"]

# USER fluent
