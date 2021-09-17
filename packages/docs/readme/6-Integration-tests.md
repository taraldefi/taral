## Integration tests

When writing integration tests you can use the example included in `/test/integration.test.ts`

The way we run it is: 

First, start the local testnet by doing

```
$> cd docker && docker-compose up
```

Wait until the local testnet is fully started and then execute the integration test

```
$> yarn integration
```