import { ClarityAbi } from '../../../../lib/clarity/types';

// prettier-ignore

export const ArkadikoLiquidatorV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "vault-manager",
          "type": "trait_reference"
        },
        {
          "name": "auction-engine",
          "type": "trait_reference"
        },
        {
          "name": "vault-id",
          "type": "uint128"
        },
        {
          "name": "coll-type",
          "type": "trait_reference"
        },
        {
          "name": "oracle",
          "type": "trait_reference"
        }
      ],
      "name": "notify-risky-vault",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "ERR-EMERGENCY-SHUTDOWN-ACTIVATED",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-NO-LIQUIDATION-REQUIRED",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-NOT-AUTHORIZED",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "STATUS-OK",
      "type": "uint128"
    }
  ]
};
