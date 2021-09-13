export interface TxOutSet {
  bestblock: string;
  height: number;
  success: boolean;
  total_amount: number;
  txouts: number;
  unspents: TxOutUnspent[];
}

export interface TxOutUnspent {
  amount: number;
  desc: string;
  height: number;
  scriptPubKey: string;
  txid: string;
  vout: number;
}

export interface GetRawTxResult {
  txid: string;
  hex: string;
  blockhash: string;
  vin: {
    txid: string;
    vout: number;
    scriptSig: {
      asm: string;
      hex: string;
    };
    sequence: number;
  }[];
  vout: {
    n: number;
    value: number;
    scriptPubKey: {
      addresses: string[];
      asm: string;
      hex: string;
      reqSigs: number;
      type: string; // 'pubkeyhash'
    };
  }[];
}

export interface PaymentResponse {
  txId: string;
  rawTx: string;
  txFee: number;
}
