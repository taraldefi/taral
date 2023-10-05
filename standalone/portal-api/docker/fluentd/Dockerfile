FROM fluent/fluentd:latest

USER root

RUN ["gem", "install", "fluent-plugin-mongo", "--no-rdoc", "--no-ri", "--version", "~> 1.3.0"]

USER fluent
