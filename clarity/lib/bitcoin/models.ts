
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
    vin: {
        txid: string;
        vout: number;
        scriptSig: {
            hex: string;
        };
    }[];
    vout: {
        n: number;
        value: number;
        scriptPubKey: {
            addresses: string[];
            hex: string;
            type: string; // 'pubkeyhash'
        };
    }[];
}

export interface PaymentResponse {
    txId: string; 
    rawTx: string; 
    txFee: number;
}