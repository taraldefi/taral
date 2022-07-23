import { ClarityAbi } from "lib-shared";

export const ArkadikoDikoGuardianV11Interface: ClarityAbi = {
    functions: [
        {
            access: "read_only",
            args: [],
            name: "get-staking-rewards-per-block",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "read_only",
            args: [],
            name: "get-vault-rewards-per-block",
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
            name: "ERR-NOT-AUTHORIZED",
            type: {
                response: {
                    error: "uint128",
                    ok: "none",
                },
            },
        },
        {
            access: "constant",
            name: "MIN-STAKING-BLOCK-REWARDS",
            type: "uint128",
        },
        {
            access: "constant",
            name: "REWARDS-PER-BLOCK-START",
            type: "uint128",
        },
        {
            access: "constant",
            name: "STAKING-REWARDS-FIRST-YEAR",
            type: "uint128",
        },
        {
            access: "variable",
            name: "contract-start-block",
            type: "uint128",
        },
    ],
};
