import { ClarityAbi } from "lib-shared";

export const InsurancePoolAdminInterface: ClarityAbi = {
    functions: [
        {
            access: "private",
            args: [],
            name: "current-pox-reward-cycle",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "stacker",
                    type: "principal",
                },
                {
                    name: "amount-ustx",
                    type: "uint128",
                },
                {
                    name: "until-burn-ht",
                    type: {
                        optional: "uint128",
                    },
                },
                {
                    name: "cycle",
                    type: "uint128",
                },
                {
                    name: "locking-period",
                    type: "uint128",
                },
            ],
            name: "delegatedly-stack",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: {
                            tuple: [
                                {
                                    name: "lock-amount",
                                    type: "uint128",
                                },
                                {
                                    name: "stacker",
                                    type: "principal",
                                },
                                {
                                    name: "unlock-burn-height",
                                    type: "uint128",
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "code",
                    type: "int128",
                },
            ],
            name: "err-pox-stack-aggregation-commit",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: "none",
                    },
                },
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "cycle-index",
                    type: "uint128",
                },
                {
                    name: "context",
                    type: {
                        tuple: [
                            {
                                name: "amount-ustx",
                                type: "uint128",
                            },
                            {
                                name: "cycle",
                                type: "uint128",
                            },
                            {
                                name: "locking-period",
                                type: "uint128",
                            },
                            {
                                name: "result",
                                type: "bool",
                            },
                            {
                                name: "stacked-ustx",
                                type: "uint128",
                            },
                            {
                                name: "stacker",
                                type: "principal",
                            },
                            {
                                name: "until-burn-ht",
                                type: {
                                    optional: "uint128",
                                },
                            },
                        ],
                    },
                },
            ],
            name: "insert-stacked-stxs",
            outputs: {
                type: {
                    tuple: [
                        {
                            name: "amount-ustx",
                            type: "uint128",
                        },
                        {
                            name: "cycle",
                            type: "uint128",
                        },
                        {
                            name: "locking-period",
                            type: "uint128",
                        },
                        {
                            name: "result",
                            type: "bool",
                        },
                        {
                            name: "stacked-ustx",
                            type: "uint128",
                        },
                        {
                            name: "stacker",
                            type: "principal",
                        },
                        {
                            name: "until-burn-ht",
                            type: {
                                optional: "uint128",
                            },
                        },
                    ],
                },
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "user",
                    type: "principal",
                },
                {
                    name: "ustx",
                    type: "uint128",
                },
                {
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "payout",
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
            access: "private",
            args: [
                {
                    name: "amount-ustx",
                    type: "uint128",
                },
                {
                    name: "until-burn-ht",
                    type: {
                        optional: "uint128",
                    },
                },
                {
                    name: "locking-period",
                    type: "uint128",
                },
            ],
            name: "pox-delegate-stx-and-stack",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: {
                            tuple: [
                                {
                                    name: "lock-amount",
                                    type: "uint128",
                                },
                                {
                                    name: "stacker",
                                    type: "principal",
                                },
                                {
                                    name: "unlock-burn-height",
                                    type: "uint128",
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "this-contract",
                    type: "principal",
                },
            ],
            name: "allow-contract-caller",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: "principal",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "claim-rewards",
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
                    name: "amount-ustx",
                    type: "uint128",
                },
                {
                    name: "stacker",
                    type: "principal",
                },
                {
                    name: "until-burn-ht",
                    type: {
                        optional: "uint128",
                    },
                },
                {
                    name: "pox-addr",
                    type: {
                        optional: {
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
                },
                {
                    name: "user-addr",
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
                    name: "locking-period",
                    type: "uint128",
                },
            ],
            name: "delegate-stx",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: {
                            tuple: [
                                {
                                    name: "lock-amount",
                                    type: "uint128",
                                },
                                {
                                    name: "stacker",
                                    type: "principal",
                                },
                                {
                                    name: "unlock-burn-height",
                                    type: "uint128",
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "ustx",
                    type: "uint128",
                },
                {
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "payin",
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
                    name: "reward-cycle",
                    type: "uint128",
                },
            ],
            name: "stack-aggregation-commit",
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
                    name: "block",
                    type: {
                        tuple: [
                            {
                                name: "height",
                                type: "uint128",
                            },
                            {
                                name: "merkle-root",
                                type: {
                                    buffer: {
                                        length: 32,
                                    },
                                },
                            },
                            {
                                name: "nbits",
                                type: {
                                    buffer: {
                                        length: 4,
                                    },
                                },
                            },
                            {
                                name: "nonce",
                                type: {
                                    buffer: {
                                        length: 4,
                                    },
                                },
                            },
                            {
                                name: "parent",
                                type: {
                                    buffer: {
                                        length: 32,
                                    },
                                },
                            },
                            {
                                name: "timestamp",
                                type: {
                                    buffer: {
                                        length: 4,
                                    },
                                },
                            },
                            {
                                name: "version",
                                type: {
                                    buffer: {
                                        length: 4,
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    name: "tx",
                    type: {
                        tuple: [
                            {
                                name: "ins",
                                type: {
                                    list: {
                                        length: 8,
                                        type: {
                                            tuple: [
                                                {
                                                    name: "outpoint",
                                                    type: {
                                                        tuple: [
                                                            {
                                                                name: "hash",
                                                                type: {
                                                                    buffer: {
                                                                        length: 32,
                                                                    },
                                                                },
                                                            },
                                                            {
                                                                name: "index",
                                                                type: {
                                                                    buffer: {
                                                                        length: 4,
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                    },
                                                },
                                                {
                                                    name: "scriptSig",
                                                    type: {
                                                        buffer: {
                                                            length: 256,
                                                        },
                                                    },
                                                },
                                                {
                                                    name: "sequence",
                                                    type: {
                                                        buffer: {
                                                            length: 4,
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                            {
                                name: "locktime",
                                type: {
                                    buffer: {
                                        length: 4,
                                    },
                                },
                            },
                            {
                                name: "outs",
                                type: {
                                    list: {
                                        length: 8,
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
                                                    type: {
                                                        buffer: {
                                                            length: 8,
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                            {
                                name: "version",
                                type: {
                                    buffer: {
                                        length: 4,
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    name: "proof",
                    type: {
                        tuple: [
                            {
                                name: "hashes",
                                type: {
                                    list: {
                                        length: 12,
                                        type: {
                                            buffer: {
                                                length: 32,
                                            },
                                        },
                                    },
                                },
                            },
                            {
                                name: "tree-depth",
                                type: "uint128",
                            },
                            {
                                name: "tx-index",
                                type: "uint128",
                            },
                        ],
                    },
                },
            ],
            name: "submit-reward-tx",
            outputs: {
                type: {
                    response: {
                        error: "uint128",
                        ok: {
                            tuple: [
                                {
                                    name: "out-value",
                                    type: "uint128",
                                },
                                {
                                    name: "price",
                                    type: "uint128",
                                },
                            ],
                        },
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
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "submit-unaudited-rewards",
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
                    name: "height",
                    type: "uint128",
                },
            ],
            name: "burn-height-to-reward-cycle",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "read_only",
            args: [],
            name: "get-next-cycle",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "get-reward-balance",
            outputs: {
                type: "int128",
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "user",
                    type: "principal",
                },
                {
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "get-rewards",
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
            access: "read_only",
            args: [
                {
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "get-unaudited-rewards",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "get-vault-balance",
            outputs: {
                type: "int128",
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "height",
                    type: "uint128",
                },
            ],
            name: "height-to-reward-cycle",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "cycle",
                    type: "uint128",
                },
            ],
            name: "reward-cycle-to-burn-height",
            outputs: {
                type: "uint128",
            },
        },
    ],
    fungible_tokens: [],
    maps: [
        {
            key: "uint128",
            name: "payins",
            value: "uint128",
        },
        {
            key: {
                tuple: [
                    {
                        name: "cycle",
                        type: "uint128",
                    },
                    {
                        name: "stacker",
                        type: "principal",
                    },
                ],
            },
            name: "stacked-stxs",
            value: {
                tuple: [
                    {
                        name: "amount-ustx",
                        type: "uint128",
                    },
                    {
                        name: "rewards",
                        type: {
                            optional: "uint128",
                        },
                    },
                    {
                        name: "stacked-ustx",
                        type: "uint128",
                    },
                    {
                        name: "until-burn-ht",
                        type: {
                            optional: "uint128",
                        },
                    },
                ],
            },
        },
        {
            key: "uint128",
            name: "total-stacked-stxs",
            value: "uint128",
        },
        {
            key: "uint128",
            name: "unaudited-rewards",
            value: "uint128",
        },
        {
            key: "uint128",
            name: "vaults",
            value: "int128",
        },
    ],
    non_fungible_tokens: [],
    variables: [
        {
            access: "constant",
            name: "cycles",
            type: {
                list: {
                    length: 12,
                    type: "uint128",
                },
            },
        },
        {
            access: "constant",
            name: "err-allow-contract-caller-failed",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-already-stacked",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-commit-not-allowed-now",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-delegate-below-minimum",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-delegate-invalid-stacker",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-invalid-cycle",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-map-function-failed",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-non-positive-amount",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-not-enough-funds",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-payout-failed",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-payout-no-rewards",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-payout-too-early",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "err-pool-not-active",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "pool-pox-address",
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
            access: "constant",
            name: "user-compensation",
            type: "uint128",
        },
        {
            access: "variable",
            name: "delegation-enabler",
            type: {
                optional: "principal",
            },
        },
        {
            access: "variable",
            name: "pool-account",
            type: {
                optional: "principal",
            },
        },
    ],
};
