import { ClarityAbi } from "../../../../lib/clarity/types";

// prettier-ignore

export const ArkadikoFreddieV11Interface: ClarityAbi = {
    "functions": [
        {
            "access": "private",
            "args": [
                {
                    "name": "token-amount",
                    "type": "uint128"
                }
            ],
            "name": "add-stx-redeemable",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "debt",
                    "type": "uint128"
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "burn-partial-debt",
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
                    "name": "i1",
                    "type": "uint128"
                },
                {
                    "name": "i2",
                    "type": "uint128"
                }
            ],
            "name": "min-of",
            "outputs": {
                "type": "uint128"
            }
        },
        {
            "access": "private",
            "args": [
                {
                    "name": "collateral-amount",
                    "type": "uint128"
                },
                {
                    "name": "collateral-token",
                    "type": {
                        "string-ascii": {
                            "length": 12
                        }
                    }
                },
                {
                    "name": "stack-pox",
                    "type": "bool"
                }
            ],
            "name": "resolve-stacking-amount",
            "outputs": {
                "type": "uint128"
            }
        },
        {
            "access": "private",
            "args": [
                {
                    "name": "stability-fee-last-accrued",
                    "type": "uint128"
                },
                {
                    "name": "debt",
                    "type": "uint128"
                },
                {
                    "name": "collateral-type-string",
                    "type": {
                        "string-ascii": {
                            "length": 12
                        }
                    }
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "stability-fee-helper",
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
            "access": "private",
            "args": [
                {
                    "name": "token-amount",
                    "type": "uint128"
                }
            ],
            "name": "subtract-stx-redeemable",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "accrue-stability-fee",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "debt",
                    "type": "uint128"
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "burn",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                },
                {
                    "name": "oracle",
                    "type": "trait_reference"
                }
            ],
            "name": "calculate-current-collateral-to-debt-ratio",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "close-vault",
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
                    "name": "collateral-amount",
                    "type": "uint128"
                },
                {
                    "name": "debt",
                    "type": "uint128"
                },
                {
                    "name": "pox-settings",
                    "type": {
                        "tuple": [
                            {
                                "name": "auto-payoff",
                                "type": "bool"
                            },
                            {
                                "name": "stack-pox",
                                "type": "bool"
                            }
                        ]
                    }
                },
                {
                    "name": "collateral-type",
                    "type": {
                        "string-ascii": {
                            "length": 12
                        }
                    }
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                },
                {
                    "name": "oracle",
                    "type": "trait_reference"
                }
            ],
            "name": "collateralize-and-mint",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "uamount",
                    "type": "uint128"
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "deposit",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "leftover-collateral",
                    "type": "uint128"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "finalize-liquidation",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "get-stability-fee-for-vault",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "liquidate",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": {
                            "tuple": [
                                {
                                    "name": "discount",
                                    "type": "uint128"
                                },
                                {
                                    "name": "extra-debt",
                                    "type": "uint128"
                                },
                                {
                                    "name": "ustx-amount",
                                    "type": "uint128"
                                },
                                {
                                    "name": "vault-debt",
                                    "type": "uint128"
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
                    "name": "new-vault-manager",
                    "type": "trait_reference"
                },
                {
                    "name": "token",
                    "type": "trait_reference"
                }
            ],
            "name": "migrate-funds",
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
                    "name": "new-vault-manager",
                    "type": "trait_reference"
                }
            ],
            "name": "migrate-state",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "extra-debt",
                    "type": "uint128"
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                },
                {
                    "name": "oracle",
                    "type": "trait_reference"
                }
            ],
            "name": "mint",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "pay-stability-fee",
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
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "token-string",
                    "type": {
                        "string-ascii": {
                            "length": 12
                        }
                    }
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "collateral-amount",
                    "type": "uint128"
                },
                {
                    "name": "sender",
                    "type": "principal"
                }
            ],
            "name": "redeem-auction-collateral",
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
                    "name": "ustx-amount",
                    "type": "uint128"
                }
            ],
            "name": "redeem-stx",
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
                    "name": "usda-amount",
                    "type": "uint128"
                },
                {
                    "name": "diko-amount",
                    "type": "uint128"
                }
            ],
            "name": "redeem-tokens",
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
                    "name": "vault-id",
                    "type": "uint128"
                }
            ],
            "name": "release-stacked-stx",
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
                    "name": "new-block-height-last-paid",
                    "type": "uint128"
                }
            ],
            "name": "set-block-height-last-paid",
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
                    "name": "new-maximum-debt-surplus",
                    "type": "uint128"
                }
            ],
            "name": "set-maximum-debt-surplus",
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
                    "name": "burn-height",
                    "type": "uint128"
                }
            ],
            "name": "set-stacking-unlock-burn-height",
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
                    "name": "new-stx-redeemable",
                    "type": "uint128"
                }
            ],
            "name": "set-stx-redeemable",
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
                    "name": "vault-id",
                    "type": "uint128"
                }
            ],
            "name": "stack-collateral",
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
            "name": "toggle-freddie-shutdown",
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
                    "name": "vault-id",
                    "type": "uint128"
                }
            ],
            "name": "toggle-stacking",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "uamount",
                    "type": "uint128"
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                },
                {
                    "name": "oracle",
                    "type": "trait_reference"
                }
            ],
            "name": "withdraw",
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
                    "name": "vault-id",
                    "type": "uint128"
                },
                {
                    "name": "reserve",
                    "type": "trait_reference"
                },
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "coll-type",
                    "type": "trait_reference"
                }
            ],
            "name": "withdraw-leftover-collateral",
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
                    "name": "vault-id",
                    "type": "uint128"
                }
            ],
            "name": "get-collateral-token-for-vault",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": {
                            "string-ascii": {
                                "length": 12
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
                    "name": "vault-id",
                    "type": "uint128"
                }
            ],
            "name": "get-collateral-type-for-vault",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": {
                            "string-ascii": {
                                "length": 12
                            }
                        }
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-diko-balance",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "uint128"
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "name",
                    "type": {
                        "string-ascii": {
                            "length": 256
                        }
                    }
                }
            ],
            "name": "get-stacking-unlock-burn-height",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "uint128"
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-stx-redeemable",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "uint128"
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-usda-balance",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "uint128"
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "vault-id",
                    "type": "uint128"
                }
            ],
            "name": "get-vault-by-id",
            "outputs": {
                "type": {
                    "tuple": [
                        {
                            "name": "auction-ended",
                            "type": "bool"
                        },
                        {
                            "name": "auto-payoff",
                            "type": "bool"
                        },
                        {
                            "name": "collateral",
                            "type": "uint128"
                        },
                        {
                            "name": "collateral-token",
                            "type": {
                                "string-ascii": {
                                    "length": 12
                                }
                            }
                        },
                        {
                            "name": "collateral-type",
                            "type": {
                                "string-ascii": {
                                    "length": 12
                                }
                            }
                        },
                        {
                            "name": "created-at-block-height",
                            "type": "uint128"
                        },
                        {
                            "name": "debt",
                            "type": "uint128"
                        },
                        {
                            "name": "id",
                            "type": "uint128"
                        },
                        {
                            "name": "is-liquidated",
                            "type": "bool"
                        },
                        {
                            "name": "leftover-collateral",
                            "type": "uint128"
                        },
                        {
                            "name": "owner",
                            "type": "principal"
                        },
                        {
                            "name": "revoked-stacking",
                            "type": "bool"
                        },
                        {
                            "name": "stability-fee-accrued",
                            "type": "uint128"
                        },
                        {
                            "name": "stability-fee-last-accrued",
                            "type": "uint128"
                        },
                        {
                            "name": "stacked-tokens",
                            "type": "uint128"
                        },
                        {
                            "name": "stacker-name",
                            "type": {
                                "string-ascii": {
                                    "length": 256
                                }
                            }
                        },
                        {
                            "name": "updated-at-block-height",
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
                    "name": "user",
                    "type": "principal"
                }
            ],
            "name": "get-vault-entries",
            "outputs": {
                "type": {
                    "tuple": [
                        {
                            "name": "ids",
                            "type": {
                                "list": {
                                    "length": 500,
                                    "type": "uint128"
                                }
                            }
                        }
                    ]
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
                        "name": "stacker-name",
                        "type": {
                            "string-ascii": {
                                "length": 256
                            }
                        }
                    }
                ]
            },
            "name": "stacking-unlock-burn-height",
            "value": {
                "tuple": [
                    {
                        "name": "height",
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
            "name": "BLOCKS-PER-DAY",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-AUCTION-NOT-ENDED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-BURN-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-BURN-HEIGHT-NOT-REACHED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-DEPOSIT-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-EMERGENCY-SHUTDOWN-ACTIVATED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-INSUFFICIENT-COLLATERAL",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-LIQUIDATION-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-MAXIMUM-DEBT-REACHED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-MINT-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-MINTER-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-NOT-AUTHORIZED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-STACKING-IN-PROGRESS",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-TRANSFER-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-VAULT-LIQUIDATED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-VAULT-NOT-LIQUIDATED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-WITHDRAW-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-WRONG-COLLATERAL-TOKEN",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-WRONG-DEBT",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "block-height-last-paid",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "freddie-shutdown-activated",
            "type": "bool"
        },
        {
            "access": "variable",
            "name": "maximum-debt-surplus",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "stx-redeemable",
            "type": "uint128"
        }
    ]
};
