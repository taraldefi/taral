import { ClarityAbi } from "lib-shared";

export const TaralOracleV1Interface: ClarityAbi = {
  clarity_version: "Clarity2",
  epoch: "Epoch21",
  functions: [
    {
      access: "private",
      args: [
        {
          name: "idx",
          type: "uint128",
        },
        {
          name: "input",
          type: {
            tuple: [
              {
                name: "acc",
                type: "uint128",
              },
              {
                name: "data",
                type: {
                  buffer: {
                    length: 256,
                  },
                },
              },
            ],
          },
        },
      ],
      name: "add-and-shift-uint-offsets",
      outputs: {
        type: {
          tuple: [
            {
              name: "acc",
              type: "uint128",
            },
            {
              name: "data",
              type: {
                buffer: {
                  length: 256,
                },
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
          name: "byte",
          type: {
            buffer: {
              length: 1,
            },
          },
        },
      ],
      name: "buff-to-ascii",
      outputs: {
        type: {
          "string-ascii": {
            length: 1,
          },
        },
      },
    },
    {
      access: "private",
      args: [
        {
          name: "msg",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
        {
          name: "symbol-offset",
          type: "uint128",
        },
        {
          name: "symbol-length",
          type: "uint128",
        },
      ],
      name: "buff-to-string",
      outputs: {
        type: {
          "string-ascii": {
            length: 32,
          },
        },
      },
    },
    {
      access: "private",
      args: [
        {
          name: "byte",
          type: {
            buffer: {
              length: 1,
            },
          },
        },
      ],
      name: "buff-to-u8",
      outputs: {
        type: "uint128",
      },
    },
    {
      access: "private",
      args: [
        {
          name: "word",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
        {
          name: "offsets",
          type: {
            list: {
              length: 8,
              type: "uint128",
            },
          },
        },
      ],
      name: "buff-to-uint",
      outputs: {
        type: "uint128",
      },
    },
    {
      access: "private",
      args: [
        {
          name: "price",
          type: {
            tuple: [
              {
                name: "msg",
                type: {
                  buffer: {
                    length: 256,
                  },
                },
              },
              {
                name: "sig",
                type: {
                  buffer: {
                    length: 65,
                  },
                },
              },
              {
                name: "src",
                type: {
                  "string-ascii": {
                    length: 16,
                  },
                },
              },
            ],
          },
        },
      ],
      name: "call-add-price",
      outputs: {
        type: "bool",
      },
    },
    {
      access: "private",
      args: [
        {
          name: "idx",
          type: "uint128",
        },
        {
          name: "input",
          type: {
            tuple: [
              {
                name: "acc",
                type: {
                  "string-ascii": {
                    length: 32,
                  },
                },
              },
              {
                name: "data",
                type: {
                  buffer: {
                    length: 256,
                  },
                },
              },
              {
                name: "length",
                type: "uint128",
              },
              {
                name: "offset",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "construct-string",
      outputs: {
        type: {
          tuple: [
            {
              name: "acc",
              type: {
                "string-ascii": {
                  length: 32,
                },
              },
            },
            {
              name: "data",
              type: {
                buffer: {
                  length: 256,
                },
              },
            },
            {
              name: "length",
              type: "uint128",
            },
            {
              name: "offset",
              type: "uint128",
            },
          ],
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "source",
          type: {
            "string-ascii": {
              length: 16,
            },
          },
        },
        {
          name: "msg",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
        {
          name: "sig",
          type: {
            buffer: {
              length: 65,
            },
          },
        },
      ],
      name: "add-price",
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
          name: "prices",
          type: {
            list: {
              length: 100,
              type: {
                tuple: [
                  {
                    name: "msg",
                    type: {
                      buffer: {
                        length: 256,
                      },
                    },
                  },
                  {
                    name: "sig",
                    type: {
                      buffer: {
                        length: 65,
                      },
                    },
                  },
                  {
                    name: "src",
                    type: {
                      "string-ascii": {
                        length: 16,
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      ],
      name: "add-prices",
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
      access: "public",
      args: [
        {
          name: "source",
          type: {
            "string-ascii": {
              length: 16,
            },
          },
        },
        {
          name: "public-key",
          type: {
            buffer: {
              length: 33,
            },
          },
        },
      ],
      name: "add-source",
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
          name: "source",
          type: {
            "string-ascii": {
              length: 16,
            },
          },
        },
      ],
      name: "revoke-source",
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
          name: "source",
          type: {
            "string-ascii": {
              length: 16,
            },
          },
        },
      ],
      name: "check-source",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "public-key",
                type: {
                  buffer: {
                    length: 33,
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
          name: "msg",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
      ],
      name: "extract-amount",
      outputs: {
        type: "uint128",
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "msg",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
      ],
      name: "extract-symbol",
      outputs: {
        type: {
          "string-ascii": {
            length: 32,
          },
        },
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "msg",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
      ],
      name: "extract-timestamp",
      outputs: {
        type: "uint128",
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "source",
          type: {
            "string-ascii": {
              length: 16,
            },
          },
        },
        {
          name: "symbol",
          type: {
            "string-ascii": {
              length: 32,
            },
          },
        },
      ],
      name: "get-price",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "amount",
                type: "uint128",
              },
              {
                name: "height",
                type: "uint128",
              },
              {
                name: "timestamp",
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
          name: "msg",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
        {
          name: "signature",
          type: {
            buffer: {
              length: 65,
            },
          },
        },
        {
          name: "public-key",
          type: {
            buffer: {
              length: 33,
            },
          },
        },
      ],
      name: "verify-signature",
      outputs: {
        type: "bool",
      },
    },
  ],
  fungible_tokens: [],
  maps: [
    {
      key: {
        tuple: [
          {
            name: "source",
            type: {
              "string-ascii": {
                length: 16,
              },
            },
          },
          {
            name: "symbol",
            type: {
              "string-ascii": {
                length: 32,
              },
            },
          },
        ],
      },
      name: "oracle-data",
      value: {
        tuple: [
          {
            name: "amount",
            type: "uint128",
          },
          {
            name: "height",
            type: "uint128",
          },
          {
            name: "timestamp",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: {
        tuple: [
          {
            name: "source",
            type: {
              "string-ascii": {
                length: 16,
              },
            },
          },
        ],
      },
      name: "sources",
      value: {
        tuple: [
          {
            name: "public-key",
            type: {
              buffer: {
                length: 33,
              },
            },
          },
        ],
      },
    },
  ],
  non_fungible_tokens: [],
  variables: [
    {
      access: "constant",
      name: "BUFF_TO_UINT8",
      type: {
        list: {
          length: 256,
          type: {
            buffer: {
              length: 1,
            },
          },
        },
      },
    },
    {
      access: "constant",
      name: "UINT8_TO_ASCII",
      type: {
        list: {
          length: 240,
          type: {
            "string-ascii": {
              length: 1,
            },
          },
        },
      },
    },
    {
      access: "constant",
      name: "contract-owner",
      type: "principal",
    },
    {
      access: "constant",
      name: "err-incorrect-signature",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "err-not-owner",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "err-older-timestamp",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "err-recover",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "eth-preamble",
      type: {
        buffer: {
          length: 28,
        },
      },
    },
    {
      access: "variable",
      name: "offsets-amount",
      type: {
        list: {
          length: 8,
          type: "uint128",
        },
      },
    },
    {
      access: "variable",
      name: "offsets-symbol-length",
      type: {
        list: {
          length: 8,
          type: "uint128",
        },
      },
    },
    {
      access: "variable",
      name: "offsets-symbol-offset",
      type: {
        list: {
          length: 8,
          type: "uint128",
        },
      },
    },
    {
      access: "variable",
      name: "offsets-timestamp",
      type: {
        list: {
          length: 8,
          type: "uint128",
        },
      },
    },
  ],
};
