import { ClarityAbi } from "../../../../lib/clarity/types";

// prettier-ignore

export const ArkadikoSip10ReserveV11Interface: ClarityAbi = {
    "functions": [
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
                    "name": "ustx-amount",
                    "type": "uint128"
                },
                {
                    "name": "sender",
                    "type": "principal"
                }
            ],
            "name": "burn-xstx",
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
                    "name": "ucollateral",
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
                    "name": "ucollateral-amount",
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
                    "name": "ucollateral-amount",
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
                    "name": "additional-ucollateral-amount",
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
                    "name": "ucollateral-amount",
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
                    "name": "collateral",
                    "type": "uint128"
                }
            ],
            "name": "mint-xstx",
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
                    "name": "ucollateral",
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
                    "name": "ucollateral-amount",
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
        }
    ],
    "fungible_tokens": [],
    "maps": [],
    "non_fungible_tokens": [],
    "variables": [
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
        }
    ]
};
