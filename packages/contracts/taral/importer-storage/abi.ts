
  import { ClarityAbi } from 'lib-shared';

  export const ImporterStorageInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
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
                  "name": "order-id",
                  "type": "uint128"
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
          "name": "importer",
          "type": "principal"
        },
        {
          "name": "importer-id",
          "type": "uint128"
        }
      ],
      "name": "add-importer",
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
          "name": "importer-id",
          "type": "uint128"
        },
        {
          "name": "importer-name",
          "type": {
            "string-utf8": {
              "length": 100
            }
          }
        },
        {
          "name": "importer-category",
          "type": {
            "string-utf8": {
              "length": 100
            }
          }
        }
      ],
      "name": "add-importer-profile",
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
          "name": "id",
          "type": "uint128"
        },
        {
          "name": "importer-id",
          "type": "uint128"
        },
        {
          "name": "order-id",
          "type": "uint128"
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
      "args": [],
      "name": "increment-importer-id-nonce",
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
          "name": "key-tuple",
          "type": {
            "tuple": [
              {
                "name": "importer-id",
                "type": "uint128"
              }
            ]
          }
        },
        {
          "name": "value-tuple",
          "type": {
            "tuple": [
              {
                "name": "category",
                "type": {
                  "string-utf8": {
                    "length": 100
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "string-utf8": {
                    "length": 100
                  }
                }
              },
              {
                "name": "orders-next-avail-id",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "update-importer-profile",
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
      "args": [
        {
          "name": "importer",
          "type": "principal"
        }
      ],
      "name": "get-importer-by-principal",
      "outputs": {
        "type": {
          "optional": "uint128"
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-importer-id-nonce",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "id",
          "type": "uint128"
        },
        {
          "name": "importer",
          "type": "principal"
        }
      ],
      "name": "get-importer-order",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "order-id",
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
          "name": "ids",
          "type": {
            "list": {
              "length": 10,
              "type": "uint128"
            }
          }
        },
        {
          "name": "principals",
          "type": {
            "list": {
              "length": 10,
              "type": "principal"
            }
          }
        }
      ],
      "name": "get-importer-orders",
      "outputs": {
        "type": {
          "list": {
            "length": 10,
            "type": {
              "optional": {
                "tuple": [
                  {
                    "name": "order-id",
                    "type": "uint128"
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
      "args": [
        {
          "name": "importer",
          "type": "principal"
        }
      ],
      "name": "get-importer-profile",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "category",
                "type": {
                  "string-utf8": {
                    "length": 100
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "string-utf8": {
                    "length": 100
                  }
                }
              },
              {
                "name": "orders-next-avail-id",
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
          "name": "principals",
          "type": {
            "list": {
              "length": 10,
              "type": "principal"
            }
          }
        }
      ],
      "name": "get-importers",
      "outputs": {
        "type": {
          "list": {
            "length": 10,
            "type": {
              "optional": {
                "tuple": [
                  {
                    "name": "category",
                    "type": {
                      "string-utf8": {
                        "length": 100
                      }
                    }
                  },
                  {
                    "name": "name",
                    "type": {
                      "string-utf8": {
                        "length": 100
                      }
                    }
                  },
                  {
                    "name": "orders-next-avail-id",
                    "type": "uint128"
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
      "args": [
        {
          "name": "importer",
          "type": {
            "tuple": [
              {
                "name": "category",
                "type": {
                  "string-utf8": {
                    "length": 100
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "string-utf8": {
                    "length": 100
                  }
                }
              },
              {
                "name": "orders-next-avail-id",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "get-orders-next-avail-id",
      "outputs": {
        "type": "uint128"
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [
    {
      "key": "principal",
      "name": "importer-by-principal",
      "value": "uint128"
    },
    {
      "key": {
        "tuple": [
          {
            "name": "importer-id",
            "type": "uint128"
          }
        ]
      },
      "name": "importer-profile",
      "value": {
        "tuple": [
          {
            "name": "category",
            "type": {
              "string-utf8": {
                "length": 100
              }
            }
          },
          {
            "name": "name",
            "type": {
              "string-utf8": {
                "length": 100
              }
            }
          },
          {
            "name": "orders-next-avail-id",
            "type": "uint128"
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
          },
          {
            "name": "importer-id",
            "type": "uint128"
          }
        ]
      },
      "name": "orders",
      "value": {
        "tuple": [
          {
            "name": "order-id",
            "type": "uint128"
          }
        ]
      }
    }
  ],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "variable",
      "name": "importer-id-nonce",
      "type": "uint128"
    }
  ]
};