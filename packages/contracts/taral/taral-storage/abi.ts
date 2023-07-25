
  import { ClarityAbi } from 'lib-shared';

  export const TaralStorageInterface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [],
      "name": "is-owner",
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
          "name": "role-to-add",
          "type": "uint128"
        },
        {
          "name": "principal-to-add",
          "type": "principal"
        }
      ],
      "name": "add-principal-to-role",
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
          "name": "participant",
          "type": "principal"
        },
        {
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
        },
        {
          "name": "can-read",
          "type": "bool"
        },
        {
          "name": "can-write",
          "type": "bool"
        }
      ],
      "name": "grant-access",
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
          "name": "name-to-set",
          "type": {
            "string-ascii": {
              "length": 32
            }
          }
        },
        {
          "name": "symbol-to-set",
          "type": {
            "string-ascii": {
              "length": 32
            }
          }
        },
        {
          "name": "decimals-to-set",
          "type": "uint128"
        },
        {
          "name": "initial-owner",
          "type": "principal"
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
      "access": "public",
      "args": [
        {
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
        },
        {
          "name": "filename",
          "type": {
            "string-ascii": {
              "length": 128
            }
          }
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
      "name": "register-file",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": {
              "string-utf8": {
                "length": 36
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
          "name": "role-to-remove",
          "type": "uint128"
        },
        {
          "name": "principal-to-remove",
          "type": "principal"
        }
      ],
      "name": "remove-principal-from-role",
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
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
        },
        {
          "name": "participant",
          "type": "principal"
        }
      ],
      "name": "revoke-access",
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
          "name": "participant",
          "type": "principal"
        },
        {
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
        },
        {
          "name": "can-read",
          "type": "bool"
        },
        {
          "name": "can-write",
          "type": "bool"
        }
      ],
      "name": "update-access",
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
          "name": "principal-to-update",
          "type": "principal"
        },
        {
          "name": "set-blacklisted",
          "type": "bool"
        }
      ],
      "name": "update-blacklisted",
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
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
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
      "name": "update-file",
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
          "name": "participant",
          "type": "principal"
        },
        {
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
        }
      ],
      "name": "can-read-file",
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
          "name": "participant",
          "type": "principal"
        },
        {
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
        }
      ],
      "name": "can-write-file",
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
          "name": "participant",
          "type": "principal"
        }
      ],
      "name": "detect-restriction",
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
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
        }
      ],
      "name": "get-file-hash",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": {
              "buffer": {
                "length": 256
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
          "name": "role-to-check",
          "type": "uint128"
        },
        {
          "name": "principal-to-check",
          "type": "principal"
        }
      ],
      "name": "has-role",
      "outputs": {
        "type": "bool"
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
          "name": "principal-to-check",
          "type": "principal"
        }
      ],
      "name": "is-blacklisted",
      "outputs": {
        "type": "bool"
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
  "maps": [
    {
      "key": {
        "tuple": [
          {
            "name": "account",
            "type": "principal"
          }
        ]
      },
      "name": "blacklist",
      "value": {
        "tuple": [
          {
            "name": "blacklisted",
            "type": "bool"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "id",
            "type": {
              "string-utf8": {
                "length": 36
              }
            }
          },
          {
            "name": "participant",
            "type": "principal"
          }
        ]
      },
      "name": "file-authorizations",
      "value": {
        "tuple": [
          {
            "name": "can-read",
            "type": "bool"
          },
          {
            "name": "can-write",
            "type": "bool"
          },
          {
            "name": "owns",
            "type": "bool"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "id",
            "type": {
              "string-utf8": {
                "length": 36
              }
            }
          }
        ]
      },
      "name": "file-hash",
      "value": {
        "tuple": [
          {
            "name": "hash",
            "type": {
              "buffer": {
                "length": 256
              }
            }
          },
          {
            "name": "name",
            "type": {
              "string-ascii": {
                "length": 128
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
            "name": "hash",
            "type": {
              "buffer": {
                "length": 256
              }
            }
          },
          {
            "name": "id",
            "type": {
              "string-utf8": {
                "length": 36
              }
            }
          }
        ]
      },
      "name": "file-versions",
      "value": {
        "tuple": [
          {
            "name": "changed-by",
            "type": "principal"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "id",
            "type": {
              "string-utf8": {
                "length": 36
              }
            }
          }
        ]
      },
      "name": "files",
      "value": {
        "tuple": [
          {
            "name": "created",
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
            "name": "last-updated",
            "type": "uint128"
          },
          {
            "name": "name",
            "type": {
              "string-ascii": {
                "length": 128
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
            "name": "hash",
            "type": {
              "buffer": {
                "length": 256
              }
            }
          },
          {
            "name": "name",
            "type": {
              "string-ascii": {
                "length": 128
              }
            }
          },
          {
            "name": "participant",
            "type": "principal"
          }
        ]
      },
      "name": "files-by-name",
      "value": {
        "tuple": [
          {
            "name": "id",
            "type": {
              "string-utf8": {
                "length": 36
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
            "name": "account",
            "type": "principal"
          },
          {
            "name": "role",
            "type": "uint128"
          }
        ]
      },
      "name": "roles",
      "value": {
        "tuple": [
          {
            "name": "allowed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "BLACKLISTER_ROLE",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR_EMPTY_FILENAME",
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
      "name": "ERR_FILE_ALREADY_REGISTERED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_FILE_NOT_FOUND",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_FILE_ID",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_PRINCIPAL",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INVALID_ROLE",
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
      "name": "ERR_NOT_FOUND",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_UNAUTHORIZED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_UNEXPECTED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_UNKNOWN_FILE_ACCESS",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "OWNER_ROLE",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "PERMISSION_DENIED_ERROR",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "RESTRICTION_BLACKLIST",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "RESTRICTION_NONE",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "message-prefix",
      "type": {
        "buffer": {
          "length": 23
        }
      }
    },
    {
      "access": "variable",
      "name": "deployer-principal",
      "type": "principal"
    },
    {
      "access": "variable",
      "name": "is-initialized",
      "type": "bool"
    },
    {
      "access": "variable",
      "name": "owner",
      "type": "principal"
    }
  ]
};