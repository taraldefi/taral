
  import { ClarityAbi } from 'lib-shared';

  export const InsurancePoolAuditInterface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "out",
          "type": {
            "tuple": [
              {
                "name": "scriptPubKey",
                "type": {
                  "buffer": {
                    "length": 128
                  }
                }
              },
              {
                "name": "value",
                "type": "uint128"
              }
            ]
          }
        },
        {
          "name": "result",
          "type": "uint128"
        }
      ],
      "name": "add-value",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "entry",
          "type": {
            "tuple": [
              {
                "name": "scriptPubKey",
                "type": {
                  "buffer": {
                    "length": 128
                  }
                }
              },
              {
                "name": "value",
                "type": {
                  "buffer": {
                    "length": 8
                  }
                }
              }
            ]
          }
        },
        {
          "name": "result",
          "type": {
            "list": {
              "length": 8,
              "type": {
                "tuple": [
                  {
                    "name": "scriptPubKey",
                    "type": {
                      "buffer": {
                        "length": 128
                      }
                    }
                  },
                  {
                    "name": "value",
                    "type": "uint128"
                  }
                ]
              }
            }
          }
        }
      ],
      "name": "find-pool-outs",
      "outputs": {
        "type": {
          "list": {
            "length": 8,
            "type": {
              "tuple": [
                {
                  "name": "scriptPubKey",
                  "type": {
                    "buffer": {
                      "length": 128
                    }
                  }
                },
                {
                  "name": "value",
                  "type": "uint128"
                }
              ]
            }
          }
        }
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "height",
          "type": "uint128"
        },
        {
          "name": "tx",
          "type": {
            "buffer": {
              "length": 1024
            }
          }
        },
        {
          "name": "pool-out-value",
          "type": "uint128"
        },
        {
          "name": "price",
          "type": "uint128"
        }
      ],
      "name": "map-add-tx",
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
      "access": "private",
      "args": [
        {
          "name": "height",
          "type": "uint128"
        }
      ],
      "name": "oracle-by-hash",
      "outputs": {
        "type": {
          "optional": "uint128"
        }
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
      "name": "oracle-get-price-stx-btc",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "price",
          "type": {
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
        },
        {
          "name": "height",
          "type": "uint128"
        }
      ],
      "name": "update",
      "outputs": {
        "type": "bool"
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "block",
          "type": {
            "tuple": [
              {
                "name": "height",
                "type": "uint128"
              },
              {
                "name": "merkle-root",
                "type": {
                  "buffer": {
                    "length": 32
                  }
                }
              },
              {
                "name": "nbits",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "nonce",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "parent",
                "type": {
                  "buffer": {
                    "length": 32
                  }
                }
              },
              {
                "name": "timestamp",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              }
            ]
          }
        },
        {
          "name": "tx",
          "type": {
            "tuple": [
              {
                "name": "ins",
                "type": {
                  "list": {
                    "length": 8,
                    "type": {
                      "tuple": [
                        {
                          "name": "outpoint",
                          "type": {
                            "tuple": [
                              {
                                "name": "hash",
                                "type": {
                                  "buffer": {
                                    "length": 32
                                  }
                                }
                              },
                              {
                                "name": "index",
                                "type": {
                                  "buffer": {
                                    "length": 4
                                  }
                                }
                              }
                            ]
                          }
                        },
                        {
                          "name": "scriptSig",
                          "type": {
                            "buffer": {
                              "length": 256
                            }
                          }
                        },
                        {
                          "name": "sequence",
                          "type": {
                            "buffer": {
                              "length": 4
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "locktime",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "outs",
                "type": {
                  "list": {
                    "length": 8,
                    "type": {
                      "tuple": [
                        {
                          "name": "scriptPubKey",
                          "type": {
                            "buffer": {
                              "length": 128
                            }
                          }
                        },
                        {
                          "name": "value",
                          "type": {
                            "buffer": {
                              "length": 8
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              }
            ]
          }
        },
        {
          "name": "proof",
          "type": {
            "tuple": [
              {
                "name": "hashes",
                "type": {
                  "list": {
                    "length": 12,
                    "type": {
                      "buffer": {
                        "length": 32
                      }
                    }
                  }
                }
              },
              {
                "name": "tree-depth",
                "type": "uint128"
              },
              {
                "name": "tx-index",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "report-btc-tx",
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
          "name": "block",
          "type": {
            "tuple": [
              {
                "name": "height",
                "type": "uint128"
              },
              {
                "name": "merkle-root",
                "type": {
                  "buffer": {
                    "length": 32
                  }
                }
              },
              {
                "name": "nbits",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "nonce",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "parent",
                "type": {
                  "buffer": {
                    "length": 32
                  }
                }
              },
              {
                "name": "timestamp",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              }
            ]
          }
        },
        {
          "name": "tx",
          "type": {
            "tuple": [
              {
                "name": "ins",
                "type": {
                  "list": {
                    "length": 8,
                    "type": {
                      "tuple": [
                        {
                          "name": "outpoint",
                          "type": {
                            "tuple": [
                              {
                                "name": "hash",
                                "type": {
                                  "buffer": {
                                    "length": 32
                                  }
                                }
                              },
                              {
                                "name": "index",
                                "type": {
                                  "buffer": {
                                    "length": 4
                                  }
                                }
                              }
                            ]
                          }
                        },
                        {
                          "name": "scriptSig",
                          "type": {
                            "buffer": {
                              "length": 256
                            }
                          }
                        },
                        {
                          "name": "sequence",
                          "type": {
                            "buffer": {
                              "length": 4
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "locktime",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "outs",
                "type": {
                  "list": {
                    "length": 8,
                    "type": {
                      "tuple": [
                        {
                          "name": "scriptPubKey",
                          "type": {
                            "buffer": {
                              "length": 128
                            }
                          }
                        },
                        {
                          "name": "value",
                          "type": {
                            "buffer": {
                              "length": 8
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              }
            ]
          }
        },
        {
          "name": "proof",
          "type": {
            "tuple": [
              {
                "name": "hashes",
                "type": {
                  "list": {
                    "length": 12,
                    "type": {
                      "buffer": {
                        "length": 32
                      }
                    }
                  }
                }
              },
              {
                "name": "tree-depth",
                "type": "uint128"
              },
              {
                "name": "tx-index",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "submit-reward-tx",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": {
              "tuple": [
                {
                  "name": "out-value",
                  "type": "uint128"
                },
                {
                  "name": "price",
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
          "name": "height",
          "type": "uint128"
        }
      ],
      "name": "wrapped-oracle-get-price-stx-btc",
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
      "access": "read_only",
      "args": [
        {
          "name": "tx",
          "type": {
            "tuple": [
              {
                "name": "ins",
                "type": {
                  "list": {
                    "length": 8,
                    "type": {
                      "tuple": [
                        {
                          "name": "outpoint",
                          "type": {
                            "tuple": [
                              {
                                "name": "hash",
                                "type": {
                                  "buffer": {
                                    "length": 32
                                  }
                                }
                              },
                              {
                                "name": "index",
                                "type": {
                                  "buffer": {
                                    "length": 4
                                  }
                                }
                              }
                            ]
                          }
                        },
                        {
                          "name": "scriptSig",
                          "type": {
                            "buffer": {
                              "length": 256
                            }
                          }
                        },
                        {
                          "name": "sequence",
                          "type": {
                            "buffer": {
                              "length": 4
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "locktime",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "outs",
                "type": {
                  "list": {
                    "length": 8,
                    "type": {
                      "tuple": [
                        {
                          "name": "scriptPubKey",
                          "type": {
                            "buffer": {
                              "length": 128
                            }
                          }
                        },
                        {
                          "name": "value",
                          "type": {
                            "buffer": {
                              "length": 8
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              }
            ]
          }
        }
      ],
      "name": "get-outs-for-pool",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "list": {
                "length": 8,
                "type": {
                  "tuple": [
                    {
                      "name": "scriptPubKey",
                      "type": {
                        "buffer": {
                          "length": 128
                        }
                      }
                    },
                    {
                      "name": "value",
                      "type": "uint128"
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
      "args": [],
      "name": "get-pool-pubscriptkey",
      "outputs": {
        "type": {
          "buffer": {
            "length": 25
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "cycle",
          "type": "uint128"
        }
      ],
      "name": "get-rewards",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "tx",
          "type": {
            "tuple": [
              {
                "name": "ins",
                "type": {
                  "list": {
                    "length": 8,
                    "type": {
                      "tuple": [
                        {
                          "name": "outpoint",
                          "type": {
                            "tuple": [
                              {
                                "name": "hash",
                                "type": {
                                  "buffer": {
                                    "length": 32
                                  }
                                }
                              },
                              {
                                "name": "index",
                                "type": {
                                  "buffer": {
                                    "length": 4
                                  }
                                }
                              }
                            ]
                          }
                        },
                        {
                          "name": "scriptSig",
                          "type": {
                            "buffer": {
                              "length": 256
                            }
                          }
                        },
                        {
                          "name": "sequence",
                          "type": {
                            "buffer": {
                              "length": 4
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "locktime",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              },
              {
                "name": "outs",
                "type": {
                  "list": {
                    "length": 8,
                    "type": {
                      "tuple": [
                        {
                          "name": "scriptPubKey",
                          "type": {
                            "buffer": {
                              "length": 128
                            }
                          }
                        },
                        {
                          "name": "value",
                          "type": {
                            "buffer": {
                              "length": 8
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "version",
                "type": {
                  "buffer": {
                    "length": 4
                  }
                }
              }
            ]
          }
        }
      ],
      "name": "get-tx-value-for-pool",
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
      "key": "uint128",
      "name": "reward-txs",
      "value": {
        "list": {
          "length": 100,
          "type": {
            "tuple": [
              {
                "name": "txid",
                "type": {
                  "buffer": {
                    "length": 1024
                  }
                }
              },
              {
                "name": "value",
                "type": "uint128"
              }
            ]
          }
        }
      }
    },
    {
      "key": "uint128",
      "name": "rewards-per-cycle",
      "value": "uint128"
    }
  ],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "ERR_FAILED_TO_GET_PRICE",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_FAILED_TO_PARSE_TX",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INSERT_FAILED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_TOO_MANY_TXS",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_TX_ADD_FAILED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_TX_NOT_FOR_POOL",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_VERIFICATION_FAILED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "pool-pubscriptkey",
      "type": {
        "buffer": {
          "length": 25
        }
      }
    },
    {
      "access": "constant",
      "name": "pool-reward-addr-hash",
      "type": {
        "buffer": {
          "length": 20
        }
      }
    },
    {
      "access": "variable",
      "name": "last-price",
      "type": {
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
  ]
};