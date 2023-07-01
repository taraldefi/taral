
  import { ClarityAbi } from 'lib-shared';

  export const BtcNftSwapInterface: ClarityAbi = {
  "functions": [
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
            "tuple": [
              {
                "name": "out",
                "type": {
                  "optional": {
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
              },
              {
                "name": "pubscriptkey",
                "type": {
                  "buffer": {
                    "length": 40
                  }
                }
              }
            ]
          }
        }
      ],
      "name": "find-out",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "out",
              "type": {
                "optional": {
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
            },
            {
              "name": "pubscriptkey",
              "type": {
                "buffer": {
                  "length": 40
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
          "name": "id",
          "type": "uint128"
        },
        {
          "name": "nft",
          "type": "trait_reference"
        }
      ],
      "name": "cancel",
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
          "name": "sats",
          "type": "uint128"
        },
        {
          "name": "btc-receiver",
          "type": {
            "buffer": {
              "length": 40
            }
          }
        },
        {
          "name": "nft-id",
          "type": "uint128"
        },
        {
          "name": "nft-receiver",
          "type": "principal"
        },
        {
          "name": "nft",
          "type": "trait_reference"
        }
      ],
      "name": "create-swap",
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
          "name": "pubscriptkey",
          "type": {
            "buffer": {
              "length": 40
            }
          }
        }
      ],
      "name": "get-out-value",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "tuple": [
                {
                  "name": "out",
                  "type": {
                    "optional": {
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
                },
                {
                  "name": "pubscriptkey",
                  "type": {
                    "buffer": {
                      "length": 40
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
          "name": "id",
          "type": "uint128"
        },
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
        },
        {
          "name": "nft",
          "type": "trait_reference"
        }
      ],
      "name": "submit-swap",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [
    {
      "key": "uint128",
      "name": "swaps",
      "value": {
        "tuple": [
          {
            "name": "btc-receiver",
            "type": {
              "buffer": {
                "length": 40
              }
            }
          },
          {
            "name": "done",
            "type": "uint128"
          },
          {
            "name": "nft",
            "type": "principal"
          },
          {
            "name": "nft-id",
            "type": "uint128"
          },
          {
            "name": "nft-receiver",
            "type": "principal"
          },
          {
            "name": "nft-sender",
            "type": "principal"
          },
          {
            "name": "sats",
            "type": "uint128"
          },
          {
            "name": "when",
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
      "name": "ERR_ALREADY_DONE",
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
      "name": "ERR_INVALID_ID",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_NFT",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_NATIVE_FAILURE",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_TOO_EARLY",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_TX_NOT_FOR_RECEIVER",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_TX_VALUE_TOO_SMALL",
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
      "name": "expiry",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "next-id",
      "type": "uint128"
    }
  ]
};