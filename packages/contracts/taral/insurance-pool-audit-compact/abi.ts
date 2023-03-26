import { ClarityAbi } from "lib-shared";

export const InsurancePoolAuditCompactInterface: ClarityAbi = {
    functions: [
        {
            access: "private",
            args: [
                {
                    name: "entry",
                    type: {
                        tuple: [
                            {
                                name: "scriptPubKey",
                                type: {
                                    buffer: {
                                        length: 128,
                                    },
                                },
                            },
                            {
                                name: "value",
                                type: "uint128",
                            },
                        ],
                    },
                },
                {
                    name: "result",
                    type: {
                        optional: {
                            tuple: [
                                {
                                    name: "scriptPubKey",
                                    type: {
                                        buffer: {
                                            length: 128,
                                        },
                                    },
                                },
                                {
                                    name: "value",
                                    type: "uint128",
                                },
                            ],
                        },
                    },
                },
            ],
            name: "find-pool-out-compact",
            outputs: {
                type: {
                    optional: {
                        tuple: [
                            {
                                name: "scriptPubKey",
                                type: {
                                    buffer: {
                                        length: 128,
                                    },
                                },
                            },
                            {
                                name: "value",
                                type: "uint128",
                            },
                        ],
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "tx",
                    type: {
                        buffer: {
                            length: 1024,
                        },
                    },
                },
            ],
            name: "get-tx-value-for-pool-compact",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: {
                            optional: {
                                tuple: [
                                    {
                                        name: "scriptPubKey",
                                        type: {
                                            buffer: {
                                                length: 128,
                                            },
                                        },
                                    },
                                    {
                                        name: "value",
                                        type: "uint128",
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    ],
    fungible_tokens: [],
    maps: [],
    non_fungible_tokens: [],
    variables: [
        {
            access: "constant",
            name: "ERR_FAILED_TO_PARSE_TX",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "pool-pubscriptkey",
            type: {
                buffer: {
                    length: 25,
                },
            },
        },
        {
            access: "constant",
            name: "pool-reward-addr-hash",
            type: {
                buffer: {
                    length: 20,
                },
            },
        },
    ],
};
