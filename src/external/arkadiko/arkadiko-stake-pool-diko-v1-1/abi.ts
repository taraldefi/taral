import { ClarityAbi } from '../../../../shared/clarity/types';

// prettier-ignore

export const ArkadikoStakePoolDikoV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "registry-trait",
          "type": "trait_reference"
        }
      ],
      "name": "calculate-pending-rewards-for-pool",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "registry-trait",
          "type": "trait_reference"
        }
      ],
      "name": "get-last-block-height",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "height",
              "type": "uint128"
            },
            {
              "name": "pool-active",
              "type": "bool"
            }
          ]
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "registry-trait",
          "type": "trait_reference"
        }
      ],
      "name": "add-rewards-to-pool",
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
          "name": "staker",
          "type": "principal"
        }
      ],
      "name": "claim-pending-rewards",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
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
          "name": "amount",
          "type": "uint128"
        },
        {
          "name": "stdiko-supply",
          "type": "uint128"
        }
      ],
      "name": "diko-for-stdiko",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "percentage",
          "type": "uint128"
        }
      ],
      "name": "execute-slash",
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
          "name": "staker",
          "type": "principal"
        }
      ],
      "name": "get-pending-rewards",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
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
          "name": "staker",
          "type": "principal"
        },
        {
          "name": "stdiko-supply",
          "type": "uint128"
        }
      ],
      "name": "get-stake-of",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
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
          "name": "token",
          "type": "trait_reference"
        },
        {
          "name": "staker",
          "type": "principal"
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
          "name": "token",
          "type": "trait_reference"
        },
        {
          "name": "staker",
          "type": "principal"
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
      "args": [],
      "name": "diko-stdiko-ratio",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-last-reward-add-block",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-total-staked",
      "outputs": {
        "type": "uint128"
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "ERR-NOT-AUTHORIZED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-REWARDS-CALC",
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
      "access": "constant",
      "name": "ERR-WRONG-TOKEN",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "POOL-TOKEN",
      "type": "principal"
    },
    {
      "access": "variable",
      "name": "last-reward-add-block",
      "type": "uint128"
    }
  ]
};
