
  import { ClarityAbi } from 'lib-shared';

  export const NftMarketplaceInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "token-contract",
          "type": "trait_reference"
        },
        {
          "name": "token-id",
          "type": "uint128"
        },
        {
          "name": "sender",
          "type": "principal"
        },
        {
          "name": "recipient",
          "type": "principal"
        }
      ],
      "name": "transfer-nft",
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
          "name": "auction-id",
          "type": "uint128"
        },
        {
          "name": "nft-asset-contract",
          "type": "trait_reference"
        }
      ],
      "name": "cancel-auction",
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
          "name": "listing-id",
          "type": "uint128"
        },
        {
          "name": "nft-asset-contract",
          "type": "trait_reference"
        }
      ],
      "name": "cancel-fixed-price-listing",
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
          "name": "auction-id",
          "type": "uint128"
        },
        {
          "name": "nft-asset-contract",
          "type": "trait_reference"
        }
      ],
      "name": "end-auction",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": {
              "tuple": [
                {
                  "name": "auction-id",
                  "type": "uint128"
                },
                {
                  "name": "reserve-price-met",
                  "type": "bool"
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
          "name": "nft-asset-contract",
          "type": "trait_reference"
        },
        {
          "name": "nft-asset",
          "type": {
            "tuple": [
              {
                "name": "price",
                "type": "uint128"
              },
              {
                "name": "token-id",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "list-fixed-price",
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
      "args": [],
      "name": "pause-contract",
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
          "name": "auction-id",
          "type": "uint128"
        },
        {
          "name": "bid",
          "type": "uint128"
        }
      ],
      "name": "place-bid",
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
          "name": "listing-id",
          "type": "uint128"
        },
        {
          "name": "recipient",
          "type": "principal"
        },
        {
          "name": "nft-asset-contract",
          "type": "trait_reference"
        }
      ],
      "name": "purchase-fixed-price-listing",
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
      "args": [],
      "name": "resume-contract",
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
          "name": "new-owner",
          "type": "principal"
        }
      ],
      "name": "set-owner",
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
          "name": "asset-contract",
          "type": "principal"
        },
        {
          "name": "whitelisted",
          "type": "bool"
        }
      ],
      "name": "set-whitelisted",
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
          "name": "nft-asset-contract",
          "type": "trait_reference"
        },
        {
          "name": "nft-asset",
          "type": {
            "tuple": [
              {
                "name": "end-block",
                "type": "uint128"
              },
              {
                "name": "reserve-price",
                "type": "uint128"
              },
              {
                "name": "start-bid",
                "type": "uint128"
              },
              {
                "name": "start-block",
                "type": "uint128"
              },
              {
                "name": "token-id",
                "type": "uint128"
              }
            ]
          }
        }
      ],
      "name": "start-auction",
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
          "name": "principal-to-check",
          "type": "principal"
        }
      ],
      "name": "is-blacklisted",
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
      "name": "VERSION",
      "type": {
        "string-ascii": {
          "length": 10
        }
      }
    },
    {
      "access": "constant",
      "name": "default-error-value",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-asset-contract-not-whitelisted",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-auction-ended",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-auction-not-ended",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-bid-too-low",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-bid-withdrawal",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-block-info",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-contract-paused",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-expiry-in-past",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-listing-expired",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-maker-taker-equal",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-nft-asset-mismatch",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-no-bids",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-payment-asset-mismatch",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-payment-contract-not-whitelisted",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-price-zero",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-reserve-not-met",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-unauthorised",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-unintended-taker",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-unknown-listing",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "failed-to-transfer",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "failed-to-transfer-nft",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "marketplace-storage-error",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "variable",
      "name": "contract-owner",
      "type": "principal"
    },
    {
      "access": "variable",
      "name": "contract-paused",
      "type": "bool"
    },
    {
      "access": "variable",
      "name": "is-initialized",
      "type": "bool"
    }
  ]
};