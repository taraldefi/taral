
  import { ClarityAbi } from 'lib-shared';

  export const PoxInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "cycle-index",
          "type": "uint128"
        },
        {
          "name": "params",
          "type": {
            "tuple": [
              {
                "name": "amount-ustx",
                "type": "uint128"
              },
              {
                "name": "first-reward-cycle",
                "type": "uint128"
              },
              {
                "name": "i",
                "type": "uint128"
              },
              {
                "name": "num-cycles",
                "type": "uint128"
              },
              {
                "name": "pox-addr",
                "type": {
                  "tuple": [
                    {
                      "name": "hashbytes",
                      "type": {
                        "buffer": {
                          "length": 20
                        }
                      }
                    },
                    {
                      "name": "version",
                      "type": {
                        "buffer": {
                          "length": 1
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      "name": "add-pox-addr-to-ith-reward-cycle",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "amount-ustx",
              "type": "uint128"
            },
            {
              "name": "first-reward-cycle",
              "type": "uint128"
            },
            {
              "name": "i",
              "type": "uint128"
            },
            {
              "name": "num-cycles",
              "type": "uint128"
            },
            {
              "name": "pox-addr",
              "type": {
                "tuple": [
                  {
                    "name": "hashbytes",
                    "type": {
                      "buffer": {
                        "length": 20
                      }
                    }
                  },
                  {
                    "name": "version",
                    "type": {
                      "buffer": {
                        "length": 1
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "pox-addr",
          "type": {
            "tuple": [
              {
                "name": "hashbytes",
                "type": {
                  "buffer": {
                    "length": 20
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 1
                  }
                }
              }
            ]
          }
        },
        {
          "name": "first-reward-cycle",
          "type": "uint128"
        },
        {
          "name": "num-cycles",
          "type": "uint128"
        },
        {
          "name": "amount-ustx",
          "type": "uint128"
        }
      ],
      "name": "add-pox-addr-to-reward-cycles",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "pox-addr",
          "type": {
            "tuple": [
              {
                "name": "hashbytes",
                "type": {
                  "buffer": {
                    "length": 20
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 1
                  }
                }
              }
            ]
          }
        },
        {
          "name": "first-reward-cycle",
          "type": "uint128"
        },
        {
          "name": "num-cycles",
          "type": "uint128"
        },
        {
          "name": "amount-ustx",
          "type": "uint128"
        }
      ],
      "name": "add-pox-partial-stacked",
      "outputs": {
        "type": "bool"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "cycle-index",
          "type": "uint128"
        },
        {
          "name": "params",
          "type": {
            "tuple": [
              {
                "name": "amount-ustx",
                "type": "uint128"
              },
              {
                "name": "num-cycles",
                "type": "uint128"
              },
              {
                "name": "pox-addr",
                "type": {
                  "tuple": [
                    {
                      "name": "hashbytes",
                      "type": {
                        "buffer": {
                          "length": 20
                        }
                      }
                    },
                    {
                      "name": "version",
                      "type": {
                        "buffer": {
                          "length": 1
                        }
                      }
                    }
                  ]
                }
              },
              {
                "name": "reward-cycle",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "add-pox-partial-stacked-to-ith-cycle",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "amount-ustx",
              "type": "uint128"
            },
            {
              "name": "num-cycles",
              "type": "uint128"
            },
            {
              "name": "pox-addr",
              "type": {
                "tuple": [
                  {
                    "name": "hashbytes",
                    "type": {
                      "buffer": {
                        "length": 20
                      }
                    }
                  },
                  {
                    "name": "version",
                    "type": {
                      "buffer": {
                        "length": 1
                      }
                    }
                  }
                ]
              }
            },
            {
              "name": "reward-cycle",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "pox-addr",
          "type": {
            "tuple": [
              {
                "name": "hashbytes",
                "type": {
                  "buffer": {
                    "length": 20
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 1
                  }
                }
              }
            ]
          }
        },
        {
          "name": "reward-cycle",
          "type": "uint128"
        },
        {
          "name": "amount-ustx",
          "type": "uint128"
        }
      ],
      "name": "append-reward-cycle-pox-addr",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "height",
          "type": "uint128"
        }
      ],
      "name": "burn-height-to-reward-cycle",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [],
      "name": "check-caller-allowed",
      "outputs": {
        "type": "bool"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "version",
          "type": {
            "buffer": {
              "length": 1
            }
          }
        }
      ],
      "name": "check-pox-addr-version",
      "outputs": {
        "type": "bool"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "lock-period",
          "type": "uint128"
        }
      ],
      "name": "check-pox-lock-period",
      "outputs": {
        "type": "bool"
      }
    },
    {
      "access": "private",
      "args": [],
      "name": "current-pox-reward-cycle",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "stacker",
          "type": "principal"
        }
      ],
      "name": "get-check-delegation",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "amount-ustx",
                "type": "uint128"
              },
              {
                "name": "delegated-to",
                "type": "principal"
              },
              {
                "name": "pox-addr",
                "type": {
                  "optional": {
                    "tuple": [
                      {
                        "name": "hashbytes",
                        "type": {
                          "buffer": {
                            "length": 20
                          }
                        }
                      },
                      {
                        "name": "version",
                        "type": {
                          "buffer": {
                            "length": 1
                          }
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "until-burn-ht",
                "type": {
                  "optional": "uint128"
                }
              }
            ]
          }
        }
      }
    },
    {
      "access": "private",
      "args": [],
      "name": "next-cycle-rejection-votes",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "cycle",
          "type": "uint128"
        }
      ],
      "name": "reward-cycle-to-burn-height",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "caller",
          "type": "principal"
        },
        {
          "name": "until-burn-ht",
          "type": {
            "optional": "uint128"
          }
        }
      ],
      "name": "allow-contract-caller",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "stacker",
          "type": "principal"
        },
        {
          "name": "amount-ustx",
          "type": "uint128"
        },
        {
          "name": "pox-addr",
          "type": {
            "tuple": [
              {
                "name": "hashbytes",
                "type": {
                  "buffer": {
                    "length": 20
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 1
                  }
                }
              }
            ]
          }
        },
        {
          "name": "start-burn-ht",
          "type": "uint128"
        },
        {
          "name": "lock-period",
          "type": "uint128"
        }
      ],
      "name": "delegate-stack-stx",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": {
              "tuple": [
                {
                  "name": "lock-amount",
                  "type": "uint128"
                },
                {
                  "name": "stacker",
                  "type": "principal"
                },
                {
                  "name": "unlock-burn-height",
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
          "name": "amount-ustx",
          "type": "uint128"
        },
        {
          "name": "delegate-to",
          "type": "principal"
        },
        {
          "name": "until-burn-ht",
          "type": {
            "optional": "uint128"
          }
        },
        {
          "name": "pox-addr",
          "type": {
            "optional": {
              "tuple": [
                {
                  "name": "hashbytes",
                  "type": {
                    "buffer": {
                      "length": 20
                    }
                  }
                },
                {
                  "name": "version",
                  "type": {
                    "buffer": {
                      "length": 1
                    }
                  }
                }
              ]
            }
          }
        }
      ],
      "name": "delegate-stx",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "caller",
          "type": "principal"
        }
      ],
      "name": "disallow-contract-caller",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [],
      "name": "reject-pox",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [],
      "name": "revoke-delegate-stx",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "first-burn-height",
          "type": "uint128"
        },
        {
          "name": "prepare-cycle-length",
          "type": "uint128"
        },
        {
          "name": "reward-cycle-length",
          "type": "uint128"
        },
        {
          "name": "rejection-fraction",
          "type": "uint128"
        }
      ],
      "name": "set-burnchain-parameters",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "pox-addr",
          "type": {
            "tuple": [
              {
                "name": "hashbytes",
                "type": {
                  "buffer": {
                    "length": 20
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 1
                  }
                }
              }
            ]
          }
        },
        {
          "name": "reward-cycle",
          "type": "uint128"
        }
      ],
      "name": "stack-aggregation-commit",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "amount-ustx",
          "type": "uint128"
        },
        {
          "name": "pox-addr",
          "type": {
            "tuple": [
              {
                "name": "hashbytes",
                "type": {
                  "buffer": {
                    "length": 20
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 1
                  }
                }
              }
            ]
          }
        },
        {
          "name": "start-burn-ht",
          "type": "uint128"
        },
        {
          "name": "lock-period",
          "type": "uint128"
        }
      ],
      "name": "stack-stx",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": {
              "tuple": [
                {
                  "name": "lock-amount",
                  "type": "uint128"
                },
                {
                  "name": "stacker",
                  "type": "principal"
                },
                {
                  "name": "unlock-burn-height",
                  "type": "uint128"
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
          "name": "pox-addr",
          "type": {
            "tuple": [
              {
                "name": "hashbytes",
                "type": {
                  "buffer": {
                    "length": 20
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 1
                  }
                }
              }
            ]
          }
        },
        {
          "name": "amount-ustx",
          "type": "uint128"
        },
        {
          "name": "first-reward-cycle",
          "type": "uint128"
        },
        {
          "name": "num-cycles",
          "type": "uint128"
        }
      ],
      "name": "can-stack-stx",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-pox-info",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "tuple": [
                {
                  "name": "current-rejection-votes",
                  "type": "uint128"
                },
                {
                  "name": "first-burnchain-block-height",
                  "type": "uint128"
                },
                {
                  "name": "min-amount-ustx",
                  "type": "uint128"
                },
                {
                  "name": "prepare-cycle-length",
                  "type": "uint128"
                },
                {
                  "name": "rejection-fraction",
                  "type": "uint128"
                },
                {
                  "name": "reward-cycle-id",
                  "type": "uint128"
                },
                {
                  "name": "reward-cycle-length",
                  "type": "uint128"
                },
                {
                  "name": "total-liquid-supply-ustx",
                  "type": "uint128"
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
          "name": "stacker",
          "type": "principal"
        },
        {
          "name": "reward-cycle",
          "type": "uint128"
        }
      ],
      "name": "get-pox-rejection",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "amount",
                "type": "uint128"
              }
            ]
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "reward-cycle",
          "type": "uint128"
        },
        {
          "name": "index",
          "type": "uint128"
        }
      ],
      "name": "get-reward-set-pox-address",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "pox-addr",
                "type": {
                  "tuple": [
                    {
                      "name": "hashbytes",
                      "type": {
                        "buffer": {
                          "length": 20
                        }
                      }
                    },
                    {
                      "name": "version",
                      "type": {
                        "buffer": {
                          "length": 1
                        }
                      }
                    }
                  ]
                }
              },
              {
                "name": "total-ustx",
                "type": "uint128"
              }
            ]
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "reward-cycle",
          "type": "uint128"
        }
      ],
      "name": "get-reward-set-size",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "stacker",
          "type": "principal"
        }
      ],
      "name": "get-stacker-info",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "amount-ustx",
                "type": "uint128"
              },
              {
                "name": "first-reward-cycle",
                "type": "uint128"
              },
              {
                "name": "lock-period",
                "type": "uint128"
              },
              {
                "name": "pox-addr",
                "type": {
                  "tuple": [
                    {
                      "name": "hashbytes",
                      "type": {
                        "buffer": {
                          "length": 20
                        }
                      }
                    },
                    {
                      "name": "version",
                      "type": {
                        "buffer": {
                          "length": 1
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-stacking-minimum",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "reward-cycle",
          "type": "uint128"
        }
      ],
      "name": "get-total-ustx-stacked",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "reward-cycle",
          "type": "uint128"
        }
      ],
      "name": "is-pox-active",
      "outputs": {
        "type": "bool"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "pox-addr",
          "type": {
            "tuple": [
              {
                "name": "hashbytes",
                "type": {
                  "buffer": {
                    "length": 20
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 1
                  }
                }
              }
            ]
          }
        },
        {
          "name": "amount-ustx",
          "type": "uint128"
        },
        {
          "name": "first-reward-cycle",
          "type": "uint128"
        },
        {
          "name": "num-cycles",
          "type": "uint128"
        }
      ],
      "name": "minimal-can-stack-stx",
      "outputs": {
        "type": {
          "response": {
            "error": "int128",
            "ok": "bool"
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
            "name": "contract-caller",
            "type": "principal"
          },
          {
            "name": "sender",
            "type": "principal"
          }
        ]
      },
      "name": "allowance-contract-callers",
      "value": {
        "tuple": [
          {
            "name": "until-burn-ht",
            "type": {
              "optional": "uint128"
            }
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "stacker",
            "type": "principal"
          }
        ]
      },
      "name": "delegation-state",
      "value": {
        "tuple": [
          {
            "name": "amount-ustx",
            "type": "uint128"
          },
          {
            "name": "delegated-to",
            "type": "principal"
          },
          {
            "name": "pox-addr",
            "type": {
              "optional": {
                "tuple": [
                  {
                    "name": "hashbytes",
                    "type": {
                      "buffer": {
                        "length": 20
                      }
                    }
                  },
                  {
                    "name": "version",
                    "type": {
                      "buffer": {
                        "length": 1
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "name": "until-burn-ht",
            "type": {
              "optional": "uint128"
            }
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "pox-addr",
            "type": {
              "tuple": [
                {
                  "name": "hashbytes",
                  "type": {
                    "buffer": {
                      "length": 20
                    }
                  }
                },
                {
                  "name": "version",
                  "type": {
                    "buffer": {
                      "length": 1
                    }
                  }
                }
              ]
            }
          },
          {
            "name": "reward-cycle",
            "type": "uint128"
          },
          {
            "name": "sender",
            "type": "principal"
          }
        ]
      },
      "name": "partial-stacked-by-cycle",
      "value": {
        "tuple": [
          {
            "name": "stacked-amount",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "index",
            "type": "uint128"
          },
          {
            "name": "reward-cycle",
            "type": "uint128"
          }
        ]
      },
      "name": "reward-cycle-pox-address-list",
      "value": {
        "tuple": [
          {
            "name": "pox-addr",
            "type": {
              "tuple": [
                {
                  "name": "hashbytes",
                  "type": {
                    "buffer": {
                      "length": 20
                    }
                  }
                },
                {
                  "name": "version",
                  "type": {
                    "buffer": {
                      "length": 1
                    }
                  }
                }
              ]
            }
          },
          {
            "name": "total-ustx",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "reward-cycle",
            "type": "uint128"
          }
        ]
      },
      "name": "reward-cycle-pox-address-list-len",
      "value": {
        "tuple": [
          {
            "name": "len",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "reward-cycle",
            "type": "uint128"
          }
        ]
      },
      "name": "reward-cycle-total-stacked",
      "value": {
        "tuple": [
          {
            "name": "total-ustx",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "reward-cycle",
            "type": "uint128"
          }
        ]
      },
      "name": "stacking-rejection",
      "value": {
        "tuple": [
          {
            "name": "amount",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "reward-cycle",
            "type": "uint128"
          },
          {
            "name": "stacker",
            "type": "principal"
          }
        ]
      },
      "name": "stacking-rejectors",
      "value": {
        "tuple": [
          {
            "name": "amount",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "stacker",
            "type": "principal"
          }
        ]
      },
      "name": "stacking-state",
      "value": {
        "tuple": [
          {
            "name": "amount-ustx",
            "type": "uint128"
          },
          {
            "name": "first-reward-cycle",
            "type": "uint128"
          },
          {
            "name": "lock-period",
            "type": "uint128"
          },
          {
            "name": "pox-addr",
            "type": {
              "tuple": [
                {
                  "name": "hashbytes",
                  "type": {
                    "buffer": {
                      "length": 20
                    }
                  }
                },
                {
                  "name": "version",
                  "type": {
                    "buffer": {
                      "length": 1
                    }
                  }
                }
              ]
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
      "name": "ADDRESS_VERSION_P2PKH",
      "type": {
        "buffer": {
          "length": 1
        }
      }
    },
    {
      "access": "constant",
      "name": "ADDRESS_VERSION_P2SH",
      "type": {
        "buffer": {
          "length": 1
        }
      }
    },
    {
      "access": "constant",
      "name": "ADDRESS_VERSION_P2WPKH",
      "type": {
        "buffer": {
          "length": 1
        }
      }
    },
    {
      "access": "constant",
      "name": "ADDRESS_VERSION_P2WSH",
      "type": {
        "buffer": {
          "length": 1
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_DELEGATION_EXPIRES_DURING_LOCK",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_DELEGATION_POX_ADDR_REQUIRED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_DELEGATION_TOO_MUCH_LOCKED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_START_BURN_HEIGHT",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_NOT_ALLOWED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_ALREADY_DELEGATED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_ALREADY_REJECTED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_ALREADY_STACKED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_EXPIRED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_INSUFFICIENT_FUNDS",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_INVALID_AMOUNT",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_INVALID_LOCK_PERIOD",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_INVALID_POX_ADDRESS",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_NO_SUCH_PRINCIPAL",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_PERMISSION_DENIED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_POX_ADDRESS_IN_USE",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_STX_LOCKED",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_THRESHOLD_NOT_MET",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "ERR_STACKING_UNREACHABLE",
      "type": "int128"
    },
    {
      "access": "constant",
      "name": "MAX_POX_REWARD_CYCLES",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "MIN_POX_REWARD_CYCLES",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "POX_REJECTION_FRACTION",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "PREPARE_CYCLE_LENGTH",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "REWARD_CYCLE_LENGTH",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "STACKING_THRESHOLD_100",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "STACKING_THRESHOLD_25",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "configured",
      "type": "bool"
    },
    {
      "access": "variable",
      "name": "first-burnchain-block-height",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "pox-prepare-cycle-length",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "pox-rejection-fraction",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "pox-reward-cycle-length",
      "type": "uint128"
    }
  ]
};