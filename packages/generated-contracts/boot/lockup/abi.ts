
import { ClarityAbi } from 'taral-shared';

export const LockupInterface: ClarityAbi = {
    "functions": [
        {
            "access": "read_only",
            "args": [
                {
                    "name": "stx-block-height-opt",
                    "type": {
                        "optional": "uint128"
                    }
                }
            ],
            "name": "get-lockups",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": {
                            "list": {
                                "length": 4430,
                                "type": {
                                    "tuple": [
                                        {
                                            "name": "amount",
                                            "type": "uint128"
                                        },
                                        {
                                            "name": "recipient",
                                            "type": "principal"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    ],
    "fungible_tokens": [],
    "maps": [
        {
            "key": "uint128",
            "name": "lockups",
            "value": {
                "list": {
                    "length": 4430,
                    "type": {
                        "tuple": [
                            {
                                "name": "amount",
                                "type": "uint128"
                            },
                            {
                                "name": "recipient",
                                "type": "principal"
                            }
                        ]
                    }
                }
            }
        }
    ],
    "non_fungible_tokens": [],
    "variables": []
};
