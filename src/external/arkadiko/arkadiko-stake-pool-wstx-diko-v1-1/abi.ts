import { ClarityAbi } from '../../../../shared/clarity/types';

// prettier-ignore

export const ArkadikoStakePoolWstxDikoV11Interface: ClarityAbi = {
  "functions": [
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
        "type": "uint128"
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
      "name": "calculate-cumm-reward-per-stake",
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
        }
      ],
      "name": "emergency-withdraw",
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
        }
      ],
      "name": "increase-cumm-reward-per-stake",
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
      "name": "get-cumm-reward-per-stake",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-last-reward-increase-block",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "staker",
          "type": "principal"
        }
      ],
      "name": "get-stake-amount-of",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "staker",
          "type": "principal"
        }
      ],
      "name": "get-stake-cumm-reward-per-stake-of",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "staker",
          "type": "principal"
        }
      ],
      "name": "get-stake-of",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "cumm-reward-per-stake",
              "type": "uint128"
            },
            {
              "name": "uamount",
              "type": "uint128"
            }
          ]
        }
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
  "maps": [
    {
      "key": {
        "tuple": [
          {
            "name": "staker",
            "type": "principal"
          }
        ]
      },
      "name": "stakes",
      "value": {
        "tuple": [
          {
            "name": "cumm-reward-per-stake",
            "type": "uint128"
          },
          {
            "name": "uamount",
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
      "name": "ERR-INSUFFICIENT-STAKE",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
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
      "name": "cumm-reward-per-stake",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "last-reward-increase-block",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "total-staked",
      "type": "uint128"
    }
  ]
};
