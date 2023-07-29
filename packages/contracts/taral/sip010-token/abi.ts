import { ClarityAbi } from "lib-shared";

export const Sip010TokenInterface: ClarityAbi = {
  clarity_version: "Clarity2",
  epoch: "Epoch21",
  functions: [
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
      name: "mint",
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
          name: "who",
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
                length: 9,
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
                length: 3,
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
              optional: "none",
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
      name: "test-coin",
    },
  ],
  maps: [],
  non_fungible_tokens: [],
  variables: [
    {
      access: "constant",
      name: "contract-owner",
      type: "principal",
    },
    {
      access: "constant",
      name: "err-not-token-owner",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "err-owner-only",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
  ],
};
