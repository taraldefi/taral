
  import { ClarityAbi } from 'lib-shared';

  export const TaralPurchaseOrderInterface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [],
      "name": "get-order-id",
      "outputs": {
        "type": "uint128"
      }
    },
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
                  "name": "deliveryCountry",
                  "type": {
                    "string-utf8": {
                      "length": 10
                    }
                  }
                },
                {
                  "name": "dispatchMethod",
                  "type": {
                    "string-utf8": {
                      "length": 50
                    }
                  }
                },
                {
                  "name": "exporterId",
                  "type": "uint128"
                },
                {
                  "name": "importerId",
                  "type": "uint128"
                },
                {
                  "name": "invoiceTerms",
                  "type": {
                    "string-utf8": {
                      "length": 10
                    }
                  }
                },
                {
                  "name": "paymentTerm",
                  "type": {
                    "string-utf8": {
                      "length": 200
                    }
                  }
                },
                {
                  "name": "shipmentType",
                  "type": {
                    "string-utf8": {
                      "length": 10
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
          "name": "exporter",
          "type": "principal"
        },
        {
          "name": "importer",
          "type": "principal"
        },
        {
          "name": "deliveryCountry",
          "type": {
            "string-utf8": {
              "length": 10
            }
          }
        },
        {
          "name": "dispatchMethod",
          "type": {
            "string-utf8": {
              "length": 50
            }
          }
        },
        {
          "name": "shipmentType",
          "type": {
            "string-utf8": {
              "length": 10
            }
          }
        },
        {
          "name": "shippingRoute",
          "type": {
            "list": {
              "length": 15,
              "type": {
                "string-utf8": {
                  "length": 50
                }
              }
            }
          }
        },
        {
          "name": "paymentTerm",
          "type": {
            "string-utf8": {
              "length": 200
            }
          }
        },
        {
          "name": "items",
          "type": {
            "list": {
              "length": 30,
              "type": {
                "tuple": [
                  {
                    "name": "description",
                    "type": {
                      "string-utf8": {
                        "length": 1000
                      }
                    }
                  },
                  {
                    "name": "id",
                    "type": {
                      "string-utf8": {
                        "length": 50
                      }
                    }
                  },
                  {
                    "name": "quantity",
                    "type": "uint128"
                  },
                  {
                    "name": "type",
                    "type": {
                      "string-utf8": {
                        "length": 50
                      }
                    }
                  },
                  {
                    "name": "unitPrice",
                    "type": "uint128"
                  }
                ]
              }
            }
          }
        },
        {
          "name": "amount",
          "type": "uint128"
        },
        {
          "name": "invoiceTerms",
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
      "access": "read_only",
      "args": [
        {
          "name": "orderId",
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
                "name": "deliveryCountry",
                "type": {
                  "string-utf8": {
                    "length": 10
                  }
                }
              },
              {
                "name": "dispatchMethod",
                "type": {
                  "string-utf8": {
                    "length": 50
                  }
                }
              },
              {
                "name": "exporterId",
                "type": "uint128"
              },
              {
                "name": "importerId",
                "type": "uint128"
              },
              {
                "name": "invoiceTerms",
                "type": {
                  "string-utf8": {
                    "length": 10
                  }
                }
              },
              {
                "name": "paymentTerm",
                "type": {
                  "string-utf8": {
                    "length": 200
                  }
                }
              },
              {
                "name": "shipmentType",
                "type": {
                  "string-utf8": {
                    "length": 10
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
          "name": "orderId",
          "type": "uint128"
        }
      ],
      "name": "get-purchase-order-detail",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "item",
                "type": {
                  "list": {
                    "length": 30,
                    "type": {
                      "tuple": [
                        {
                          "name": "description",
                          "type": {
                            "string-utf8": {
                              "length": 1000
                            }
                          }
                        },
                        {
                          "name": "id",
                          "type": {
                            "string-utf8": {
                              "length": 50
                            }
                          }
                        },
                        {
                          "name": "quantity",
                          "type": "uint128"
                        },
                        {
                          "name": "type",
                          "type": {
                            "string-utf8": {
                              "length": 50
                            }
                          }
                        },
                        {
                          "name": "unitPrice",
                          "type": "uint128"
                        }
                      ]
                    }
                  }
                }
              },
              {
                "name": "shippingRoute",
                "type": {
                  "list": {
                    "length": 15,
                    "type": {
                      "string-utf8": {
                        "length": 50
                      }
                    }
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
          "name": "orderIds",
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
                    "name": "deliveryCountry",
                    "type": {
                      "string-utf8": {
                        "length": 10
                      }
                    }
                  },
                  {
                    "name": "dispatchMethod",
                    "type": {
                      "string-utf8": {
                        "length": 50
                      }
                    }
                  },
                  {
                    "name": "exporterId",
                    "type": "uint128"
                  },
                  {
                    "name": "importerId",
                    "type": "uint128"
                  },
                  {
                    "name": "invoiceTerms",
                    "type": {
                      "string-utf8": {
                        "length": 10
                      }
                    }
                  },
                  {
                    "name": "paymentTerm",
                    "type": {
                      "string-utf8": {
                        "length": 200
                      }
                    }
                  },
                  {
                    "name": "shipmentType",
                    "type": {
                      "string-utf8": {
                        "length": 10
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
            "name": "deliveryCountry",
            "type": {
              "string-utf8": {
                "length": 10
              }
            }
          },
          {
            "name": "dispatchMethod",
            "type": {
              "string-utf8": {
                "length": 50
              }
            }
          },
          {
            "name": "exporterId",
            "type": "uint128"
          },
          {
            "name": "importerId",
            "type": "uint128"
          },
          {
            "name": "invoiceTerms",
            "type": {
              "string-utf8": {
                "length": 10
              }
            }
          },
          {
            "name": "paymentTerm",
            "type": {
              "string-utf8": {
                "length": 200
              }
            }
          },
          {
            "name": "shipmentType",
            "type": {
              "string-utf8": {
                "length": 10
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
      "name": "orderDetail",
      "value": {
        "tuple": [
          {
            "name": "item",
            "type": {
              "list": {
                "length": 30,
                "type": {
                  "tuple": [
                    {
                      "name": "description",
                      "type": {
                        "string-utf8": {
                          "length": 1000
                        }
                      }
                    },
                    {
                      "name": "id",
                      "type": {
                        "string-utf8": {
                          "length": 50
                        }
                      }
                    },
                    {
                      "name": "quantity",
                      "type": "uint128"
                    },
                    {
                      "name": "type",
                      "type": {
                        "string-utf8": {
                          "length": 50
                        }
                      }
                    },
                    {
                      "name": "unitPrice",
                      "type": "uint128"
                    }
                  ]
                }
              }
            }
          },
          {
            "name": "shippingRoute",
            "type": {
              "list": {
                "length": 15,
                "type": {
                  "string-utf8": {
                    "length": 50
                  }
                }
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
      "name": "ERR-EXPORTER-NOT-REGISTERED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
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
      "name": "ERR-IMPORTER-NOT-REGISTERED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-PERMISSION-DENIED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "variable",
      "name": "orderIdNonce",
      "type": "uint128"
    }
  ]
};