FROM datalust/seqcli:latest

# Install jq
RUN apt-get update && apt-get install -y jq dos2unix && rm -rf /var/lib/apt/lists/*

# Copy wait-for-it script (assuming it's in the same directory as the Dockerfile)
COPY wait-for-it.sh /wait-for-it.sh
RUN dos2unix /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy your entrypoint script
COPY entrypoint.sh /seqcli-entrypoint.sh
RUN dos2unix /seqcli-entrypoint.sh
RUN chmod +x /seqcli-entrypoint.sh

ENTRYPOINT ["/seqcli-entrypoint.sh"]
