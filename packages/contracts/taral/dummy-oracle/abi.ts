
  import { ClarityAbi } from 'lib-shared';

  export const DummyOracleInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "new-price",
          "type": "uint128"
        }
      ],
      "name": "set-btc-price",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "new-price",
          "type": "uint128"
        }
      ],
      "name": "set-stx-price",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-btc-price",
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
      "access": "read_only",
      "args": [],
      "name": "get-stx-price",
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
  "maps": [],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "variable",
      "name": "btc-price",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "stx-price",
      "type": "uint128"
    }
  ]
};