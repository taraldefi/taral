import { ClarityAbi } from "lib-shared";

export const ArkadikoStackerV11Interface: ClarityAbi = {
    functions: [
        {
            access: "public",
            args: [
                {
                    name: "vault-id",
                    type: "uint128",
                },
            ],
            name: "enable-vault-withdrawals",
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
                    name: "pox-addr",
                    type: {
                        tuple: [
                            {
                                name: "hashbytes",
                                type: {
                                    buffer: {
                                        length: 20,
                                    },
                                },
                            },
                            {
                                name: "version",
                                type: {
                                    buffer: {
                                        length: 1,
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    name: "start-burn-ht",
                    type: "uint128",
                },
                {
                    name: "lock-period",
                    type: "uint128",
                },
            ],
            name: "initiate-stacking",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: "uint128",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "ustx-amount",
                    type: "uint128",
                },
            ],
            name: "request-stx-for-payout",
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
                    name: "ustx-amount",
                    type: "uint128",
                },
            ],
            name: "return-stx",
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
            args: [],
            name: "toggle-stacker-shutdown",
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
            args: [],
            name: "get-stacking-stx-stacked",
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
            name: "get-stacking-unlock-burn-height",
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
            name: "get-stx-balance",
            outputs: {
                type: "uint128",
            },
        },
    ],
    fungible_tokens: [],
    maps: [],
    non_fungible_tokens: [],
    variables: [
        {
            access: "constant",
            name: "ERR-ALREADY-STACKING",
            type: "uint128",
        },
        {
            access: "constant",
            name: "ERR-BURN-HEIGHT-NOT-REACHED",
            type: "uint128",
        },
        {
            access: "constant",
            name: "ERR-EMERGENCY-SHUTDOWN-ACTIVATED",
            type: "uint128",
        },
        {
            access: "constant",
            name: "ERR-NOT-AUTHORIZED",
            type: "uint128",
        },
        {
            access: "constant",
            name: "ERR-STILL-STACKING",
            type: "uint128",
        },
        {
            access: "constant",
            name: "ERR-VAULT-LIQUIDATED",
            type: "uint128",
        },
        {
            access: "constant",
            name: "ERR-WRONG-COLLATERAL-TOKEN",
            type: "uint128",
        },
        {
            access: "constant",
            name: "ERR-WRONG-STACKER",
            type: "uint128",
        },
        {
            access: "variable",
            name: "stacker-name",
            type: {
                "string-ascii": {
                    length: 256,
                },
            },
        },
        {
            access: "variable",
            name: "stacker-shutdown-activated",
            type: "bool",
        },
        {
            access: "variable",
            name: "stacking-stx-stacked",
            type: "uint128",
        },
        {
            access: "variable",
            name: "stacking-unlock-burn-height",
            type: "uint128",
        },
    ],
};
