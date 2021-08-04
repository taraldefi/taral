import { ClarityAbi } from '../../../../shared/clarity/types';

// prettier-ignore

export const ArkadikoVaultRewardsV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "claim-pending-rewards-for",
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
          "name": "collateral",
          "type": "uint128"
        },
        {
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "add-collateral",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [],
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
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "claim-pending-rewards-liquidated-vault",
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
      "args": [],
      "name": "increase-cumm-reward-per-collateral",
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
          "name": "collateral",
          "type": "uint128"
        },
        {
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "remove-collateral",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "calculate-cumm-reward-per-collateral",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "get-collateral-amount-of",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "get-collateral-of",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "collateral",
              "type": "uint128"
            },
            {
              "name": "cumm-reward-per-collateral",
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
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "get-cumm-reward-per-collateral-of",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "user",
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
    }
  ],
  "fungible_tokens": [],
  "maps": [
    {
      "key": {
        "tuple": [
          {
            "name": "user",
            "type": "principal"
          }
        ]
      },
      "name": "user-collateral",
      "value": {
        "tuple": [
          {
            "name": "collateral",
            "type": "uint128"
          },
          {
            "name": "cumm-reward-per-collateral",
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
      "name": "ERR-NOT-AUTHORIZED",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-REWARDS-CALC",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "cumm-reward-per-collateral",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "last-reward-increase-block",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "total-collateral",
      "type": "uint128"
    }
  ]
};
