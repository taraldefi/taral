## Thank you

This wouldn't be possible without the wonderful work of:

* [Stacks] (https://www.stacks.co/)
    Powering just about everything.

* [Clarigen](https://github.com/obylabs/clarigen/)
    Most api provider and contract generation code in the `/packages/shared` is borrowed with gratitude from Clarigen and modified to fit our usecase. 

* [Clarity-JS-SDK] (https://github.com/blockstack/clarity-js-sdk/)
    The native cli provider code in `/packages/shared/native-cli` is borrowed with gratitude from `@blockstack/clarity-js-sdk` and `Clarigen` with few modifications.

* [Clarinet] (https://github.com/hirosystems/clarinet/)
    Used for checking smart contracts, powering a private testnet and testing. Still using the private testnet in `/clarity/docker` but will rely more and more on `Clarinet`.

* [Catamaran-Swaps] (https://github.com/friedger/stacks-swaps/) 
    Swap code is based largely on `Stacks swaps` (smart contracts and swap verification functions) with the exception that this one runs directly against the bitcoin node, not using the `blockcypher` API or other external dependencies.

* [Arkadiko] (https://github.com/arkadiko-dao/arkadiko/) 
    Currently used for integrating arkadiko functionality on the private testnet. We are going to use the arkadiko deployed contracts outside of the testing environment.
