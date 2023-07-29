import { ClarityAbi } from "lib-shared";

export const TaralExporterV1Interface: ClarityAbi = {
  clarity_version: "Clarity2",
  epoch: "Epoch21",
  functions: [
    {
      access: "private",
      args: [
        {
          name: "exporter",
          type: "principal",
        },
      ],
      name: "get-or-create-exporter-id",
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
          name: "new-order-id",
          type: "uint128",
        },
        {
          name: "exporter",
          type: "principal",
        },
      ],
      name: "append-order",
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
          name: "exporter",
          type: "principal",
        },
        {
          name: "exporter-name",
          type: {
            "string-utf8": {
              length: 100,
            },
          },
        },
        {
          name: "hash",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
        {
          name: "exporter-category",
          type: {
            "string-utf8": {
              length: 100,
            },
          },
        },
      ],
      name: "register",
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
          name: "exporter",
          type: "principal",
        },
      ],
      name: "get-exporter-hash",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: {
              buffer: {
                length: 256,
              },
            },
          },
        },
      },
    },
    {
      access: "read_only",
      args: [],
      name: "get-info",
      outputs: {
        type: {
          response: {
            error: "none",
            ok: {
              tuple: [
                {
                  name: "version",
                  type: {
                    "string-ascii": {
                      length: 10,
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
      args: [],
      name: "get-version",
      outputs: {
        type: {
          "string-ascii": {
            length: 10,
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
      name: "ERR-EXPORTER-ALREADY-REGISTERED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR-EXPORTER-NOT-REGISTERED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR-GENERIC",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR_EMPTY_HASH",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR_EMPTY_SIGNATURE",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR_INVALID_SIGNATURE",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "VERSION",
      type: {
        "string-ascii": {
          length: 10,
        },
      },
    },
    {
      access: "constant",
      name: "exporter-storage-error",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
  ],
};
