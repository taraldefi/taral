
  
  import { Transaction } from 'taral-shared';
  import { ClarityTypes } from 'taral-shared'

  export interface CostsContract {
      cost_add: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_bind_name: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_check_let: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_check_tuple_cons: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_check_tuple_get: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_check_tuple_merge: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_fetch_contract_entry: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_get_function_entry: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_iterable_func: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_list_items_check: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_lookup_function: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_lookup_function_types: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_lookup_variable_const: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_lookup_variable_depth: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_option_check: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_option_cons: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_storage: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_tuple_items_check: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_type_annotate: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_type_check: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_type_lookup: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_use_trait_entry: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_analysis_visit: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_and: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_append: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_as_max_len: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_asserts: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ast_cycle_detection: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ast_parse: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_at_block: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_begin: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_bind_name: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_block_info: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_concat: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_contract_call: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_contract_of: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_contract_storage: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_create_ft: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_create_map: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_create_nft: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_create_var: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_data_hash_cost: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_default_to: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_div: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_element_at: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_eq: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_err_cons: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_fetch_entry: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_fetch_var: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_filter: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_fold: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ft_balance: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ft_burn: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ft_get_supply: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ft_mint: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ft_transfer: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ge: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_geq: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_hash160: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_if: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_index_of: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_inner_type_check_cost: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_int_cast: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_is_err: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_is_none: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_is_okay: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_is_some: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_keccak256: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_le: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_len: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_leq: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_let: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_list_cons: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_load_contract: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_log2: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_lookup_function: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_lookup_variable_depth: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_lookup_variable_size: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_map: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_match: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_mod: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_mul: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_nft_burn: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_nft_mint: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_nft_owner: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_nft_transfer: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_not: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_ok_cons: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_or: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_pow: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_principal_of: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_print: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_secp256k1recover: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_secp256k1verify: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_set_entry: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_set_var: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_sha256: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_sha512: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_sha512t256: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_some_cons: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_sqrti: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_stx_balance: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_stx_transfer: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_sub: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_try_ret: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_tuple_cons: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_tuple_get: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_tuple_merge: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_type_parse_step: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_unwrap: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_unwrap_err: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_unwrap_err_or_ret: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_unwrap_ret: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_user_function_application: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  cost_xor: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  poison_microblock: (n: number | bigint) => Promise<{
  "read_count": bigint;
  "read_length": bigint;
  "runtime": bigint;
  "write_count": bigint;
  "write_length": bigint
    }>;
  }