import { ClarityAbi } from '../../shared/clarity/types';

// prettier-ignore

export const SimpleCounterInterface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [],
      "name": "decrement",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
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
            "error": "none",
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
      "access": "variable",
      "name": "counter",
      "type": "int128"
    }
  ]
};
