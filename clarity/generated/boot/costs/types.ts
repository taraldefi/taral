import { IMetadata } from "../../../lib/providers/types";

// prettier-ignore

export interface CostsContract {
    cost_add: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_bind_name: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_check_let: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_check_tuple_cons: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_check_tuple_get: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_check_tuple_merge: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_fetch_contract_entry: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_get_function_entry: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_iterable_func: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_list_items_check: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_lookup_function: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_lookup_function_types: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_lookup_variable_const: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_lookup_variable_depth: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_option_check: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_option_cons: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_storage: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_tuple_items_check: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_type_annotate: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_type_check: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_type_lookup: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_use_trait_entry: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_analysis_visit: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_and: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_append: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_as_max_len: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_asserts: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ast_cycle_detection: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ast_parse: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_at_block: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_begin: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_bind_name: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_block_info: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_concat: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_contract_call: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_contract_of: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_contract_storage: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_create_ft: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_create_map: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_create_nft: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_create_var: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_data_hash_cost: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_default_to: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_div: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_element_at: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_eq: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_err_cons: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_fetch_entry: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_fetch_var: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_filter: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_fold: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ft_balance: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ft_burn: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ft_get_supply: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ft_mint: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ft_transfer: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ge: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_geq: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_hash160: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_if: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_index_of: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_inner_type_check_cost: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_int_cast: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_is_err: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_is_none: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_is_okay: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_is_some: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_keccak256: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_le: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_len: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_leq: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_let: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_list_cons: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_load_contract: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_log2: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_lookup_function: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_lookup_variable_depth: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_lookup_variable_size: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_map: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_match: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_mod: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_mul: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_nft_burn: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_nft_mint: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_nft_owner: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_nft_transfer: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_not: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_ok_cons: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_or: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_pow: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_principal_of: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_print: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_secp256k1recover: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_secp256k1verify: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_set_entry: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_set_var: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_sha256: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_sha512: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_sha512t256: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_some_cons: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_sqrti: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_stx_balance: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_stx_transfer: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_sub: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_try_ret: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_tuple_cons: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_tuple_get: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_tuple_merge: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_type_parse_step: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_unwrap: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_unwrap_err: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_unwrap_err_or_ret: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_unwrap_ret: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_user_function_application: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    cost_xor: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
    poison_microblock: (n: number, metadata: IMetadata) => Promise<{
        "read_count": number;
        "read_length": number;
        "runtime": number;
        "write_count": number;
        "write_length": number
    }>;
}
