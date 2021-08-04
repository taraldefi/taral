import { ClarityAbi } from "../../../../shared/clarity/types";

// prettier-ignore

export const ArkadikoCollateralTypesV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "change",
          "type": {
            "tuple": [
              {
                "name": "key",
                "type": {
                  "string-ascii": {
                    "length": 256
                  }
                }
              },
              {
                "name": "new-value",
                "type": "uint128"
              }
            ]
          }
        },
        {
          "name": "type",
          "type": {
            "tuple": [
              {
                "name": "collateral-to-debt-ratio",
                "type": "uint128"
              },
              {
                "name": "liquidation-penalty",
                "type": "uint128"
              },
              {
                "name": "liquidation-ratio",
                "type": "uint128"
              },
              {
                "name": "maximum-debt",
                "type": "uint128"
              },
              {
                "name": "name",
                "type": {
                  "string-ascii": {
                    "length": 256
                  }
                }
              },
              {
                "name": "stability-fee",
                "type": "uint128"
              },
              {
                "name": "stability-fee-apy",
                "type": "uint128"
              },
              {
                "name": "stability-fee-decimals",
                "type": "uint128"
              },
              {
                "name": "token",
                "type": {
                  "string-ascii": {
                    "length": 12
                  }
                }
              },
              {
                "name": "token-address",
                "type": "principal"
              },
              {
                "name": "token-type",
                "type": {
                  "string-ascii": {
                    "length": 12
                  }
                }
              },
              {
                "name": "total-debt",
                "type": "uint128"
              },
              {
                "name": "url",
                "type": {
                  "string-ascii": {
                    "length": 256
                  }
                }
              }
            ]
          }
        }
      ],
      "name": "change-risk-parameter",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "collateral-to-debt-ratio",
              "type": "uint128"
            },
            {
              "name": "liquidation-penalty",
              "type": "uint128"
            },
            {
              "name": "liquidation-ratio",
              "type": "uint128"
            },
            {
              "name": "maximum-debt",
              "type": "uint128"
            },
            {
              "name": "name",
              "type": {
                "string-ascii": {
                  "length": 256
                }
              }
            },
            {
              "name": "stability-fee",
              "type": "uint128"
            },
            {
              "name": "stability-fee-apy",
              "type": "uint128"
            },
            {
              "name": "stability-fee-decimals",
              "type": "uint128"
            },
            {
              "name": "token",
              "type": {
                "string-ascii": {
                  "length": 12
                }
              }
            },
            {
              "name": "token-address",
              "type": "principal"
            },
            {
              "name": "token-type",
              "type": {
                "string-ascii": {
                  "length": 12
                }
              }
            },
            {
              "name": "total-debt",
              "type": "uint128"
            },
            {
              "name": "url",
              "type": {
                "string-ascii": {
                  "length": 256
                }
              }
            }
          ]
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
          "name": "name",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        },
        {
          "name": "url",
          "type": {
            "string-ascii": {
              "length": 256
            }
          }
        },
        {
          "name": "collateral-type",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        },
        {
          "name": "token-address",
          "type": "principal"
        },
        {
          "name": "liquidation-ratio",
          "type": "uint128"
        },
        {
          "name": "liquidation-penalty",
          "type": "uint128"
        },
        {
          "name": "stability-fee",
          "type": "uint128"
        },
        {
          "name": "stability-fee-decimals",
          "type": "uint128"
        },
        {
          "name": "stability-fee-apy",
          "type": "uint128"
        },
        {
          "name": "maximum-debt",
          "type": "uint128"
        },
        {
          "name": "collateral-to-debt-ratio",
          "type": "uint128"
        }
      ],
      "name": "add-collateral-type",
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
          "name": "debt",
          "type": "uint128"
        }
      ],
      "name": "add-debt-to-collateral-type",
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
          "name": "collateral-type",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        },
        {
          "name": "changes",
          "type": {
            "list": {
              "length": 10,
              "type": {
                "tuple": [
                  {
                    "name": "key",
                    "type": {
                      "string-ascii": {
                        "length": 256
                      }
                    }
                  },
                  {
                    "name": "new-value",
                    "type": "uint128"
                  }
                ]
              }
            }
          }
        }
      ],
      "name": "change-risk-parameters",
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
          "name": "debt",
          "type": "uint128"
        }
      ],
      "name": "subtract-debt-from-collateral-type",
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
      "name": "get-collateral-to-debt-ratio",
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
          "name": "name",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "get-collateral-type-by-name",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "tuple": [
                {
                  "name": "collateral-to-debt-ratio",
                  "type": "uint128"
                },
                {
                  "name": "liquidation-penalty",
                  "type": "uint128"
                },
                {
                  "name": "liquidation-ratio",
                  "type": "uint128"
                },
                {
                  "name": "maximum-debt",
                  "type": "uint128"
                },
                {
                  "name": "name",
                  "type": {
                    "string-ascii": {
                      "length": 256
                    }
                  }
                },
                {
                  "name": "stability-fee",
                  "type": "uint128"
                },
                {
                  "name": "stability-fee-apy",
                  "type": "uint128"
                },
                {
                  "name": "stability-fee-decimals",
                  "type": "uint128"
                },
                {
                  "name": "token",
                  "type": {
                    "string-ascii": {
                      "length": 12
                    }
                  }
                },
                {
                  "name": "token-address",
                  "type": "principal"
                },
                {
                  "name": "token-type",
                  "type": {
                    "string-ascii": {
                      "length": 12
                    }
                  }
                },
                {
                  "name": "total-debt",
                  "type": "uint128"
                },
                {
                  "name": "url",
                  "type": {
                    "string-ascii": {
                      "length": 256
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
      "name": "get-liquidation-penalty",
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
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "get-liquidation-ratio",
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
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "get-maximum-debt",
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
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "get-stability-fee",
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
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "get-stability-fee-apy",
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
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "get-stability-fee-decimals",
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
          "name": "token",
          "type": {
            "string-ascii": {
              "length": 12
            }
          }
        }
      ],
      "name": "get-token-address",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": "principal"
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
      "name": "get-total-debt",
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
  "fungible_tokens": [],
  "maps": [
    {
      "key": {
        "tuple": [
          {
            "name": "name",
            "type": {
              "string-ascii": {
                "length": 12
              }
            }
          }
        ]
      },
      "name": "collateral-types",
      "value": {
        "tuple": [
          {
            "name": "collateral-to-debt-ratio",
            "type": "uint128"
          },
          {
            "name": "liquidation-penalty",
            "type": "uint128"
          },
          {
            "name": "liquidation-ratio",
            "type": "uint128"
          },
          {
            "name": "maximum-debt",
            "type": "uint128"
          },
          {
            "name": "name",
            "type": {
              "string-ascii": {
                "length": 256
              }
            }
          },
          {
            "name": "stability-fee",
            "type": "uint128"
          },
          {
            "name": "stability-fee-apy",
            "type": "uint128"
          },
          {
            "name": "stability-fee-decimals",
            "type": "uint128"
          },
          {
            "name": "token",
            "type": {
              "string-ascii": {
                "length": 12
              }
            }
          },
          {
            "name": "token-address",
            "type": "principal"
          },
          {
            "name": "token-type",
            "type": {
              "string-ascii": {
                "length": 12
              }
            }
          },
          {
            "name": "total-debt",
            "type": "uint128"
          },
          {
            "name": "url",
            "type": {
              "string-ascii": {
                "length": 256
              }
            }
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
      "name": "OWNER",
      "type": "principal"
    }
  ]
};
