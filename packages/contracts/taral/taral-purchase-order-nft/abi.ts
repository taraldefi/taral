
  import { ClarityAbi } from 'lib-shared';

  export const TaralPurchaseOrderNftInterface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "token-id",
          "type": "uint128"
        },
        {
          "name": "sender",
          "type": "principal"
        }
      ],
      "name": "burn",
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
          "name": "receiver",
          "type": "principal"
        }
      ],
      "name": "mint",
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
          "name": "token-id",
          "type": "uint128"
        },
        {
          "name": "value",
          "type": {
            "string-ascii": {
              "length": 256
            }
          }
        }
      ],
      "name": "set-token-uri",
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
          "name": "token-id",
          "type": "uint128"
        },
        {
          "name": "sender",
          "type": "principal"
        },
        {
          "name": "receiver",
          "type": "principal"
        }
      ],
      "name": "transfer",
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
      "name": "get-last-token-id",
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
      "args": [
        {
          "name": "id",
          "type": "uint128"
        }
      ],
      "name": "get-owner",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "optional": "principal"
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "token-id",
          "type": "uint128"
        }
      ],
      "name": "get-token-uri",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "optional": {
                "string-ascii": {
                  "length": 256
                }
              }
            }
          }
        }
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [
    {
      "key": "uint128",
      "name": "token-uris",
      "value": {
        "string-ascii": {
          "length": 256
        }
      }
    }
  ],
  "non_fungible_tokens": [
    {
      "name": "purchase-order-nft",
      "type": "uint128"
    }
  ],
  "variables": [
    {
      "access": "constant",
      "name": "ERR-NOT-TOKEN-OWNER",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-OWNER-ONLY",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "contract-owner",
      "type": "principal"
    },
    {
      "access": "constant",
      "name": "mint-price",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "last-token-id",
      "type": "uint128"
    }
  ]
};