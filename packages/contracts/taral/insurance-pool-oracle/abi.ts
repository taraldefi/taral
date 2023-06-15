
  import { ClarityAbi } from 'lib-shared';

  export const InsurancePoolOracleInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
    {
      "access": "read_only",
      "args": [
        {
          "name": "source",
          "type": {
            "string-ascii": {
              "length": 16
            }
          }
        },
        {
          "name": "symbol",
          "type": {
            "string-ascii": {
              "length": 32
            }
          }
        }
      ],
      "name": "get-price",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "amount",
                "type": "uint128"
              },
              {
                "name": "height",
                "type": "uint128"
              },
              {
                "name": "timestamp",
                "type": "uint128"
              }
            ]
          }
        }
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": []
};