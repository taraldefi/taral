import { ClarityAbi } from "../../shared/clarity/types";

// prettier-ignore

export const CounterInterface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [],
      "name": "mint",
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
      "access": "private",
      "args": [],
      "name": "mint-amount",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "public",
      "args": [],
      "name": "decrement",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "int128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [],
      "name": "increment",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "int128"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-counter",
      "outputs": {
        "type": "int128"
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "decimals",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "counter",
      "type": "int128"
    }
  ]
};
