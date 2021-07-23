## Local testnet

The `docker` folder contains a `docker-compose` configuration to run a local testnet `Stacks blockchain` environment from scratch

This starts the following `private testnet` components: 

* Postgres database
* Bitcoin - `puppet chain`
* Stacks node 
* Stacks api
* Local stacks blockchain explorer

It contains  two `docker-compose` files: 

* bns.yaml
* docker-compose.yaml

If you want to import BNS data you should run

```
$> docker-compose -f bns.yaml pull
$> docker-compose -f bns.yaml build
$> docker-compose -f bns.yaml up
```

This will import `bns data` into the `/bns-data` folder.

Moving forward, starting the stack: 

```
$> docker-compose pull
$> docker-compose build
$> docker-compose up
```

Note:

If you do not want to import bns data, then you will need to comment out the environment line `BNS_IMPORT_DIR: /bns-data` from the `stacks-blockchain-api` container, otherwise the container will panic if it doesn't find the files

If you did import the bns data, you need to uncomment (if previously commented out) the environment line above and be aware that the `stacks-blockchain` will experience `Connection refused` problems from `stacks-blockchain-api` for the duration of bns data import. After the import, the API will become ready and accept events from stacks-blockchain node
