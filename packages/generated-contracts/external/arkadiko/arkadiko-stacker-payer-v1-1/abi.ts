import { ClarityAbi } from "lib-shared";

export const ArkadikoStackerPayerV11Interface: ClarityAbi = {
  functions: [
    {
      access: "private",
      args: [
        {
          name: "vault-id",
          type: "uint128",
        },
        {
          name: "earned-stx-amount",
          type: "uint128",
        },
        {
          name: "wstx",
          type: "trait_reference",
        },
        {
          name: "usda",
          type: "trait_reference",
        },
        {
          name: "coll-type",
          type: "trait_reference",
        },
        {
          name: "reserve",
          type: "trait_reference",
        },
        {
          name: "ft",
          type: "trait_reference",
        },
      ],
      name: "payoff-vault-debt",
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
          name: "vault-id",
          type: "uint128",
        },
      ],
      name: "payout-liquidated-vault",
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
          name: "lot-index",
          type: "uint128",
        },
      ],
      name: "payout-lot-bidder",
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
          name: "vault-id",
          type: "uint128",
        },
        {
          name: "wstx",
          type: "trait_reference",
        },
        {
          name: "usda",
          type: "trait_reference",
        },
        {
          name: "coll-type",
          type: "trait_reference",
        },
        {
          name: "reserve",
          type: "trait_reference",
        },
        {
          name: "ft",
          type: "trait_reference",
        },
      ],
      name: "payout-vault",
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
          name: "ustx-amount",
          type: "uint128",
        },
      ],
      name: "request-stx-for-withdrawal",
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
          name: "vault-id",
          type: "uint128",
        },
        {
          name: "wstx",
          type: "trait_reference",
        },
        {
          name: "usda",
          type: "trait_reference",
        },
        {
          name: "coll-type",
          type: "trait_reference",
        },
        {
          name: "reserve",
          type: "trait_reference",
        },
        {
          name: "ft",
          type: "trait_reference",
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
      access: "public",
      args: [
        {
          name: "stx-received",
          type: "uint128",
        },
      ],
      name: "set-stacking-stx-received",
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
      ],
      name: "set-stacking-stx-stacked",
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
          name: "height",
          type: "uint128",
        },
      ],
      name: "set-stacking-unlock-burn-height",
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
      name: "toggle-stacker-payer-shutdown",
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
          name: "vault-id",
          type: "uint128",
        },
      ],
      name: "calculate-vault-reward",
      outputs: {
        type: "uint128",
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
  ],
  fungible_tokens: [],
  maps: [],
  non_fungible_tokens: [],
  variables: [
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
      access: "variable",
      name: "payout-vault-id",
      type: "uint128",
    },
    {
      access: "variable",
      name: "stacker-payer-shutdown-activated",
      type: "bool",
    },
    {
      access: "variable",
      name: "stacking-stx-received",
      type: "uint128",
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
