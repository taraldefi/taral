## Development of smart contracts

The `contracts` folder contains the smart contracts powering taral (development in progress). 

When developing/updating a new smart contract you need to generate: 

* Abi json file
* Typescript interface file
* Index file exposing a neat and simple way of accessing the smart contract interface

You can do all that by running:

```
yarn generate
```