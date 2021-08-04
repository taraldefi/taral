import { ClarityAbi } from "../../../../shared/clarity/types";

// prettier-ignore

export const ArkadikoOracleV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "fetch-price",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "tuple": [
                {
                  "name": "last-block",
                  "type": "uint128"
                },
                {
                  "name": "last-price-in-cents",
                  "type": "uint128"
                }
              ]
            }
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "address",
          "type": "principal"
        }
      ],
      "name": "set-oracle-owner",
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
      "args": [
        {
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        },
        {
          "name": "price",
          "type": "uint128"
        }
      ],
      "name": "update-price",
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
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "get-price",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "last-block",
              "type": "uint128"
            },
            {
              "name": "last-price-in-cents",
              "type": "uint128"
            }
          ]
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
            "name": "token",
            "type": {
              "string-ascii": {
                "length": 12
              }
            }
          }
        ]
      },
      "name": "prices",
      "value": {
        "tuple": [
          {
            "name": "last-block",
            "type": "uint128"
          },
          {
            "name": "last-price-in-cents",
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
      "name": "ERR-NOT-WHITELISTED",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "last-block",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "last-price-in-cents",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "oracle-owner",
      "type": "principal"
    }
  ]
};
