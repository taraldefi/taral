import { ClarityAbi } from "lib-shared";

export const UsdaTokenInterface: ClarityAbi = {
    functions: [
        {
            access: "public",
            args: [
                {
                    name: "amount",
                    type: "uint128",
                },
                {
                    name: "sender",
                    type: "principal",
                },
            ],
            name: "burn-for-dao",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "amount",
                    type: "uint128",
                },
                {
                    name: "recipient",
                    type: "principal",
                },
            ],
            name: "mint-for-dao",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "value",
                    type: {
                        "string-utf8": {
                            length: 256,
                        },
                    },
                },
            ],
            name: "set-token-uri",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "amount",
                    type: "uint128",
                },
                {
                    name: "sender",
                    type: "principal",
                },
                {
                    name: "recipient",
                    type: "principal",
                },
                {
                    name: "memo",
                    type: {
                        optional: {
                            buffer: {
                                length: 34,
                            },
                        },
                    },
                },
            ],
            name: "transfer",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "account",
                    type: "principal",
                },
            ],
            name: "get-balance",
            outputs: {
                type: {
                    response: {
                        error: "none",
                        ok: "uint128",
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [],
            name: "get-decimals",
            outputs: {
                type: {
                    response: {
                        error: "none",
                        ok: "uint128",
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [],
            name: "get-name",
            outputs: {
                type: {
                    response: {
                        error: "none",
                        ok: {
                            "string-ascii": {
                                length: 4,
                            },
                        },
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [],
            name: "get-symbol",
            outputs: {
                type: {
                    response: {
                        error: "none",
                        ok: {
                            "string-ascii": {
                                length: 4,
                            },
                        },
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [],
            name: "get-token-uri",
            outputs: {
                type: {
                    response: {
                        error: "none",
                        ok: {
                            optional: {
                                "string-utf8": {
                                    length: 256,
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [],
            name: "get-total-supply",
            outputs: {
                type: {
                    response: {
                        error: "none",
                        ok: "uint128",
                    },
                },
            },
        },
    ],
    fungible_tokens: [
        {
            name: "usda",
        },
    ],
    maps: [],
    non_fungible_tokens: [],
    variables: [
        {
            access: "constant",
            name: "ERR-NOT-AUTHORIZED",
            type: "uint128",
        },
        {
            access: "variable",
            name: "token-uri",
            type: {
                "string-utf8": {
                    length: 256,
                },
            },
        },
    ],
};
