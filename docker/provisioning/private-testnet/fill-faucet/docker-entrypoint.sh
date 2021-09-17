#!/bin/sh

/bin/wait && curl -f -u blockstack:blockstacksystem --data-binary '{"jsonrpc": "1.0", "id":"c", "method": "generatetoaddress", "params": [110, "mrzLDS7LT3otAnpiRWGYkWipdnAZJaXAZQ"] }' -H 'content-type: text/plain;' http://bitcoin:18443/