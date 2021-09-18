## Integration tests

Integration tests run against the local testnet stack started with docker.

The way we run it is: 

First, start the local testnet by doing

```
$> cd docker && docker-compose up
```

Wait until the local testnet is fully started and then execute the integration tests

```
$> yarn integration-tests
```