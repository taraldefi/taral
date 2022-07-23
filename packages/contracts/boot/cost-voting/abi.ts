import { ClarityAbi } from "lib-shared";

export const CostVotingInterface: ClarityAbi = {
    functions: [
        {
            access: "public",
            args: [
                {
                    name: "proposal-id",
                    type: "uint128",
                },
            ],
            name: "confirm-miners",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "proposal-id",
                    type: "uint128",
                },
            ],
            name: "confirm-votes",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "function-contract",
                    type: "principal",
                },
                {
                    name: "function-name",
                    type: {
                        "string-ascii": {
                            length: 128,
                        },
                    },
                },
                {
                    name: "cost-function-contract",
                    type: "principal",
                },
                {
                    name: "cost-function-name",
                    type: {
                        "string-ascii": {
                            length: 128,
                        },
                    },
                },
            ],
            name: "submit-proposal",
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
            access: "public",
            args: [
                {
                    name: "proposal-id",
                    type: "uint128",
                },
            ],
            name: "veto",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "proposal-id",
                    type: "uint128",
                },
                {
                    name: "amount",
                    type: "uint128",
                },
            ],
            name: "vote-proposal",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "proposal-id",
                    type: "uint128",
                },
                {
                    name: "amount",
                    type: "uint128",
                },
            ],
            name: "withdraw-votes",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "confirmed-id",
                    type: "uint128",
                },
            ],
            name: "get-confirmed-proposal",
            outputs: {
                type: {
                    optional: {
                        tuple: [
                            {
                                name: "confirmed-height",
                                type: "uint128",
                            },
                            {
                                name: "cost-function-contract",
                                type: "principal",
                            },
                            {
                                name: "cost-function-name",
                                type: {
                                    "string-ascii": {
                                        length: 128,
                                    },
                                },
                            },
                            {
                                name: "function-contract",
                                type: "principal",
                            },
                            {
                                name: "function-name",
                                type: {
                                    "string-ascii": {
                                        length: 128,
                                    },
                                },
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
                    name: "address",
                    type: "principal",
                },
                {
                    name: "proposal-id",
                    type: "uint128",
                },
            ],
            name: "get-principal-votes",
            outputs: {
                type: {
                    optional: "uint128",
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "proposal-id",
                    type: "uint128",
                },
            ],
            name: "get-proposal",
            outputs: {
                type: {
                    optional: {
                        tuple: [
                            {
                                name: "cost-function-contract",
                                type: "principal",
                            },
                            {
                                name: "cost-function-name",
                                type: {
                                    "string-ascii": {
                                        length: 128,
                                    },
                                },
                            },
                            {
                                name: "expiration-block-height",
                                type: "uint128",
                            },
                            {
                                name: "function-contract",
                                type: "principal",
                            },
                            {
                                name: "function-name",
                                type: {
                                    "string-ascii": {
                                        length: 128,
                                    },
                                },
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
                    name: "proposal-id",
                    type: "uint128",
                },
            ],
            name: "get-proposal-vetos",
            outputs: {
                type: {
                    optional: "uint128",
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "proposal-id",
                    type: "uint128",
                },
            ],
            name: "get-proposal-votes",
            outputs: {
                type: {
                    optional: "uint128",
                },
            },
        },
    ],
    fungible_tokens: [
        {
            name: "cost-vote-token",
        },
    ],
    maps: [
        {
            key: "uint128",
            name: "confirmed-count-at-block",
            value: "uint128",
        },
        {
            key: {
                tuple: [
                    {
                        name: "confirmed-id",
                        type: "uint128",
                    },
                ],
            },
            name: "confirmed-proposals",
            value: {
                tuple: [
                    {
                        name: "confirmed-height",
                        type: "uint128",
                    },
                    {
                        name: "cost-function-contract",
                        type: "principal",
                    },
                    {
                        name: "cost-function-name",
                        type: {
                            "string-ascii": {
                                length: 128,
                            },
                        },
                    },
                    {
                        name: "function-contract",
                        type: "principal",
                    },
                    {
                        name: "function-name",
                        type: {
                            "string-ascii": {
                                length: 128,
                            },
                        },
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "proposal-id",
                        type: "uint128",
                    },
                    {
                        name: "veto-height",
                        type: "uint128",
                    },
                ],
            },
            name: "exercised-veto",
            value: {
                tuple: [
                    {
                        name: "vetoed",
                        type: "bool",
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "function-contract",
                        type: "principal",
                    },
                    {
                        name: "function-name",
                        type: {
                            "string-ascii": {
                                length: 128,
                            },
                        },
                    },
                ],
            },
            name: "functions-to-confirmed-ids",
            value: {
                tuple: [
                    {
                        name: "proposal-id",
                        type: "uint128",
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "address",
                        type: "principal",
                    },
                    {
                        name: "proposal-id",
                        type: "uint128",
                    },
                ],
            },
            name: "principal-proposal-votes",
            value: {
                tuple: [
                    {
                        name: "votes",
                        type: "uint128",
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "proposal-id",
                        type: "uint128",
                    },
                ],
            },
            name: "proposal-confirmed-id",
            value: {
                tuple: [
                    {
                        name: "confirmed-id",
                        type: "uint128",
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "proposal-id",
                        type: "uint128",
                    },
                ],
            },
            name: "proposal-vetos",
            value: {
                tuple: [
                    {
                        name: "vetos",
                        type: "uint128",
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "proposal-id",
                        type: "uint128",
                    },
                ],
            },
            name: "proposal-votes",
            value: {
                tuple: [
                    {
                        name: "votes",
                        type: "uint128",
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "proposal-id",
                        type: "uint128",
                    },
                ],
            },
            name: "proposals",
            value: {
                tuple: [
                    {
                        name: "cost-function-contract",
                        type: "principal",
                    },
                    {
                        name: "cost-function-name",
                        type: {
                            "string-ascii": {
                                length: 128,
                            },
                        },
                    },
                    {
                        name: "expiration-block-height",
                        type: "uint128",
                    },
                    {
                        name: "function-contract",
                        type: "principal",
                    },
                    {
                        name: "function-name",
                        type: {
                            "string-ascii": {
                                length: 128,
                            },
                        },
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "proposal-id",
                        type: "uint128",
                    },
                ],
            },
            name: "vote-confirmed-proposals",
            value: {
                tuple: [
                    {
                        name: "expiration-block-height",
                        type: "uint128",
                    },
                ],
            },
        },
    ],
    non_fungible_tokens: [],
    variables: [
        {
            access: "constant",
            name: "ERR_ALREADY_VETOED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_AMOUNT_NOT_POSITIVE",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_FETCHING_BLOCK_INFO",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_FT_TRANSFER",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_INSUFFICIENT_FUNDS",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_INSUFFICIENT_VOTES",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NOT_LAST_MINER",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NO_SUCH_PROPOSAL",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_PROPOSAL_CONFIRMED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_PROPOSAL_EXPIRED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_PROPOSAL_VETOED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_STX_TRANSFER",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_TOO_MANY_CONFIRMED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_UNREACHABLE",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_VETO_PERIOD_NOT_OVER",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_VETO_PERIOD_OVER",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_VOTE_ENDED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_VOTE_NOT_CONFIRMED",
            type: "int128",
        },
        {
            access: "constant",
            name: "MAX_CONFIRMED_PER_BLOCK",
            type: "uint128",
        },
        {
            access: "constant",
            name: "REQUIRED_PERCENT_STX_VOTE",
            type: "uint128",
        },
        {
            access: "constant",
            name: "REQUIRED_VETOES",
            type: "uint128",
        },
        {
            access: "constant",
            name: "VETO_LENGTH",
            type: "uint128",
        },
        {
            access: "constant",
            name: "VOTE_LENGTH",
            type: "uint128",
        },
        {
            access: "variable",
            name: "confirmed-proposal-count",
            type: "uint128",
        },
        {
            access: "variable",
            name: "proposal-count",
            type: "uint128",
        },
    ],
};
