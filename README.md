<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><p align="center">
  <img src="https://raw.githubusercontent.com/taraldefi/taral/main/assets/logo.svg" alt="Logo" width="150" height="150" />
</p> 

<h1 align="center">taral-ecosystem</h1> 

<p align="center">
		<a href="https://github.com/badges/shields"><img alt="Custom badge" src="https://img.shields.io/badge/custom-badge-f39f37.svg" height="20"/></a>
<a href="https://github.com/taraldefi/taral/graphs/commit-activity"><img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" height="20"/></a>
	</p>
 

<p align="center">
  <b>Taral local development environment for clarity contracts</b></br>
  <sub>Development environment for Stacks smart contracts with support for unit tests and integration tests<sub>
</p>

<br />



[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Local testnet](#-local-testnet)
* [➤ Getting started](#-getting-started)
* [➤ Development of smart contracts](#-development-of-smart-contracts)
* [➤ Unit tests](#-unit-tests)
* [➤ Integration tests](#-integration-tests)
* [➤ Future work](#-future-work)
* [➤ FAQ](#-faq)
* [➤ Contributors](#-contributors)
* [➤ License](#-license)


[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#local-testnet)

## ➤ Local testnet

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



[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#getting-started)

## ➤ Getting started

When getting started with developing smart contracts, you need to first install the packages by calling

```
./install.sh
```

This installs a certain version of `clarity-cli` we're using to interact with the smart contracts locally in unit-test mode


[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#development-of-smart-contracts)

## ➤ Development of smart contracts

The `contracts` folder contains some example smart contracts already included. 

When developing/updating a new smart contract you need to generate: 

* Abi json file
* Typescript interface file
* Index file exposing a neat and simple way of accessing the smart contract interface

You can do all that by running:

```
yarn generate
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#unit-tests)

## ➤ Unit tests

When writing unit tests you can use the examples included in `/test/counter.test.ts`


[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#integration-tests)

## ➤ Integration tests

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


[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#future-work)

## ➤ Future work

Start development of the taral token and split this monorepo into multiple separate repositories once the codebase gets larger.


[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#faq)

## ➤ FAQ

`How can I help the Taral project?`

Glad you asked. Taral project is developed by open source developers. 
Please contact us on Discord or Telegram if you want to help the project.

`Is there a token?`

A token is being currently developed, the ticker is TAL

`When will this get released?`

We are actively developing Taral, we will update once we have a clear timeline.


[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Doru Cioclea Octavian" src="https://avatars.githubusercontent.com/u/39082034?s=460&v=4" width="100">](https://github.com/dorucioclea) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/taraldefi/taral/blob/main/CONTRIBUTING.md) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Doru Cioclea Octavian](https://github.com/dorucioclea) | [You?](https://github.com/taraldefi/taral/blob/main/CONTRIBUTING.md) |
| 🔥                                               |                                                  |
 


[![-----------------------------------------------------](https://raw.githubusercontent.com/taraldefi/taral/main/assets/line.png)](#license)

## ➤ License
	
Licensed under [ISC](https://opensource.org/licenses/ISC).
