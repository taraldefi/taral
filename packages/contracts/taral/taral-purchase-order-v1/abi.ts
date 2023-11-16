
  import { ClarityAbi } from 'lib-shared';

  export const TaralPurchaseOrderV1Interface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "collateral-stx",
          "type": "uint128"
        },
        {
          "name": "collateral-btc",
          "type": "uint128"
        }
      ],
      "name": "get-collateral-value",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "vault",
          "type": {
            "tuple": [
              {
                "name": "borrower",
                "type": "principal"
              },
              {
                "name": "collateral-btc",
                "type": "uint128"
              },
              {
                "name": "collateral-stx",
                "type": "uint128"
              },
              {
                "name": "debt",
                "type": "uint128"
              },
              {
                "name": "last-repayment-date",
                "type": "uint128"
              },
              {
                "name": "nft-id",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "get-repayment-due",
      "outputs": {
        "type": "uint128"
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
          "name": "collateral-stx",
          "type": "uint128"
        },
        {
          "name": "collateral-btc",
          "type": "uint128"
        },
        {
          "name": "loan-amount",
          "type": "uint128"
        },
        {
          "name": "duration",
          "type": "uint128"
        }
      ],
      "name": "create-vault",
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
          "name": "delivery-term",
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
      "access": "public",
      "args": [
        {
          "name": "vault-id",
          "type": "uint128"
        }
      ],
      "name": "liquidate",
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
          "name": "vault-id",
          "type": "uint128"
        },
        {
          "name": "repayment-amount",
          "type": "uint128"
        }
      ],
      "name": "repay-loan",
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
      "name": "DEBT_RATIO",
      "type": "uint128"
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
      "name": "ERR_INSUFFICIENT_COLLATERAL",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INSUFFICIENT_REPAYMENT",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_LOAN_AMOUNT",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_LOAN_DURATION",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_VAULT",
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
      "name": "ERR_VAULT_NOT_FOUND",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_VAULT_NOT_UNDERCOLLATERALIZED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "MIN_BTC_COLLATERAL_AMOUNT",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "MIN_COLLATERAL_AMOUNT",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "MIN_LOAN_AMOUNT",
      "type": "uint128"
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