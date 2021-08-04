import { ClarityAbi } from "../../../../shared/clarity/types";

// prettier-ignore

export const ArkadikoGovernanceV11Interface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "proposal-id",
          "type": "uint128"
        }
      ],
      "name": "execute-proposal",
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
          "name": "change",
          "type": {
            "tuple": [
              {
                "name": "address",
                "type": "principal"
              },
              {
                "name": "can-burn",
                "type": "bool"
              },
              {
                "name": "can-mint",
                "type": "bool"
              },
              {
                "name": "name",
                "type": {
                  "string-ascii": {
                    "length": 256
                  }
                }
              },
              {
                "name": "qualified-name",
                "type": "principal"
              }
            ]
          }
        }
      ],
      "name": "execute-proposal-change-contract",
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
          "name": "name",
          "type": {
            "string-ascii": {
              "length": 256
            }
          }
        },
        {
          "name": "address",
          "type": "principal"
        },
        {
          "name": "qualified-name",
          "type": "principal"
        },
        {
          "name": "can-mint",
          "type": "bool"
        },
        {
          "name": "can-burn",
          "type": "bool"
        }
      ],
      "name": "add-contract-address",
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
          "name": "proposal-id",
          "type": "uint128"
        }
      ],
      "name": "end-proposal",
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
          "name": "start-block-height",
          "type": "uint128"
        },
        {
          "name": "title",
          "type": {
            "string-utf8": {
              "length": 256
            }
          }
        },
        {
          "name": "url",
          "type": {
            "string-utf8": {
              "length": 256
            }
          }
        },
        {
          "name": "contract-changes",
          "type": {
            "list": {
              "length": 10,
              "type": {
                "tuple": [
                  {
                    "name": "address",
                    "type": "principal"
                  },
                  {
                    "name": "can-burn",
                    "type": "bool"
                  },
                  {
                    "name": "can-mint",
                    "type": "bool"
                  },
                  {
                    "name": "name",
                    "type": {
                      "string-ascii": {
                        "length": 256
                      }
                    }
                  },
                  {
                    "name": "qualified-name",
                    "type": "principal"
                  }
                ]
              }
            }
          }
        }
      ],
      "name": "propose",
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
          "name": "token",
          "type": "trait_reference"
        },
        {
          "name": "proposal-id",
          "type": "uint128"
        },
        {
          "name": "member",
          "type": "principal"
        }
      ],
      "name": "return-votes-to-member",
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
      "args": [],
      "name": "toggle-governance-shutdown",
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
          "name": "token",
          "type": "trait_reference"
        },
        {
          "name": "proposal-id",
          "type": "uint128"
        },
        {
          "name": "amount",
          "type": "uint128"
        }
      ],
      "name": "vote-against",
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
          "name": "token",
          "type": "trait_reference"
        },
        {
          "name": "proposal-id",
          "type": "uint128"
        },
        {
          "name": "amount",
          "type": "uint128"
        }
      ],
      "name": "vote-for",
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
          "name": "proposal-id",
          "type": "uint128"
        }
      ],
      "name": "get-proposal-by-id",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "contract-changes",
              "type": {
                "list": {
                  "length": 10,
                  "type": {
                    "tuple": [
                      {
                        "name": "address",
                        "type": "principal"
                      },
                      {
                        "name": "can-burn",
                        "type": "bool"
                      },
                      {
                        "name": "can-mint",
                        "type": "bool"
                      },
                      {
                        "name": "name",
                        "type": {
                          "string-ascii": {
                            "length": 256
                          }
                        }
                      },
                      {
                        "name": "qualified-name",
                        "type": "principal"
                      }
                    ]
                  }
                }
              }
            },
            {
              "name": "end-block-height",
              "type": "uint128"
            },
            {
              "name": "id",
              "type": "uint128"
            },
            {
              "name": "is-open",
              "type": "bool"
            },
            {
              "name": "no-votes",
              "type": "uint128"
            },
            {
              "name": "proposer",
              "type": "principal"
            },
            {
              "name": "start-block-height",
              "type": "uint128"
            },
            {
              "name": "title",
              "type": {
                "string-utf8": {
                  "length": 256
                }
              }
            },
            {
              "name": "url",
              "type": {
                "string-utf8": {
                  "length": 256
                }
              }
            },
            {
              "name": "yes-votes",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-proposal-ids",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "list": {
                "length": 100,
                "type": "uint128"
              }
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [],
      "name": "get-proposals",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "list": {
                "length": 100,
                "type": {
                  "tuple": [
                    {
                      "name": "contract-changes",
                      "type": {
                        "list": {
                          "length": 10,
                          "type": {
                            "tuple": [
                              {
                                "name": "address",
                                "type": "principal"
                              },
                              {
                                "name": "can-burn",
                                "type": "bool"
                              },
                              {
                                "name": "can-mint",
                                "type": "bool"
                              },
                              {
                                "name": "name",
                                "type": {
                                  "string-ascii": {
                                    "length": 256
                                  }
                                }
                              },
                              {
                                "name": "qualified-name",
                                "type": "principal"
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      "name": "end-block-height",
                      "type": "uint128"
                    },
                    {
                      "name": "id",
                      "type": "uint128"
                    },
                    {
                      "name": "is-open",
                      "type": "bool"
                    },
                    {
                      "name": "no-votes",
                      "type": "uint128"
                    },
                    {
                      "name": "proposer",
                      "type": "principal"
                    },
                    {
                      "name": "start-block-height",
                      "type": "uint128"
                    },
                    {
                      "name": "title",
                      "type": {
                        "string-utf8": {
                          "length": 256
                        }
                      }
                    },
                    {
                      "name": "url",
                      "type": {
                        "string-utf8": {
                          "length": 256
                        }
                      }
                    },
                    {
                      "name": "yes-votes",
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
      "args": [
        {
          "name": "proposal-id",
          "type": "uint128"
        },
        {
          "name": "member",
          "type": "principal"
        },
        {
          "name": "token",
          "type": "trait_reference"
        }
      ],
      "name": "get-tokens-by-member-by-id",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "amount",
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
          "name": "proposal-id",
          "type": "uint128"
        },
        {
          "name": "member",
          "type": "principal"
        }
      ],
      "name": "get-votes-by-member-by-id",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "vote-count",
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
          "name": "token",
          "type": "trait_reference"
        }
      ],
      "name": "is-token-accepted",
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
            "name": "id",
            "type": "uint128"
          }
        ]
      },
      "name": "proposals",
      "value": {
        "tuple": [
          {
            "name": "contract-changes",
            "type": {
              "list": {
                "length": 10,
                "type": {
                  "tuple": [
                    {
                      "name": "address",
                      "type": "principal"
                    },
                    {
                      "name": "can-burn",
                      "type": "bool"
                    },
                    {
                      "name": "can-mint",
                      "type": "bool"
                    },
                    {
                      "name": "name",
                      "type": {
                        "string-ascii": {
                          "length": 256
                        }
                      }
                    },
                    {
                      "name": "qualified-name",
                      "type": "principal"
                    }
                  ]
                }
              }
            }
          },
          {
            "name": "end-block-height",
            "type": "uint128"
          },
          {
            "name": "id",
            "type": "uint128"
          },
          {
            "name": "is-open",
            "type": "bool"
          },
          {
            "name": "no-votes",
            "type": "uint128"
          },
          {
            "name": "proposer",
            "type": "principal"
          },
          {
            "name": "start-block-height",
            "type": "uint128"
          },
          {
            "name": "title",
            "type": {
              "string-utf8": {
                "length": 256
              }
            }
          },
          {
            "name": "url",
            "type": {
              "string-utf8": {
                "length": 256
              }
            }
          },
          {
            "name": "yes-votes",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "member",
            "type": "principal"
          },
          {
            "name": "proposal-id",
            "type": "uint128"
          },
          {
            "name": "token",
            "type": "principal"
          }
        ]
      },
      "name": "tokens-by-member",
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
            "name": "member",
            "type": "principal"
          },
          {
            "name": "proposal-id",
            "type": "uint128"
          }
        ]
      },
      "name": "votes-by-member",
      "value": {
        "tuple": [
          {
            "name": "vote-count",
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
      "name": "DAO-OWNER",
      "type": "principal"
    },
    {
      "access": "constant",
      "name": "ERR-BLOCK-HEIGHT-NOT-REACHED",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-EMERGENCY-SHUTDOWN-ACTIVATED",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-NO-CONTRACT-CHANGES",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-NOT-AUTHORIZED",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-NOT-ENOUGH-BALANCE",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "ERR-WRONG-TOKEN",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "STATUS-OK",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "governance-shutdown-activated",
      "type": "bool"
    },
    {
      "access": "variable",
      "name": "proposal-count",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "proposal-ids",
      "type": {
        "list": {
          "length": 100,
          "type": "uint128"
        }
      }
    }
  ]
};
