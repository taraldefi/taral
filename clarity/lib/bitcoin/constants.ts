import * as btc from 'bitcoinjs-lib';

// Replace with client.estimatesmartfee() for testnet/mainnet
export const REGTEST_FEE_RATE = 50;
export const MIN_TX_CONFIRMATIONS = 1;
export const REGTEST = btc.networks.regtest;