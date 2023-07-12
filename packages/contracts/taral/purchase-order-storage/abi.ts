
  import { ClarityAbi } from 'lib-shared';

  export const PurchaseOrderStorageInterface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "value",
          "type": {
            "optional": {
              "tuple": [
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
                },
                {
                  "name": "exporter-id",
                  "type": "uint128"
                },
                {
                  "name": "hash",
                  "type": {
                    "buffer": {
                      "length": 256
                    }
                  }
                },
                {
                  "name": "importer-id",
                  "type": "uint128"
                },
                {
                  "name": "payment-term",
                  "type": {
                    "string-utf8": {
                      "length": 200
                    }
                  }
                }
              ]
            }
          }
        }
      ],
      "name": "is-valid-value",
      "outputs": {
        "type": "bool"
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "exporter-id",
          "type": "uint128"
        },
        {
          "name": "importer-id",
          "type": "uint128"
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
      "name": "add-order",
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
          "name": "order-detail-hash",
          "type": {
            "buffer": {
              "length": 256
            }
          }
        }
      ],
      "name": "add-order-details",
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
      "args": [],
      "name": "increment-order-id-nonce",
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
      "access": "read_only",
      "args": [],
      "name": "get-order-id-nonce",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "order-id",
          "type": "uint128"
        }
      ],
      "name": "get-purchase-order",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
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
              },
              {
                "name": "exporter-id",
                "type": "uint128"
              },
              {
                "name": "hash",
                "type": {
                  "buffer": {
                    "length": 256
                  }
                }
              },
              {
                "name": "importer-id",
                "type": "uint128"
              },
              {
                "name": "payment-term",
                "type": {
                  "string-utf8": {
                    "length": 200
                  }
                }
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
          "name": "order-id",
          "type": "uint128"
        }
      ],
      "name": "get-purchase-order-detail",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "hash",
                "type": {
                  "buffer": {
                    "length": 256
                  }
                }
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
          "name": "order-ids",
          "type": {
            "list": {
              "length": 100,
              "type": "uint128"
            }
          }
        }
      ],
      "name": "get-purchase-orders",
      "outputs": {
        "type": {
          "list": {
            "length": 100,
            "type": {
              "optional": {
                "tuple": [
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
                  },
                  {
                    "name": "exporter-id",
                    "type": "uint128"
                  },
                  {
                    "name": "hash",
                    "type": {
                      "buffer": {
                        "length": 256
                      }
                    }
                  },
                  {
                    "name": "importer-id",
                    "type": "uint128"
                  },
                  {
                    "name": "payment-term",
                    "type": {
                      "string-utf8": {
                        "length": 200
                      }
                    }
                  }
                ]
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
            "name": "id",
            "type": "uint128"
          }
        ]
      },
      "name": "order",
      "value": {
        "tuple": [
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
          },
          {
            "name": "exporter-id",
            "type": "uint128"
          },
          {
            "name": "hash",
            "type": {
              "buffer": {
                "length": 256
              }
            }
          },
          {
            "name": "importer-id",
            "type": "uint128"
          },
          {
            "name": "payment-term",
            "type": {
              "string-utf8": {
                "length": 200
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
      "name": "order-detail",
      "value": {
        "tuple": [
          {
            "name": "hash",
            "type": {
              "buffer": {
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
      "access": "variable",
      "name": "order-id-nonce",
      "type": "uint128"
    }
  ]
};