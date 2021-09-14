import { ClarityAbi } from "../../../../lib/clarity/types";

// prettier-ignore

export const ArkadikoSwapTokenDikoUsdaInterface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "recipient",
          "type": "principal"
        },
        {
          "name": "amount",
          "type": "uint128"
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
          "name": "recipient",
          "type": "principal"
        },
        {
          "name": "amount",
          "type": "uint128"
        }
      ],
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
      "access": "public",
      "args": [
        {
          "name": "amount",
          "type": "uint128"
        },
        {
          "name": "sender",
          "type": "principal"
        },
        {
          "name": "recipient",
          "type": "principal"
        },
        {
          "name": "memo",
          "type": {
            "optional": {
              "buffer": {
                "length": 34
              }
            }
          }
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
      "args": [
        {
          "name": "owner",
          "type": "principal"
        }
      ],
      "name": "get-balance",
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
          "name": "owner",
          "type": "principal"
        }
      ],
      "name": "get-data",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "tuple": [
                {
                  "name": "balance",
                  "type": "uint128"
                },
                {
                  "name": "decimals",
                  "type": "uint128"
                },
                {
                  "name": "name",
                  "type": {
                    "string-ascii": {
                      "length": 30
                    }
                  }
                },
                {
                  "name": "supply",
                  "type": "uint128"
                },
                {
                  "name": "symbol",
                  "type": {
                    "string-ascii": {
                      "length": 13
                    }
                  }
                },
                {
                  "name": "uri",
                  "type": {
                    "optional": {
                      "string-utf8": {
                        "length": 52
                      }
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
      "name": "get-decimals",
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
      "name": "get-name",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "string-ascii": {
                "length": 30
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-symbol",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "string-ascii": {
                "length": 13
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-token-uri",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "optional": {
                "string-utf8": {
                  "length": 52
                }
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-total-supply",
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
  "fungible_tokens": [
    {
      "name": "diko-usda"
    }
  ],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "ERR-NOT-AUTHORIZED",
      "type": "uint128"
    }
  ]
};
