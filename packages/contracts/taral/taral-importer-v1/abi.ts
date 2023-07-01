
  import { ClarityAbi } from 'lib-shared';

  export const TaralImporterV1Interface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "importer",
          "type": "principal"
        }
      ],
      "name": "get-or-create-importer-id",
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
          "name": "new-order-id",
          "type": "uint128"
        },
        {
          "name": "importer",
          "type": "principal"
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
          "name": "signature",
          "type": {
            "buffer": {
              "length": 65
            }
          }
        }
      ],
      "name": "append-order",
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
          "name": "importer",
          "type": "principal"
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
          "name": "signature",
          "type": {
            "buffer": {
              "length": 65
            }
          }
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
      "name": "register",
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
      "name": "get-info",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "tuple": [
                {
                  "name": "version",
                  "type": {
                    "string-ascii": {
                      "length": 10
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
      "name": "get-version",
      "outputs": {
        "type": {
          "string-ascii": {
            "length": 10
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "message",
          "type": {
            "buffer": {
              "length": 256
            }
          }
        }
      ],
      "name": "hash-message",
      "outputs": {
        "type": {
          "buffer": {
            "length": 32
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "hash",
          "type": {
            "buffer": {
              "length": 32
            }
          }
        },
        {
          "name": "signature",
          "type": {
            "buffer": {
              "length": 65
            }
          }
        },
        {
          "name": "signer",
          "type": "principal"
        }
      ],
      "name": "validate-signature",
      "outputs": {
        "type": "bool"
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": [
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
      "name": "ERR-importer-ALREADY-REGISTERED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR-importer-NOT-REGISTERED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_EMPTY_HASH",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_EMPTY_SIGNATURE",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_SIGNATURE",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "VERSION",
      "type": {
        "string-ascii": {
          "length": 10
        }
      }
    },
    {
      "access": "constant",
      "name": "importer-storage-error",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "message-prefix",
      "type": {
        "buffer": {
          "length": 23
        }
      }
    }
  ]
};