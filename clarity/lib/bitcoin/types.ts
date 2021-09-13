export interface Transaction {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin?: VinEntity[] | null;
  vout?: VoutEntity[] | null;
  hex: string;
  blockhash: string;
  confirmations: number;
  time: number;
  blocktime: number;
}

export interface VinEntity {
  txid: string;
  vout: number;
  scriptSig: ScriptSig;
  sequence: number;
}

export interface ScriptSig {
  asm: string;
  hex: string;
}

export interface VoutEntity {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKey;
}

export interface ScriptPubKey {
  asm: string;
  hex: string;
  reqSigs: number;
  type: string;
  addresses?: string[] | null;
}
