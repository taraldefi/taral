import { ClarityAbi } from '../../../../lib/clarity/types';

// prettier-ignore

export const ArkadikoSwapV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        },
        {
          "name": "swap-token-trait",
          "type": "trait_reference"
        },
        {
          "name": "x",
          "type": "uint128"
        },
        {
          "name": "y",
          "type": "uint128"
        }
      ],
      "name": "add-to-position",
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
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        }
      ],
      "name": "collect-fees",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": {
              "list": {
                "length": 2,
                "type": "uint128"
              }
            }
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        },
        {
          "name": "swap-token-trait",
          "type": "trait_reference"
        },
        {
          "name": "pair-name",
          "type": {
            "string-ascii": {
              "length": 32
            }
          }
        },
        {
          "name": "x",
          "type": "uint128"
        },
        {
          "name": "y",
          "type": "uint128"
        }
      ],
      "name": "create-pair",
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
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        }
      ],
      "name": "get-balances",
      "outputs": {
        "type": {
          "response": {
            "error": {
              "response": {
                "error": "uint128",
                "ok": "none"
              }
            },
            "ok": {
              "list": {
                "length": 2,
                "type": "uint128"
              }
            }
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        },
        {
          "name": "swap-token-trait",
          "type": "trait_reference"
        },
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
                  "name": "balances",
                  "type": {
                    "list": {
                      "length": 2,
                      "type": "uint128"
                    }
                  }
                },
                {
                  "name": "decimals",
                  "type": "uint128"
                },
                {
                  "name": "name",
                  "type": {
                    "string-ascii": {
                      "length": 32
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
                      "length": 32
                    }
                  }
                },
                {
                  "name": "uri",
                  "type": {
                    "optional": {
                      "string-utf8": {
                        "length": 256
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
      "access": "public",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        },
        {
          "name": "swap-token-trait",
          "type": "trait_reference"
        }
      ],
      "name": "get-position",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "list": {
                "length": 2,
                "type": "uint128"
              }
            }
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        }
      ],
      "name": "get-symbol",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "string-ascii": {
                "length": 31
              }
            }
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        },
        {
          "name": "swap-token-trait",
          "type": "trait_reference"
        },
        {
          "name": "percent",
          "type": "uint128"
        }
      ],
      "name": "reduce-position",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": {
              "list": {
                "length": 2,
                "type": "uint128"
              }
            }
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "token-x",
          "type": "principal"
        },
        {
          "name": "token-y",
          "type": "principal"
        },
        {
          "name": "address",
          "type": "principal"
        }
      ],
      "name": "set-fee-to-address",
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
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        },
        {
          "name": "dx",
          "type": "uint128"
        },
        {
          "name": "min-dy",
          "type": "uint128"
        }
      ],
      "name": "swap-x-for-y",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": {
              "list": {
                "length": 2,
                "type": "uint128"
              }
            }
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        },
        {
          "name": "dy",
          "type": "uint128"
        },
        {
          "name": "min-dx",
          "type": "uint128"
        }
      ],
      "name": "swap-y-for-x",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": {
              "list": {
                "length": 2,
                "type": "uint128"
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "token-x",
          "type": "principal"
        },
        {
          "name": "token-y",
          "type": "principal"
        }
      ],
      "name": "get-fee-to-address",
      "outputs": {
        "type": {
          "response": {
            "error": {
              "response": {
                "error": "uint128",
                "ok": "none"
              }
            },
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
          "name": "token-x",
          "type": "principal"
        },
        {
          "name": "token-y",
          "type": "principal"
        }
      ],
      "name": "get-fees",
      "outputs": {
        "type": {
          "response": {
            "error": {
              "response": {
                "error": "uint128",
                "ok": "none"
              }
            },
            "ok": {
              "list": {
                "length": 2,
                "type": "uint128"
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        }
      ],
      "name": "get-name",
      "outputs": {
        "type": {
          "response": {
            "error": {
              "response": {
                "error": "uint128",
                "ok": "none"
              }
            },
            "ok": {
              "string-ascii": {
                "length": 32
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "pair-id",
          "type": "uint128"
        }
      ],
      "name": "get-pair-contracts",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "token-x",
              "type": "principal"
            },
            {
              "name": "token-y",
              "type": "principal"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-pair-count",
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
          "name": "token-x",
          "type": "principal"
        },
        {
          "name": "token-y",
          "type": "principal"
        }
      ],
      "name": "get-pair-details",
      "outputs": {
        "type": {
          "response": {
            "error": {
              "response": {
                "error": "uint128",
                "ok": "none"
              }
            },
            "ok": {
              "optional": {
                "tuple": [
                  {
                    "name": "balance-x",
                    "type": "uint128"
                  },
                  {
                    "name": "balance-y",
                    "type": "uint128"
                  },
                  {
                    "name": "fee-balance-x",
                    "type": "uint128"
                  },
                  {
                    "name": "fee-balance-y",
                    "type": "uint128"
                  },
                  {
                    "name": "fee-to-address",
                    "type": {
                      "optional": "principal"
                    }
                  },
                  {
                    "name": "name",
                    "type": {
                      "string-ascii": {
                        "length": 32
                      }
                    }
                  },
                  {
                    "name": "shares-total",
                    "type": "uint128"
                  },
                  {
                    "name": "swap-token",
                    "type": "principal"
                  }
                ]
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-pairs",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "list": {
                "length": 2000,
                "type": {
                  "tuple": [
                    {
                      "name": "token-x",
                      "type": "principal"
                    },
                    {
                      "name": "token-y",
                      "type": "principal"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "token-x",
          "type": "principal"
        },
        {
          "name": "token-y",
          "type": "principal"
        }
      ],
      "name": "get-shares",
      "outputs": {
        "type": {
          "response": {
            "error": {
              "response": {
                "error": "uint128",
                "ok": "none"
              }
            },
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "token-x-trait",
          "type": "trait_reference"
        },
        {
          "name": "token-y-trait",
          "type": "trait_reference"
        }
      ],
      "name": "get-total-supply",
      "outputs": {
        "type": {
          "response": {
            "error": {
              "response": {
                "error": "uint128",
                "ok": "none"
              }
            },
            "ok": "uint128"
          }
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
            "name": "token-x",
            "type": "principal"
          },
          {
            "name": "token-y",
            "type": "principal"
          }
        ]
      },
      "name": "pairs-data-map",
      "value": {
        "tuple": [
          {
            "name": "balance-x",
            "type": "uint128"
          },
          {
            "name": "balance-y",
            "type": "uint128"
          },
          {
            "name": "fee-balance-x",
            "type": "uint128"
          },
          {
            "name": "fee-balance-y",
            "type": "uint128"
          },
          {
            "name": "fee-to-address",
            "type": {
              "optional": "principal"
            }
          },
          {
            "name": "name",
            "type": {
              "string-ascii": {
                "length": 32
              }
            }
          },
          {
            "name": "shares-total",
            "type": "uint128"
          },
          {
            "name": "swap-token",
            "type": "principal"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "pair-id",
            "type": "uint128"
          }
        ]
      },
      "name": "pairs-map",
      "value": {
        "tuple": [
          {
            "name": "token-x",
            "type": "principal"
          },
          {
            "name": "token-y",
            "type": "principal"
          }
        ]
      }
    }
  ],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "ERR-INVALID-LIQUIDITY",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-NO-FEE-TO-ADDRESS",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-NOT-AUTHORIZED",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "INVALID-PAIR-ERR",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "balance-too-low-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "no-fee-x-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "no-fee-y-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "no-liquidity-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "no-such-position-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "not-owner-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "pair-already-exists-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "too-many-pairs-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "too-much-slippage-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "transfer-x-failed-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "transfer-y-failed-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "value-out-of-range-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "wrong-token-err",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "variable",
      "name": "pair-count",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "pairs-list",
      "type": {
        "list": {
          "length": 2000,
          "type": "uint128"
        }
      }
    }
  ]
};
