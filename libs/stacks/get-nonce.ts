import { NETWORK } from "taral-configuration";

export interface IGetNonceRequest {
  principal: string;
}

export async function getNonce(request: IGetNonceRequest) {
  const stacksAddressNonceResponse = await fetch(
    `${NETWORK.coreApiUrl}/extended/v1/address/${request.principal}/nonces`
  );

  const addressNoncesJSON = await stacksAddressNonceResponse.text();

  const response: AddressNonces = JSON.parse(addressNoncesJSON);

  return response;
}

/**
 * The latest nonce values used by an account by inspecting the mempool, microblock transactions, and anchored transactions
 */
export interface AddressNonces {
  /**
   * The latest nonce found within mempool transactions sent by this address. Will be null if there are no current mempool transactions for this address.
   */
  last_mempool_tx_nonce: number;
  /**
   * The latest nonce found within transactions sent by this address, including unanchored microblock transactions. Will be null if there are no current transactions for this address.
   */
  last_executed_tx_nonce: number;
  /**
   * The likely nonce required for creating the next transaction, based on the last nonces seen by the API. This can be incorrect if the API's mempool or transactions aren't fully synchronized, even by a small amount, or if a previous transaction is still propagating through the Stacks blockchain network when this endpoint is called.
   */
  possible_next_nonce: number;
  /**
   * Nonces that appear to be missing and likely causing a mempool transaction to be stuck.
   */
  detected_missing_nonces: number[];
}
