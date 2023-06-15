import { nodeClarityBitcoinInfo, webClarityBitcoinInfo } from './clarity-bitcoin';
import { nodeExporterTraitInfo, webExporterTraitInfo } from './exporter-trait';
import { nodeFtTraitInfo, webFtTraitInfo } from './ft-trait';
import { nodeImporterTraitInfo, webImporterTraitInfo } from './importer-trait';
import { nodeNftTraitInfo, webNftTraitInfo } from './nft-trait';
import { nodeStorageServiceTraitInfo, webStorageServiceTraitInfo } from './storage-service-trait';
import { nodeInsurancePoolOracleInfo, webInsurancePoolOracleInfo } from './insurance-pool-oracle';
import { nodeInsurancePoolAuditCompactInfo, webInsurancePoolAuditCompactInfo } from './insurance-pool-audit-compact';
import { nodeInsurancePoolAuditInfo, webInsurancePoolAuditInfo } from './insurance-pool-audit';
import { nodeInsurancePoolAdminInfo, webInsurancePoolAdminInfo } from './insurance-pool-admin';
import { nodeExporterStorageInfo, webExporterStorageInfo } from './exporter-storage';
import { nodeImporterStorageInfo, webImporterStorageInfo } from './importer-storage';
import { nodeTaralFileStorageInfo, webTaralFileStorageInfo } from './taral-file-storage';
import { nodeBtcFtSwapInfo, webBtcFtSwapInfo } from './btc-ft-swap';
import { nodeBtcNftSwapInfo, webBtcNftSwapInfo } from './btc-nft-swap';
import { nodeStorageServiceInfo, webStorageServiceInfo } from './storage-service';
import { nodeTaralCoinInfo, webTaralCoinInfo } from './taral-coin';
import { nodeTaralExporterV1Info, webTaralExporterV1Info } from './taral-exporter-v1';
import { nodeTaralExporterInfo, webTaralExporterInfo } from './taral-exporter';
import { nodeTaralImporterInfo, webTaralImporterInfo } from './taral-importer';
import { nodeTaralImporterV1Info, webTaralImporterV1Info } from './taral-importer-v1';
import { nodeTaralOracleV1Info, webTaralOracleV1Info } from './taral-oracle-v1';
import { nodeTaralPurchaseOrderInfo, webTaralPurchaseOrderInfo } from './taral-purchase-order';
import { nodeTaralPurchaseOrderNftInfo, webTaralPurchaseOrderNftInfo } from './taral-purchase-order-nft';
import { nodeTaralStorageInfo, webTaralStorageInfo } from './taral-storage';
import { nodeUsdaTokenInfo, webUsdaTokenInfo } from './usda-token';
    export type { ClarityBitcoinContract } from './clarity-bitcoin';
export type { ExporterTraitContract } from './exporter-trait';
export type { FtTraitContract } from './ft-trait';
export type { ImporterTraitContract } from './importer-trait';
export type { NftTraitContract } from './nft-trait';
export type { StorageServiceTraitContract } from './storage-service-trait';
export type { InsurancePoolOracleContract } from './insurance-pool-oracle';
export type { InsurancePoolAuditCompactContract } from './insurance-pool-audit-compact';
export type { InsurancePoolAuditContract } from './insurance-pool-audit';
export type { InsurancePoolAdminContract } from './insurance-pool-admin';
export type { ExporterStorageContract } from './exporter-storage';
export type { ImporterStorageContract } from './importer-storage';
export type { TaralFileStorageContract } from './taral-file-storage';
export type { BtcFtSwapContract } from './btc-ft-swap';
export type { BtcNftSwapContract } from './btc-nft-swap';
export type { StorageServiceContract } from './storage-service';
export type { TaralCoinContract } from './taral-coin';
export type { TaralExporterV1Contract } from './taral-exporter-v1';
export type { TaralExporterContract } from './taral-exporter';
export type { TaralImporterContract } from './taral-importer';
export type { TaralImporterV1Contract } from './taral-importer-v1';
export type { TaralOracleV1Contract } from './taral-oracle-v1';
export type { TaralPurchaseOrderContract } from './taral-purchase-order';
export type { TaralPurchaseOrderNftContract } from './taral-purchase-order-nft';
export type { TaralStorageContract } from './taral-storage';
export type { UsdaTokenContract } from './usda-token';
    
    export const nodeTaralContracts = {
      nodeClarityBitcoin: nodeClarityBitcoinInfo,
  nodeExporterTrait: nodeExporterTraitInfo,
  nodeFtTrait: nodeFtTraitInfo,
  nodeImporterTrait: nodeImporterTraitInfo,
  nodeNftTrait: nodeNftTraitInfo,
  nodeStorageServiceTrait: nodeStorageServiceTraitInfo,
  nodeInsurancePoolOracle: nodeInsurancePoolOracleInfo,
  nodeInsurancePoolAuditCompact: nodeInsurancePoolAuditCompactInfo,
  nodeInsurancePoolAudit: nodeInsurancePoolAuditInfo,
  nodeInsurancePoolAdmin: nodeInsurancePoolAdminInfo,
  nodeExporterStorage: nodeExporterStorageInfo,
  nodeImporterStorage: nodeImporterStorageInfo,
  nodeTaralFileStorage: nodeTaralFileStorageInfo,
  nodeBtcFtSwap: nodeBtcFtSwapInfo,
  nodeBtcNftSwap: nodeBtcNftSwapInfo,
  nodeStorageService: nodeStorageServiceInfo,
  nodeTaralCoin: nodeTaralCoinInfo,
  nodeTaralExporterV1: nodeTaralExporterV1Info,
  nodeTaralExporter: nodeTaralExporterInfo,
  nodeTaralImporter: nodeTaralImporterInfo,
  nodeTaralImporterV1: nodeTaralImporterV1Info,
  nodeTaralOracleV1: nodeTaralOracleV1Info,
  nodeTaralPurchaseOrder: nodeTaralPurchaseOrderInfo,
  nodeTaralPurchaseOrderNft: nodeTaralPurchaseOrderNftInfo,
  nodeTaralStorage: nodeTaralStorageInfo,
  nodeUsdaToken: nodeUsdaTokenInfo,
    };

    export const webTaralContracts = {
      webClarityBitcoin: webClarityBitcoinInfo,
  webExporterTrait: webExporterTraitInfo,
  webFtTrait: webFtTraitInfo,
  webImporterTrait: webImporterTraitInfo,
  webNftTrait: webNftTraitInfo,
  webStorageServiceTrait: webStorageServiceTraitInfo,
  webInsurancePoolOracle: webInsurancePoolOracleInfo,
  webInsurancePoolAuditCompact: webInsurancePoolAuditCompactInfo,
  webInsurancePoolAudit: webInsurancePoolAuditInfo,
  webInsurancePoolAdmin: webInsurancePoolAdminInfo,
  webExporterStorage: webExporterStorageInfo,
  webImporterStorage: webImporterStorageInfo,
  webTaralFileStorage: webTaralFileStorageInfo,
  webBtcFtSwap: webBtcFtSwapInfo,
  webBtcNftSwap: webBtcNftSwapInfo,
  webStorageService: webStorageServiceInfo,
  webTaralCoin: webTaralCoinInfo,
  webTaralExporterV1: webTaralExporterV1Info,
  webTaralExporter: webTaralExporterInfo,
  webTaralImporter: webTaralImporterInfo,
  webTaralImporterV1: webTaralImporterV1Info,
  webTaralOracleV1: webTaralOracleV1Info,
  webTaralPurchaseOrder: webTaralPurchaseOrderInfo,
  webTaralPurchaseOrderNft: webTaralPurchaseOrderNftInfo,
  webTaralStorage: webTaralStorageInfo,
  webUsdaToken: webUsdaTokenInfo,
    };
    