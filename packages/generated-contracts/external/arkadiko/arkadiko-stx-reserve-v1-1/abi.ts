
import { ClarityAbi } from 'taral-shared';

export const ArkadikoStxReserveV11Interface: ClarityAbi = {
    "functions": [
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
                    "name": "token-amount",
                    "type": "uint128"
                }
            ],
            "name": "add-tokens-to-stack",
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
                    "name": "vault-owner",
                    "type": "principal"
                },
                {
                    "name": "collateral-to-return",
                    "type": "uint128"
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
                    "name": "token",
                    "type": {
                        "string-ascii": {
                            "length": 12
                        }
                    }
                },
                {
                    "name": "debt",
                    "type": "uint128"
                },
                {
                    "name": "ustx",
                    "type": "uint128"
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
                    "name": "token",
                    "type": {
                        "string-ascii": {
                            "length": 12
                        }
                    }
                },
                {
                    "name": "ustx-amount",
                    "type": "uint128"
                },
                {
                    "name": "collateralization-ratio",
                    "type": "uint128"
                },
                {
                    "name": "oracle",
                    "type": "trait_reference"
                }
            ],
            "name": "calculate-usda-count",
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
            "access": "public",
            "args": [
                {
                    "name": "token",
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
                    "name": "ustx-amount",
                    "type": "uint128"
                },
                {
                    "name": "debt",
                    "type": "uint128"
                },
                {
                    "name": "sender",
                    "type": "principal"
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
                    "name": "stack-pox",
                    "type": "bool"
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
                    "name": "token",
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
                    "name": "additional-ustx-amount",
                    "type": "uint128"
                },
                {
                    "name": "stacker-name",
                    "type": {
                        "string-ascii": {
                            "length": 256
                        }
                    }
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
                    "name": "new-vault",
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
                    "name": "new-vault",
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
                    "name": "token-string",
                    "type": {
                        "string-ascii": {
                            "length": 12
                        }
                    }
                },
                {
                    "name": "vault-owner",
                    "type": "principal"
                },
                {
                    "name": "ustx-amount",
                    "type": "uint128"
                },
                {
                    "name": "current-debt",
                    "type": "uint128"
                },
                {
                    "name": "extra-debt",
                    "type": "uint128"
                },
                {
                    "name": "collateralization-ratio",
                    "type": "uint128"
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
                    "name": "token",
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
                    "name": "stx-collateral",
                    "type": "uint128"
                },
                {
                    "name": "owner",
                    "type": "principal"
                }
            ],
            "name": "redeem-collateral",
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
                },
                {
                    "name": "sender",
                    "type": "principal"
                }
            ],
            "name": "redeem-xstx",
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
                    "name": "requested-ustx",
                    "type": "uint128"
                }
            ],
            "name": "request-stx-to-auto-payoff",
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
                    "name": "requested-ustx",
                    "type": "uint128"
                }
            ],
            "name": "request-stx-to-stack",
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
                    "name": "stacker-name",
                    "type": {
                        "string-ascii": {
                            "length": 256
                        }
                    }
                }
            ],
            "name": "set-next-stacker-name",
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
                    "name": "new-tokens-to-stack",
                    "type": "uint128"
                }
            ],
            "name": "set-tokens-to-stack",
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
                    "name": "token-amount",
                    "type": "uint128"
                }
            ],
            "name": "subtract-tokens-to-stack",
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
                    "name": "stacker-name",
                    "type": {
                        "string-ascii": {
                            "length": 256
                        }
                    }
                },
                {
                    "name": "revoked-stacking",
                    "type": "bool"
                },
                {
                    "name": "ustx-collateral",
                    "type": "uint128"
                }
            ],
            "name": "toggle-stacking",
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
                    "name": "token-string",
                    "type": {
                        "string-ascii": {
                            "length": 12
                        }
                    }
                },
                {
                    "name": "vault-owner",
                    "type": "principal"
                },
                {
                    "name": "ustx-amount",
                    "type": "uint128"
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
            "access": "read_only",
            "args": [],
            "name": "get-next-stacker-name",
            "outputs": {
                "type": {
                    "string-ascii": {
                        "length": 256
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-stx-balance",
            "outputs": {
                "type": "uint128"
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
            "name": "get-tokens-to-stack",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "uint128"
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
                        "name": "stacker-name",
                        "type": {
                            "string-ascii": {
                                "length": 256
                            }
                        }
                    }
                ]
            },
            "name": "tokens-to-stack",
            "value": {
                "tuple": [
                    {
                        "name": "amount",
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
            "name": "ERR-BURN-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-DEPOSIT-FAILED",
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
            "name": "ERR-TOO-MUCH-DEBT",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-TRANSFER-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-WITHDRAW-FAILED",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "ERR-WRONG-TOKEN",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "next-stacker-name",
            "type": {
                "string-ascii": {
                    "length": 256
                }
            }
        }
    ]
};
