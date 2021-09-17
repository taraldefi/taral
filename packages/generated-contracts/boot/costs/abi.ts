
  import { ClarityAbi } from 'taral-shared';

  export const CostsInterface: ClarityAbi = {
  "functions": [
    {
      "access": "private",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        },
        {
          "name": "a",
          "type": "uint128"
        },
        {
          "name": "b",
          "type": "uint128"
        }
      ],
      "name": "linear",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        },
        {
          "name": "a",
          "type": "uint128"
        },
        {
          "name": "b",
          "type": "uint128"
        }
      ],
      "name": "logn",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        },
        {
          "name": "a",
          "type": "uint128"
        },
        {
          "name": "b",
          "type": "uint128"
        }
      ],
      "name": "nlogn",
      "outputs": {
        "type": "uint128"
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "r",
          "type": "uint128"
        }
      ],
      "name": "runtime",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_add",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_bind_name",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_check_let",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_check_tuple_cons",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_check_tuple_get",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_check_tuple_merge",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_fetch_contract_entry",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_get_function_entry",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_iterable_func",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_list_items_check",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_lookup_function",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_lookup_function_types",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_lookup_variable_const",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_lookup_variable_depth",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_option_check",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_option_cons",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_storage",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_tuple_items_check",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_type_annotate",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_type_check",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_type_lookup",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_use_trait_entry",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_analysis_visit",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_and",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_append",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_as_max_len",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_asserts",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ast_cycle_detection",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ast_parse",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_at_block",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_begin",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_bind_name",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_block_info",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_concat",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_contract_call",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_contract_of",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_contract_storage",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_create_ft",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_create_map",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_create_nft",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_create_var",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_data_hash_cost",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_default_to",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_div",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_element_at",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_eq",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_err_cons",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_fetch_entry",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_fetch_var",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_filter",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_fold",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ft_balance",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ft_burn",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ft_get_supply",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ft_mint",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ft_transfer",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ge",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_geq",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_hash160",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_if",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_index_of",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_inner_type_check_cost",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_int_cast",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_is_err",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_is_none",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_is_okay",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_is_some",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_keccak256",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_le",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_len",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_leq",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_let",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_list_cons",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_load_contract",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_log2",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_lookup_function",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_lookup_variable_depth",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_lookup_variable_size",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_map",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_match",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_mod",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_mul",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_nft_burn",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_nft_mint",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_nft_owner",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_nft_transfer",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_not",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_ok_cons",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_or",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_pow",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_principal_of",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_print",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_secp256k1recover",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_secp256k1verify",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_set_entry",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_set_var",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_sha256",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_sha512",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_sha512t256",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_some_cons",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_sqrti",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_stx_balance",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_stx_transfer",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_sub",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_try_ret",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_tuple_cons",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_tuple_get",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_tuple_merge",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_type_parse_step",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_unwrap",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_unwrap_err",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_unwrap_err_or_ret",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_unwrap_ret",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_user_function_application",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "cost_xor",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "n",
          "type": "uint128"
        }
      ],
      "name": "poison_microblock",
      "outputs": {
        "type": {
          "tuple": [
            {
              "name": "read_count",
              "type": "uint128"
            },
            {
              "name": "read_length",
              "type": "uint128"
            },
            {
              "name": "runtime",
              "type": "uint128"
            },
            {
              "name": "write_count",
              "type": "uint128"
            },
            {
              "name": "write_length",
              "type": "uint128"
            }
          ]
        }
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [],
  "variables": []
};