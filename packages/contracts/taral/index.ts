import { nodeBtcFtSwapInfo, webBtcFtSwapInfo } from "./btc-ft-swap";
import { nodeBtcNftSwapInfo, webBtcNftSwapInfo } from "./btc-nft-swap";
import {
  nodeClarityBitcoinInfo,
  webClarityBitcoinInfo,
} from "./clarity-bitcoin";
import {
  nodeInsurancePoolAdminInfo,
  webInsurancePoolAdminInfo,
} from "./insurance-pool-admin";
import {
  nodeInsurancePoolAuditInfo,
  webInsurancePoolAuditInfo,
} from "./insurance-pool-audit";
import {
  nodeInsurancePoolAuditCompactInfo,
  webInsurancePoolAuditCompactInfo,
} from "./insurance-pool-audit-compact";
import {
  nodeInsurancePoolOracleInfo,
  webInsurancePoolOracleInfo,
} from "./insurance-pool-oracle";
import { nodeNftTraitInfo, webNftTraitInfo } from "./nft-trait";
import {
  nodeSip10FtStandardInfo,
  webSip10FtStandardInfo,
} from "./sip-10-ft-standard";
import { nodeTaralCoinInfo, webTaralCoinInfo } from "./taral-coin";
import { nodeTaralOracleV1Info, webTaralOracleV1Info } from "./taral-oracle-v1";
export type { BtcFtSwapContract } from "./btc-ft-swap";
export type { BtcNftSwapContract } from "./btc-nft-swap";
export type { ClarityBitcoinContract } from "./clarity-bitcoin";
export type { InsurancePoolAdminContract } from "./insurance-pool-admin";
export type { InsurancePoolAuditContract } from "./insurance-pool-audit";
export type { InsurancePoolAuditCompactContract } from "./insurance-pool-audit-compact";
export type { InsurancePoolOracleContract } from "./insurance-pool-oracle";
export type { NftTraitContract } from "./nft-trait";
export type { Sip10FtStandardContract } from "./sip-10-ft-standard";
export type { TaralCoinContract } from "./taral-coin";
export type { TaralOracleV1Contract } from "./taral-oracle-v1";

export const nodeTaralContracts = {
  nodeSip10FtStandard: nodeSip10FtStandardInfo,
  nodeNftTrait: nodeNftTraitInfo,
  nodeTaralCoin: nodeTaralCoinInfo,
  nodeClarityBitcoin: nodeClarityBitcoinInfo,
  nodeBtcFtSwap: nodeBtcFtSwapInfo,
  nodeBtcNftSwap: nodeBtcNftSwapInfo,
  nodeTaralOracleV1: nodeTaralOracleV1Info,
  nodeInsurancePoolOracle: nodeInsurancePoolOracleInfo,
  nodeInsurancePoolAuditCompact: nodeInsurancePoolAuditCompactInfo,
  nodeInsurancePoolAudit: nodeInsurancePoolAuditInfo,
  nodeInsurancePoolAdmin: nodeInsurancePoolAdminInfo,
};

export const webTaralContracts = {
  webSip10FtStandard: webSip10FtStandardInfo,
  webNftTrait: webNftTraitInfo,
  webTaralCoin: webTaralCoinInfo,
  webClarityBitcoin: webClarityBitcoinInfo,
  webBtcFtSwap: webBtcFtSwapInfo,
  webBtcNftSwap: webBtcNftSwapInfo,
  webTaralOracleV1: webTaralOracleV1Info,
  webInsurancePoolOracle: webInsurancePoolOracleInfo,
  webInsurancePoolAuditCompact: webInsurancePoolAuditCompactInfo,
  webInsurancePoolAudit: webInsurancePoolAuditInfo,
  webInsurancePoolAdmin: webInsurancePoolAdminInfo,
};
