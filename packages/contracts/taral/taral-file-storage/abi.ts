
  import { ClarityAbi } from 'lib-shared';

  export const TaralFileStorageInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
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
      "name": "delete-file-authorizations",
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
          "name": "filename",
          "type": {
            "string-ascii": {
              "length": 128
            }
          }
        },
        {
          "name": "participant",
          "type": "principal"
        },
        {
          "name": "hash",
          "type": {
            "buffer": {
              "length": 256
            }
          }
        }
      ],
      "name": "delete-files-by-name",
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
        },
        {
          "name": "owns",
          "type": "bool"
        },
        {
          "name": "can-write",
          "type": "bool"
        },
        {
          "name": "can-read",
          "type": "bool"
        }
      ],
      "name": "set-file-authorizations",
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
          "name": "filename",
          "type": {
            "string-ascii": {
              "length": 128
            }
          }
        }
      ],
      "name": "set-file-hash",
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
          "name": "changed-by",
          "type": "principal"
        }
      ],
      "name": "set-file-versions",
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
        }
      ],
      "name": "set-files",
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
          "name": "filename",
          "type": {
            "string-ascii": {
              "length": 128
            }
          }
        },
        {
          "name": "participant",
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
          "name": "file-id",
          "type": {
            "string-utf8": {
              "length": 36
            }
          }
        }
      ],
      "name": "set-files-by-name",
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
          }
        },
        {
          "name": "value-tuple",
          "type": {
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
        }
      ],
      "name": "update-file-authorizations",
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
          "name": "value-tuple",
          "type": {
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
        }
      ],
      "name": "update-file-hash",
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
      "name": "get-file-authorizations",
      "outputs": {
        "type": {
          "optional": {
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
          "optional": {
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
      "name": "get-files",
      "outputs": {
        "type": {
          "optional": {
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
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "filename",
          "type": {
            "string-ascii": {
              "length": 128
            }
          }
        },
        {
          "name": "participant",
          "type": "principal"
        },
        {
          "name": "hash",
          "type": {
            "buffer": {
              "length": 256
            }
          }
        }
      ],
      "name": "get-files-by-name",
      "outputs": {
        "type": {
          "optional": {
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
    }
  ],
  "non_fungible_tokens": [],
  "variables": []
};