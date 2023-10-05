FROM fluent/fluentd:v1.14-debian

USER root

# Install build tools and Ruby development headers
RUN apt-get update && apt-get install -y build-essential ruby-dev && rm -rf /var/lib/apt/lists/*

# Install the MongoDB plugin for Fluentd
RUN gem install fluent-plugin-mongo --version "~> 1.3.0"

USER fluent
