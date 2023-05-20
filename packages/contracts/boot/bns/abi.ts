import { ClarityAbi } from "lib-shared";

export const BnsInterface: ClarityAbi = {
    functions: [
        {
            access: "private",
            args: [
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "price-function",
                    type: {
                        tuple: [
                            {
                                name: "base",
                                type: "uint128",
                            },
                            {
                                name: "buckets",
                                type: {
                                    list: {
                                        length: 16,
                                        type: "uint128",
                                    },
                                },
                            },
                            {
                                name: "coeff",
                                type: "uint128",
                            },
                            {
                                name: "no-vowel-discount",
                                type: "uint128",
                            },
                            {
                                name: "nonalpha-discount",
                                type: "uint128",
                            },
                        ],
                    },
                },
            ],
            name: "compute-name-price",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "buckets",
                    type: {
                        list: {
                            length: 16,
                            type: "uint128",
                        },
                    },
                },
                {
                    name: "index",
                    type: "uint128",
                },
            ],
            name: "get-exp-at-index",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "has-invalid-chars",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "has-nonalpha-chars",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "has-vowels-chars",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "char",
                    type: {
                        buffer: {
                            length: 1,
                        },
                    },
                },
            ],
            name: "is-char-valid",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "char",
                    type: {
                        buffer: {
                            length: 1,
                        },
                    },
                },
            ],
            name: "is-digit",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "char",
                    type: {
                        buffer: {
                            length: 1,
                        },
                    },
                },
            ],
            name: "is-lowercase-alpha",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "is-namespace-available",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "char",
                    type: {
                        buffer: {
                            length: 1,
                        },
                    },
                },
            ],
            name: "is-nonalpha",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "char",
                    type: {
                        buffer: {
                            length: 1,
                        },
                    },
                },
            ],
            name: "is-special-char",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "char",
                    type: {
                        buffer: {
                            length: 1,
                        },
                    },
                },
            ],
            name: "is-vowel",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "a",
                    type: "uint128",
                },
                {
                    name: "b",
                    type: "uint128",
                },
            ],
            name: "max",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "a",
                    type: "uint128",
                },
                {
                    name: "b",
                    type: "uint128",
                },
            ],
            name: "min",
            outputs: {
                type: "uint128",
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "beneficiary",
                    type: "principal",
                },
            ],
            name: "mint-or-transfer-name?",
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
            access: "private",
            args: [
                {
                    name: "namespace-launched-at",
                    type: {
                        optional: "uint128",
                    },
                },
                {
                    name: "namespace-revealed-at",
                    type: "uint128",
                },
                {
                    name: "name-props",
                    type: {
                        tuple: [
                            {
                                name: "imported-at",
                                type: {
                                    optional: "uint128",
                                },
                            },
                            {
                                name: "registered-at",
                                type: {
                                    optional: "uint128",
                                },
                            },
                            {
                                name: "revoked-at",
                                type: {
                                    optional: "uint128",
                                },
                            },
                            {
                                name: "zonefile-hash",
                                type: {
                                    buffer: {
                                        length: 20,
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
            name: "name-lease-started-at?",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "uint128",
                    },
                },
            },
        },
        {
            access: "private",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "from",
                    type: "principal",
                },
                {
                    name: "to",
                    type: "principal",
                },
            ],
            name: "update-name-ownership?",
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
            access: "private",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "registered-at",
                    type: {
                        optional: "uint128",
                    },
                },
                {
                    name: "imported-at",
                    type: {
                        optional: "uint128",
                    },
                },
                {
                    name: "revoked-at",
                    type: {
                        optional: "uint128",
                    },
                },
                {
                    name: "zonefile-hash",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "op",
                    type: {
                        "string-ascii": {
                            length: 16,
                        },
                    },
                },
            ],
            name: "update-zonefile-and-props",
            outputs: {
                type: "bool",
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "beneficiary",
                    type: "principal",
                },
                {
                    name: "zonefile-hash",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "name-import",
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
                    name: "hashed-salted-fqn",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "stx-to-burn",
                    type: "uint128",
                },
            ],
            name: "name-preorder",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "uint128",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "salt",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "zonefile-hash",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "name-register",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "stx-to-burn",
                    type: "uint128",
                },
                {
                    name: "new-owner",
                    type: {
                        optional: "principal",
                    },
                },
                {
                    name: "zonefile-hash",
                    type: {
                        optional: {
                            buffer: {
                                length: 20,
                            },
                        },
                    },
                },
            ],
            name: "name-renewal",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "name-revoke",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "new-owner",
                    type: "principal",
                },
                {
                    name: "zonefile-hash",
                    type: {
                        optional: {
                            buffer: {
                                length: 20,
                            },
                        },
                    },
                },
            ],
            name: "name-transfer",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
                {
                    name: "zonefile-hash",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "name-update",
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
                    name: "hashed-salted-namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "stx-to-burn",
                    type: "uint128",
                },
            ],
            name: "namespace-preorder",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "uint128",
                    },
                },
            },
        },
        {
            access: "public",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "namespace-ready",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "namespace-salt",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "p-func-base",
                    type: "uint128",
                },
                {
                    name: "p-func-coeff",
                    type: "uint128",
                },
                {
                    name: "p-func-b1",
                    type: "uint128",
                },
                {
                    name: "p-func-b2",
                    type: "uint128",
                },
                {
                    name: "p-func-b3",
                    type: "uint128",
                },
                {
                    name: "p-func-b4",
                    type: "uint128",
                },
                {
                    name: "p-func-b5",
                    type: "uint128",
                },
                {
                    name: "p-func-b6",
                    type: "uint128",
                },
                {
                    name: "p-func-b7",
                    type: "uint128",
                },
                {
                    name: "p-func-b8",
                    type: "uint128",
                },
                {
                    name: "p-func-b9",
                    type: "uint128",
                },
                {
                    name: "p-func-b10",
                    type: "uint128",
                },
                {
                    name: "p-func-b11",
                    type: "uint128",
                },
                {
                    name: "p-func-b12",
                    type: "uint128",
                },
                {
                    name: "p-func-b13",
                    type: "uint128",
                },
                {
                    name: "p-func-b14",
                    type: "uint128",
                },
                {
                    name: "p-func-b15",
                    type: "uint128",
                },
                {
                    name: "p-func-b16",
                    type: "uint128",
                },
                {
                    name: "p-func-non-alpha-discount",
                    type: "uint128",
                },
                {
                    name: "p-func-no-vowel-discount",
                    type: "uint128",
                },
                {
                    name: "lifetime",
                    type: "uint128",
                },
                {
                    name: "namespace-import",
                    type: "principal",
                },
            ],
            name: "namespace-reveal",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "namespace-revoke-function-price-edition",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "p-func-base",
                    type: "uint128",
                },
                {
                    name: "p-func-coeff",
                    type: "uint128",
                },
                {
                    name: "p-func-b1",
                    type: "uint128",
                },
                {
                    name: "p-func-b2",
                    type: "uint128",
                },
                {
                    name: "p-func-b3",
                    type: "uint128",
                },
                {
                    name: "p-func-b4",
                    type: "uint128",
                },
                {
                    name: "p-func-b5",
                    type: "uint128",
                },
                {
                    name: "p-func-b6",
                    type: "uint128",
                },
                {
                    name: "p-func-b7",
                    type: "uint128",
                },
                {
                    name: "p-func-b8",
                    type: "uint128",
                },
                {
                    name: "p-func-b9",
                    type: "uint128",
                },
                {
                    name: "p-func-b10",
                    type: "uint128",
                },
                {
                    name: "p-func-b11",
                    type: "uint128",
                },
                {
                    name: "p-func-b12",
                    type: "uint128",
                },
                {
                    name: "p-func-b13",
                    type: "uint128",
                },
                {
                    name: "p-func-b14",
                    type: "uint128",
                },
                {
                    name: "p-func-b15",
                    type: "uint128",
                },
                {
                    name: "p-func-b16",
                    type: "uint128",
                },
                {
                    name: "p-func-non-alpha-discount",
                    type: "uint128",
                },
                {
                    name: "p-func-no-vowel-discount",
                    type: "uint128",
                },
            ],
            name: "namespace-update-function-price",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "can-name-be-registered",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "can-namespace-be-registered",
            outputs: {
                type: {
                    response: {
                        error: "none",
                        ok: "bool",
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "owner",
                    type: "principal",
                },
            ],
            name: "can-receive-name",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "check-name-ops-preconditions",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: {
                            tuple: [
                                {
                                    name: "name-props",
                                    type: {
                                        tuple: [
                                            {
                                                name: "imported-at",
                                                type: {
                                                    optional: "uint128",
                                                },
                                            },
                                            {
                                                name: "registered-at",
                                                type: {
                                                    optional: "uint128",
                                                },
                                            },
                                            {
                                                name: "revoked-at",
                                                type: {
                                                    optional: "uint128",
                                                },
                                            },
                                            {
                                                name: "zonefile-hash",
                                                type: {
                                                    buffer: {
                                                        length: 20,
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    name: "namespace-props",
                                    type: {
                                        tuple: [
                                            {
                                                name: "can-update-price-function",
                                                type: "bool",
                                            },
                                            {
                                                name: "launched-at",
                                                type: {
                                                    optional: "uint128",
                                                },
                                            },
                                            {
                                                name: "lifetime",
                                                type: "uint128",
                                            },
                                            {
                                                name: "namespace-import",
                                                type: "principal",
                                            },
                                            {
                                                name: "price-function",
                                                type: {
                                                    tuple: [
                                                        {
                                                            name: "base",
                                                            type: "uint128",
                                                        },
                                                        {
                                                            name: "buckets",
                                                            type: {
                                                                list: {
                                                                    length: 16,
                                                                    type: "uint128",
                                                                },
                                                            },
                                                        },
                                                        {
                                                            name: "coeff",
                                                            type: "uint128",
                                                        },
                                                        {
                                                            name: "no-vowel-discount",
                                                            type: "uint128",
                                                        },
                                                        {
                                                            name: "nonalpha-discount",
                                                            type: "uint128",
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                name: "revealed-at",
                                                type: "uint128",
                                            },
                                        ],
                                    },
                                },
                                {
                                    name: "owner",
                                    type: "principal",
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "get-name-price",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "uint128",
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "get-namespace-price",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: "uint128",
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
            ],
            name: "get-namespace-properties",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: {
                            tuple: [
                                {
                                    name: "namespace",
                                    type: {
                                        buffer: {
                                            length: 20,
                                        },
                                    },
                                },
                                {
                                    name: "properties",
                                    type: {
                                        tuple: [
                                            {
                                                name: "can-update-price-function",
                                                type: "bool",
                                            },
                                            {
                                                name: "launched-at",
                                                type: {
                                                    optional: "uint128",
                                                },
                                            },
                                            {
                                                name: "lifetime",
                                                type: "uint128",
                                            },
                                            {
                                                name: "namespace-import",
                                                type: "principal",
                                            },
                                            {
                                                name: "price-function",
                                                type: {
                                                    tuple: [
                                                        {
                                                            name: "base",
                                                            type: "uint128",
                                                        },
                                                        {
                                                            name: "buckets",
                                                            type: {
                                                                list: {
                                                                    length: 16,
                                                                    type: "uint128",
                                                                },
                                                            },
                                                        },
                                                        {
                                                            name: "coeff",
                                                            type: "uint128",
                                                        },
                                                        {
                                                            name: "no-vowel-discount",
                                                            type: "uint128",
                                                        },
                                                        {
                                                            name: "nonalpha-discount",
                                                            type: "uint128",
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                name: "revealed-at",
                                                type: "uint128",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "is-name-in-grace-period",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "is-name-lease-expired",
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
                    name: "namespace",
                    type: {
                        buffer: {
                            length: 20,
                        },
                    },
                },
                {
                    name: "name",
                    type: {
                        buffer: {
                            length: 48,
                        },
                    },
                },
            ],
            name: "name-resolve",
            outputs: {
                type: {
                    response: {
                        error: "int128",
                        ok: {
                            tuple: [
                                {
                                    name: "lease-ending-at",
                                    type: {
                                        optional: "uint128",
                                    },
                                },
                                {
                                    name: "lease-started-at",
                                    type: "uint128",
                                },
                                {
                                    name: "owner",
                                    type: "principal",
                                },
                                {
                                    name: "zonefile-hash",
                                    type: {
                                        buffer: {
                                            length: 20,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            access: "read_only",
            args: [
                {
                    name: "owner",
                    type: "principal",
                },
            ],
            name: "resolve-principal",
            outputs: {
                type: {
                    response: {
                        error: {
                            tuple: [
                                {
                                    name: "code",
                                    type: "int128",
                                },
                                {
                                    name: "name",
                                    type: {
                                        optional: {
                                            tuple: [
                                                {
                                                    name: "name",
                                                    type: {
                                                        buffer: {
                                                            length: 48,
                                                        },
                                                    },
                                                },
                                                {
                                                    name: "namespace",
                                                    type: {
                                                        buffer: {
                                                            length: 20,
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                        ok: {
                            tuple: [
                                {
                                    name: "name",
                                    type: {
                                        buffer: {
                                            length: 48,
                                        },
                                    },
                                },
                                {
                                    name: "namespace",
                                    type: {
                                        buffer: {
                                            length: 20,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
    ],
    fungible_tokens: [],
    maps: [
        {
            key: {
                tuple: [
                    {
                        name: "buyer",
                        type: "principal",
                    },
                    {
                        name: "hashed-salted-fqn",
                        type: {
                            buffer: {
                                length: 20,
                            },
                        },
                    },
                ],
            },
            name: "name-preorders",
            value: {
                tuple: [
                    {
                        name: "claimed",
                        type: "bool",
                    },
                    {
                        name: "created-at",
                        type: "uint128",
                    },
                    {
                        name: "stx-burned",
                        type: "uint128",
                    },
                ],
            },
        },
        {
            key: {
                tuple: [
                    {
                        name: "name",
                        type: {
                            buffer: {
                                length: 48,
                            },
                        },
                    },
                    {
                        name: "namespace",
                        type: {
                            buffer: {
                                length: 20,
                            },
                        },
                    },
                ],
            },
            name: "name-properties",
            value: {
                tuple: [
                    {
                        name: "imported-at",
                        type: {
                            optional: "uint128",
                        },
                    },
                    {
                        name: "registered-at",
                        type: {
                            optional: "uint128",
                        },
                    },
                    {
                        name: "revoked-at",
                        type: {
                            optional: "uint128",
                        },
                    },
                    {
                        name: "zonefile-hash",
                        type: {
                            buffer: {
                                length: 20,
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
                        name: "buyer",
                        type: "principal",
                    },
                    {
                        name: "hashed-salted-namespace",
                        type: {
                            buffer: {
                                length: 20,
                            },
                        },
                    },
                ],
            },
            name: "namespace-preorders",
            value: {
                tuple: [
                    {
                        name: "claimed",
                        type: "bool",
                    },
                    {
                        name: "created-at",
                        type: "uint128",
                    },
                    {
                        name: "stx-burned",
                        type: "uint128",
                    },
                ],
            },
        },
        {
            key: {
                buffer: {
                    length: 20,
                },
            },
            name: "namespaces",
            value: {
                tuple: [
                    {
                        name: "can-update-price-function",
                        type: "bool",
                    },
                    {
                        name: "launched-at",
                        type: {
                            optional: "uint128",
                        },
                    },
                    {
                        name: "lifetime",
                        type: "uint128",
                    },
                    {
                        name: "namespace-import",
                        type: "principal",
                    },
                    {
                        name: "price-function",
                        type: {
                            tuple: [
                                {
                                    name: "base",
                                    type: "uint128",
                                },
                                {
                                    name: "buckets",
                                    type: {
                                        list: {
                                            length: 16,
                                            type: "uint128",
                                        },
                                    },
                                },
                                {
                                    name: "coeff",
                                    type: "uint128",
                                },
                                {
                                    name: "no-vowel-discount",
                                    type: "uint128",
                                },
                                {
                                    name: "nonalpha-discount",
                                    type: "uint128",
                                },
                            ],
                        },
                    },
                    {
                        name: "revealed-at",
                        type: "uint128",
                    },
                ],
            },
        },
        {
            key: "principal",
            name: "owner-name",
            value: {
                tuple: [
                    {
                        name: "name",
                        type: {
                            buffer: {
                                length: 48,
                            },
                        },
                    },
                    {
                        name: "namespace",
                        type: {
                            buffer: {
                                length: 20,
                            },
                        },
                    },
                ],
            },
        },
    ],
    non_fungible_tokens: [
        {
            name: "names",
            type: {
                tuple: [
                    {
                        name: "name",
                        type: {
                            buffer: {
                                length: 48,
                            },
                        },
                    },
                    {
                        name: "namespace",
                        type: {
                            buffer: {
                                length: 20,
                            },
                        },
                    },
                ],
            },
        },
    ],
    variables: [
        {
            access: "constant",
            name: "ERR_INSUFFICIENT_FUNDS",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_ALREADY_EXISTS",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_ALREADY_LAUNCHED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_BLANK",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_CHARSET_INVALID",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_HASH_MALFORMED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_NOT_FOUND",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_NOT_LAUNCHED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_OPERATION_UNAUTHORIZED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_PREORDER_ALREADY_EXISTS",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_PREORDER_CLAIMABILITY_EXPIRED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_PREORDER_EXPIRED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_PREORDER_LAUNCHABILITY_EXPIRED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_PREORDER_NOT_FOUND",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_PRICE_FUNCTION_INVALID",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_STX_BURNT_INSUFFICIENT",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAMESPACE_UNAVAILABLE",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_ALREADY_CLAIMED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_BLANK",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_CHARSET_INVALID",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_CLAIMABILITY_EXPIRED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_COULD_NOT_BE_MINTED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_COULD_NOT_BE_TRANSFERED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_EXPIRED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_GRACE_PERIOD",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_HASH_MALFORMED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_NOT_FOUND",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_NOT_RESOLVABLE",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_OPERATION_UNAUTHORIZED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_PREORDERED_BEFORE_NAMESPACE_LAUNCH",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_PREORDER_ALREADY_EXISTS",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_PREORDER_EXPIRED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_PREORDER_FUNDS_INSUFFICIENT",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_PREORDER_NOT_FOUND",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_REVOKED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_STX_BURNT_INSUFFICIENT",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_TRANSFER_FAILED",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_NAME_UNAVAILABLE",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_PANIC",
            type: "int128",
        },
        {
            access: "constant",
            name: "ERR_PRINCIPAL_ALREADY_ASSOCIATED",
            type: "int128",
        },
        {
            access: "constant",
            name: "NAMESPACE_LAUNCHABILITY_TTL",
            type: "uint128",
        },
        {
            access: "constant",
            name: "NAMESPACE_PREORDER_CLAIMABILITY_TTL",
            type: "uint128",
        },
        {
            access: "constant",
            name: "NAMESPACE_PRICE_TIERS",
            type: {
                list: {
                    length: 20,
                    type: "uint128",
                },
            },
        },
        {
            access: "constant",
            name: "NAME_GRACE_PERIOD_DURATION",
            type: "uint128",
        },
        {
            access: "constant",
            name: "NAME_PREORDER_CLAIMABILITY_TTL",
            type: "uint128",
        },
        {
            access: "variable",
            name: "attachment-index",
            type: "uint128",
        },
    ],
};
