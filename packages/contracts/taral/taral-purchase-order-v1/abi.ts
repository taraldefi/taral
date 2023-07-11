
  import { ClarityAbi } from 'lib-shared';

  export const TaralPurchaseOrderV1Interface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "check-if-user-holds-tal-token",
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
          "name": "exporter",
          "type": "principal"
        },
        {
          "name": "importer",
          "type": "principal"
        },
        {
          "name": "order-hash",
          "type": {
            "buffer": {
              "length": 256
            }
          }
        },
        {
          "name": "order-detail-hash",
          "type": {
            "buffer": {
              "length": 256
            }
          }
        },
        {
          "name": "payment-term",
          "type": {
            "string-utf8": {
              "length": 200
            }
          }
        },
        {
          "name": "amount",
          "type": "uint128"
        },
        {
          "name": "invoice-term",
          "type": {
            "string-utf8": {
              "length": 10
            }
          }
        }
      ],
      "name": "initialize",
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
      "name": "get-info",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "tuple": [
                {
                  "name": "version",
                  "type": {
                    "string-ascii": {
                      "length": 10
                    }
                  }
                }
              ]
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-version",
      "outputs": {
        "type": {
          "string-ascii": {
            "length": 10
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
      "name": "ERR-EXPORTER-NOT-REGISTERED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-GENERIC",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-IMPORTER-NOT-REGISTERED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-PERMISSION-DENIED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_CONTRACT_CALL",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_EMPTY_HASH",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_PURCHASE_ORDER_STORAGE",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "VERSION",
      "type": {
        "string-ascii": {
          "length": 10
        }
      }
    }
  ]
};