
  import { ClarityAbi } from 'lib-shared';

  export const TaralLenderInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "name",
          "type": {
            "string-utf8": {
              "length": 128
            }
          }
        },
        {
          "name": "description",
          "type": {
            "string-utf8": {
              "length": 256
            }
          }
        },
        {
          "name": "country",
          "type": {
            "string-utf8": {
              "length": 56
            }
          }
        }
      ],
      "name": "register-lender",
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
          "name": "lender-id",
          "type": "principal"
        },
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "name": "update-lender-track-record",
      "outputs": {
        "type": {
          "response": {
            "error": {
              "string-ascii": {
                "length": 16
              }
            },
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "id",
          "type": "principal"
        }
      ],
      "name": "get-lender",
      "outputs": {
        "type": {
          "optional": {
            "tuple": [
              {
                "name": "country",
                "type": {
                  "string-utf8": {
                    "length": 56
                  }
                }
              },
              {
                "name": "description",
                "type": {
                  "string-utf8": {
                    "length": 256
                  }
                }
              },
              {
                "name": "failed-transactions",
                "type": "uint128"
              },
              {
                "name": "name",
                "type": {
                  "string-utf8": {
                    "length": 128
                  }
                }
              },
              {
                "name": "successful-transactions",
                "type": "uint128"
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
            "type": "principal"
          }
        ]
      },
      "name": "lenders",
      "value": {
        "tuple": [
          {
            "name": "country",
            "type": {
              "string-utf8": {
                "length": 56
              }
            }
          },
          {
            "name": "description",
            "type": {
              "string-utf8": {
                "length": 256
              }
            }
          },
          {
            "name": "failed-transactions",
            "type": "uint128"
          },
          {
            "name": "name",
            "type": {
              "string-utf8": {
                "length": 128
              }
            }
          },
          {
            "name": "successful-transactions",
            "type": "uint128"
          }
        ]
      }
    }
  ],
  "non_fungible_tokens": [],
  "variables": []
};