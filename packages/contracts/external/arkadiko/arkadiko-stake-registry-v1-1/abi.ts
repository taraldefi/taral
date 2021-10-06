
  import { ClarityAbi } from 'lib-shared';

  export const ArkadikoStakeRegistryV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "registry-trait",
          "type": "trait_reference"
        },
        {
          "name": "pool-trait",
          "type": "trait_reference"
        }
      ],
      "name": "claim-pending-rewards",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "registry-trait",
          "type": "trait_reference"
        },
        {
          "name": "pool-trait",
          "type": "trait_reference"
        }
      ],
      "name": "get-pending-rewards",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "registry-trait",
          "type": "trait_reference"
        },
        {
          "name": "pool-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-trait",
          "type": "trait_reference"
        },
        {
          "name": "amount",
          "type": "uint128"
        }
      ],
      "name": "stake",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "registry-trait",
          "type": "trait_reference"
        },
        {
          "name": "pool-trait",
          "type": "trait_reference"
        },
        {
          "name": "diko-pool-trait",
          "type": "trait_reference"
        },
        {
          "name": "diko-token-trait",
          "type": "trait_reference"
        }
      ],
      "name": "stake-pending-rewards",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "registry-trait",
          "type": "trait_reference"
        },
        {
          "name": "pool-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-trait",
          "type": "trait_reference"
        },
        {
          "name": "amount",
          "type": "uint128"
        }
      ],
      "name": "unstake",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "pool",
          "type": "principal"
        }
      ],
      "name": "get-pool-data",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "deactivated-block",
              "type": "uint128"
            },
            {
              "name": "deactivated-rewards-per-block",
              "type": "uint128"
            },
            {
              "name": "name",
              "type": {
                "string-ascii": {
                  "length": 256
                }
              }
            },
            {
              "name": "rewards-percentage",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "pool",
          "type": "principal"
        }
      ],
      "name": "get-pool-deactivated-block",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "pool",
          "type": "principal"
        }
      ],
      "name": "get-rewards-per-block-for-pool",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": "uint128"
          }
        }
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [
    {
      "key": {
        "tuple": [
          {
            "name": "pool",
            "type": "principal"
          }
        ]
      },
      "name": "pools-data-map",
      "value": {
        "tuple": [
          {
            "name": "deactivated-block",
            "type": "uint128"
          },
          {
            "name": "deactivated-rewards-per-block",
            "type": "uint128"
          },
          {
            "name": "name",
            "type": {
              "string-ascii": {
                "length": 256
              }
            }
          },
          {
            "name": "rewards-percentage",
            "type": "uint128"
          }
        ]
      }
    }
  ],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "ERR-INVALID-POOL",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-POOL-EXIST",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-POOL-INACTIVE",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-WRONG-REGISTRY",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "variable",
      "name": "pool-count",
      "type": "uint128"
    }
  ]
};