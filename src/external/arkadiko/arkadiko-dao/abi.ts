import { ClarityAbi } from "../../../../shared/clarity/types";

// prettier-ignore

export const ArkadikoDaoInterface: ClarityAbi = {
    "functions": [
        {
            "access": "public",
            "args": [
                {
                    "name": "token",
                    "type": "trait_reference"
                },
                {
                    "name": "amount",
                    "type": "uint128"
                },
                {
                    "name": "recipient",
                    "type": "principal"
                }
            ],
            "name": "burn-token",
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
                    "name": "amount",
                    "type": "uint128"
                },
                {
                    "name": "recipient",
                    "type": "principal"
                }
            ],
            "name": "mint-token",
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
                }
            ],
            "name": "request-diko-tokens",
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
            "name": "set-contract-address",
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
                    "name": "address",
                    "type": "principal"
                }
            ],
            "name": "set-dao-owner",
            "outputs": {
                "type": {
                    "response": {
                        "error": {
                            "response": {
                                "error": "uint128",
                                "ok": "none"
                            }
                        },
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "address",
                    "type": "principal"
                }
            ],
            "name": "set-guardian-address",
            "outputs": {
                "type": {
                    "response": {
                        "error": {
                            "response": {
                                "error": "uint128",
                                "ok": "none"
                            }
                        },
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "address",
                    "type": "principal"
                }
            ],
            "name": "set-payout-address",
            "outputs": {
                "type": {
                    "response": {
                        "error": {
                            "response": {
                                "error": "uint128",
                                "ok": "none"
                            }
                        },
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [],
            "name": "toggle-emergency-shutdown",
            "outputs": {
                "type": {
                    "response": {
                        "error": {
                            "response": {
                                "error": "uint128",
                                "ok": "none"
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
                    "name": "name",
                    "type": {
                        "string-ascii": {
                            "length": 256
                        }
                    }
                }
            ],
            "name": "get-contract-address-by-name",
            "outputs": {
                "type": {
                    "optional": "principal"
                }
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "qualified-name",
                    "type": "principal"
                }
            ],
            "name": "get-contract-can-burn-by-qualified-name",
            "outputs": {
                "type": "bool"
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "qualified-name",
                    "type": "principal"
                }
            ],
            "name": "get-contract-can-mint-by-qualified-name",
            "outputs": {
                "type": "bool"
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-dao-owner",
            "outputs": {
                "type": "principal"
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-emergency-shutdown-activated",
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
            "args": [],
            "name": "get-guardian-address",
            "outputs": {
                "type": "principal"
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-payout-address",
            "outputs": {
                "type": "principal"
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
            "name": "get-qualified-name-by-name",
            "outputs": {
                "type": {
                    "optional": "principal"
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
                        "name": "name",
                        "type": {
                            "string-ascii": {
                                "length": 256
                            }
                        }
                    }
                ]
            },
            "name": "contracts",
            "value": {
                "tuple": [
                    {
                        "name": "address",
                        "type": "principal"
                    },
                    {
                        "name": "qualified-name",
                        "type": "principal"
                    }
                ]
            }
        },
        {
            "key": {
                "tuple": [
                    {
                        "name": "qualified-name",
                        "type": "principal"
                    }
                ]
            },
            "name": "contracts-data",
            "value": {
                "tuple": [
                    {
                        "name": "can-burn",
                        "type": "bool"
                    },
                    {
                        "name": "can-mint",
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
            "name": "ERR-NOT-AUTHORIZED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "variable",
            "name": "dao-owner",
            "type": "principal"
        },
        {
            "access": "variable",
            "name": "emergency-shutdown-activated",
            "type": "bool"
        },
        {
            "access": "variable",
            "name": "guardian",
            "type": "principal"
        },
        {
            "access": "variable",
            "name": "payout-address",
            "type": "principal"
        }
    ]
};
