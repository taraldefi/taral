
import { ClarityAbi } from 'taral-shared';

export const ArkadikoDikoInitInterface: ClarityAbi = {
    "functions": [
        {
            "access": "public",
            "args": [
                {
                    "name": "amount",
                    "type": "uint128"
                }
            ],
            "name": "foundation-claim-tokens",
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
                    "name": "amount",
                    "type": "uint128"
                }
            ],
            "name": "founders-claim-tokens",
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
            "name": "set-foundation-wallet",
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
            "name": "set-founders-wallet",
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
            "name": "get-claimed-foundation-tokens",
            "outputs": {
                "type": "uint128"
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-claimed-founders-tokens",
            "outputs": {
                "type": "uint128"
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-pending-foundation-tokens",
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
            "name": "get-pending-founders-tokens",
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
    "maps": [],
    "non_fungible_tokens": [],
    "variables": [
        {
            "access": "constant",
            "name": "BLOCKS-PER-MONTH",
            "type": "uint128"
        },
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
            "access": "constant",
            "name": "ERR-TOO-MANY-TOKENS-CLAIMED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "FOUNDERS-TOKENS-PER-MONTH",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "TOTAL-FOUNDATION",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "TOTAL-FOUNDERS",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "contract-start-block",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "foundation-tokens-claimed",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "foundation-wallet",
            "type": "principal"
        },
        {
            "access": "variable",
            "name": "founders-tokens-claimed",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "founders-wallet",
            "type": "principal"
        }
    ]
};
