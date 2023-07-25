
  import { ClarityAbi } from 'lib-shared';

  export const TestUtilsInterface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [],
      "name": "mine-block",
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
      "name": "get-block-height",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "account",
          "type": "principal"
        }
      ],
      "name": "get-stx-balance",
      "outputs": {
        "type": "uint128"
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": []
};