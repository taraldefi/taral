import { ClarityAbi } from "../../../../shared/clarity/types";

// prettier-ignore

export const ArkadikoVaultDataV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "vault-id",
          "type": "uint128"
        }
      ],
      "name": "remove-burned-vault",
      "outputs": {
        "type": "bool"
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
      "name": "close-vault",
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
      "name": "set-last-vault-id",
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
        },
        {
          "name": "lot-index",
          "type": "uint128"
        },
        {
          "name": "collateral-amount",
          "type": "uint128"
        },
        {
          "name": "recipient",
          "type": "principal"
        }
      ],
      "name": "set-stacker-payout",
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
        },
        {
          "name": "data",
          "type": {
            "tuple": [
              {
                "name": "auction-ended",
                "type": "bool"
              },
              {
                "name": "auto-payoff",
                "type": "bool"
              },
              {
                "name": "collateral",
                "type": "uint128"
              },
              {
                "name": "collateral-token",
                "type": {
                  "string-ascii": {
                    "length": 12
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
                "name": "created-at-block-height",
                "type": "uint128"
              },
              {
                "name": "debt",
                "type": "uint128"
              },
              {
                "name": "id",
                "type": "uint128"
              },
              {
                "name": "is-liquidated",
                "type": "bool"
              },
              {
                "name": "leftover-collateral",
                "type": "uint128"
              },
              {
                "name": "owner",
                "type": "principal"
              },
              {
                "name": "revoked-stacking",
                "type": "bool"
              },
              {
                "name": "stability-fee-accrued",
                "type": "uint128"
              },
              {
                "name": "stability-fee-last-accrued",
                "type": "uint128"
              },
              {
                "name": "stacked-tokens",
                "type": "uint128"
              },
              {
                "name": "updated-at-block-height",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "update-vault",
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
          "name": "user",
          "type": "principal"
        },
        {
          "name": "vault-id",
          "type": "uint128"
        }
      ],
      "name": "update-vault-entries",
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
      "name": "get-last-vault-id",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "vault-id",
          "type": "uint128"
        },
        {
          "name": "lot-index",
          "type": "uint128"
        }
      ],
      "name": "get-stacking-payout",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "collateral-amount",
              "type": "uint128"
            },
            {
              "name": "principal",
              "type": "principal"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "vault-id",
          "type": "uint128"
        }
      ],
      "name": "get-stacking-payout-lots",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "ids",
              "type": {
                "list": {
                  "length": 500,
                  "type": "uint128"
                }
              }
            }
          ]
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
      "name": "get-vault-by-id",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "auction-ended",
              "type": "bool"
            },
            {
              "name": "auto-payoff",
              "type": "bool"
            },
            {
              "name": "collateral",
              "type": "uint128"
            },
            {
              "name": "collateral-token",
              "type": {
                "string-ascii": {
                  "length": 12
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
              "name": "created-at-block-height",
              "type": "uint128"
            },
            {
              "name": "debt",
              "type": "uint128"
            },
            {
              "name": "id",
              "type": "uint128"
            },
            {
              "name": "is-liquidated",
              "type": "bool"
            },
            {
              "name": "leftover-collateral",
              "type": "uint128"
            },
            {
              "name": "owner",
              "type": "principal"
            },
            {
              "name": "revoked-stacking",
              "type": "bool"
            },
            {
              "name": "stability-fee-accrued",
              "type": "uint128"
            },
            {
              "name": "stability-fee-last-accrued",
              "type": "uint128"
            },
            {
              "name": "stacked-tokens",
              "type": "uint128"
            },
            {
              "name": "updated-at-block-height",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "get-vault-entries",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "ids",
              "type": {
                "list": {
                  "length": 1000,
                  "type": "uint128"
                }
              }
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "user",
          "type": "principal"
        }
      ],
      "name": "get-vaults",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "list": {
                "length": 1000,
                "type": {
                  "tuple": [
                    {
                      "name": "auction-ended",
                      "type": "bool"
                    },
                    {
                      "name": "auto-payoff",
                      "type": "bool"
                    },
                    {
                      "name": "collateral",
                      "type": "uint128"
                    },
                    {
                      "name": "collateral-token",
                      "type": {
                        "string-ascii": {
                          "length": 12
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
                      "name": "created-at-block-height",
                      "type": "uint128"
                    },
                    {
                      "name": "debt",
                      "type": "uint128"
                    },
                    {
                      "name": "id",
                      "type": "uint128"
                    },
                    {
                      "name": "is-liquidated",
                      "type": "bool"
                    },
                    {
                      "name": "leftover-collateral",
                      "type": "uint128"
                    },
                    {
                      "name": "owner",
                      "type": "principal"
                    },
                    {
                      "name": "revoked-stacking",
                      "type": "bool"
                    },
                    {
                      "name": "stability-fee-accrued",
                      "type": "uint128"
                    },
                    {
                      "name": "stability-fee-last-accrued",
                      "type": "uint128"
                    },
                    {
                      "name": "stacked-tokens",
                      "type": "uint128"
                    },
                    {
                      "name": "updated-at-block-height",
                      "type": "uint128"
                    }
                  ]
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
      "key": {
        "tuple": [
          {
            "name": "user",
            "type": "principal"
          }
        ]
      },
      "name": "closing-vault",
      "value": {
        "tuple": [
          {
            "name": "vault-id",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "lot-index",
            "type": "uint128"
          },
          {
            "name": "vault-id",
            "type": "uint128"
          }
        ]
      },
      "name": "stacking-payout",
      "value": {
        "tuple": [
          {
            "name": "collateral-amount",
            "type": "uint128"
          },
          {
            "name": "principal",
            "type": "principal"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "vault-id",
            "type": "uint128"
          }
        ]
      },
      "name": "stacking-payout-lots",
      "value": {
        "tuple": [
          {
            "name": "ids",
            "type": {
              "list": {
                "length": 500,
                "type": "uint128"
              }
            }
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "user",
            "type": "principal"
          }
        ]
      },
      "name": "vault-entries",
      "value": {
        "tuple": [
          {
            "name": "ids",
            "type": {
              "list": {
                "length": 1000,
                "type": "uint128"
              }
            }
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "id",
            "type": "uint128"
          }
        ]
      },
      "name": "vaults",
      "value": {
        "tuple": [
          {
            "name": "auction-ended",
            "type": "bool"
          },
          {
            "name": "auto-payoff",
            "type": "bool"
          },
          {
            "name": "collateral",
            "type": "uint128"
          },
          {
            "name": "collateral-token",
            "type": {
              "string-ascii": {
                "length": 12
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
            "name": "created-at-block-height",
            "type": "uint128"
          },
          {
            "name": "debt",
            "type": "uint128"
          },
          {
            "name": "id",
            "type": "uint128"
          },
          {
            "name": "is-liquidated",
            "type": "bool"
          },
          {
            "name": "leftover-collateral",
            "type": "uint128"
          },
          {
            "name": "owner",
            "type": "principal"
          },
          {
            "name": "revoked-stacking",
            "type": "bool"
          },
          {
            "name": "stability-fee-accrued",
            "type": "uint128"
          },
          {
            "name": "stability-fee-last-accrued",
            "type": "uint128"
          },
          {
            "name": "stacked-tokens",
            "type": "uint128"
          },
          {
            "name": "updated-at-block-height",
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
      "access": "variable",
      "name": "last-vault-id",
      "type": "uint128"
    }
  ]
};
