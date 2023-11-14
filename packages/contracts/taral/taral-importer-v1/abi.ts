import { ClarityAbi } from "lib-shared";

export const TaralImporterV1Interface: ClarityAbi = {
  clarity_version: "Clarity2",
  epoch: "Epoch21",
  functions: [
    {
      access: "private",
      args: [
        {
          name: "importer",
          type: "principal",
        },
      ],
      name: "get-or-create-importer-id",
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
          name: "importer",
          type: "principal",
        },
      ],
      name: "append-order",
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
          name: "importer",
          type: "principal",
        },
        {
          name: "importer-name",
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
          name: "importer-category",
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
            ok: "uint128",
          },
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "importer-principal",
          type: "principal",
        },
        {
          name: "success",
          type: "bool",
        },
      ],
      name: "update-importer-track-record",
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
          name: "importer",
          type: "principal",
        },
      ],
      name: "get-importer-hash",
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
      name: "ERR-IMPORTER-ALREADY-REGISTERED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR-IMPORTER-NOT-REGISTERED",
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
      name: "importer-storage-error",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
  ],
};
