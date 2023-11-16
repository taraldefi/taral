import { nodeSip010FtTraitInfo, webSip010FtTraitInfo } from './sip010-ft-trait';
import { nodeSip009NftTraitInfo, webSip009NftTraitInfo } from './sip009-nft-trait';
import { nodeClarityBitcoinInfo, webClarityBitcoinInfo } from './clarity-bitcoin';
import { nodeExporterTraitInfo, webExporterTraitInfo } from './exporter-trait';
import { nodeFtTraitInfo, webFtTraitInfo } from './ft-trait';
import { nodeImporterTraitInfo, webImporterTraitInfo } from './importer-trait';
import { nodeNftTraitInfo, webNftTraitInfo } from './nft-trait';
import { nodeStorageServiceTraitInfo, webStorageServiceTraitInfo } from './storage-service-trait';
import { nodeDummyOracleInfo, webDummyOracleInfo } from './dummy-oracle';
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
import { nodeTaralImporterV1Info, webTaralImporterV1Info } from './taral-importer-v1';
import { nodeTaralOracleV1Info, webTaralOracleV1Info } from './taral-oracle-v1';
import { nodeTaralPurchaseOrderTraitInfo, webTaralPurchaseOrderTraitInfo } from './taral-purchase-order-trait';
import { nodePurchaseOrderStorageInfo, webPurchaseOrderStorageInfo } from './purchase-order-storage';
import { nodeTaralPurchaseOrderNftInfo, webTaralPurchaseOrderNftInfo } from './taral-purchase-order-nft';
import { nodeTaralPurchaseOrderV1Info, webTaralPurchaseOrderV1Info } from './taral-purchase-order-v1';
import { nodeTaralStorageInfo, webTaralStorageInfo } from './taral-storage';
import { nodeUsdaTokenInfo, webUsdaTokenInfo } from './usda-token';
import { nodeMarketplaceStorageInfo, webMarketplaceStorageInfo } from './marketplace-storage';
import { nodeMarketplaceTraitInfo, webMarketplaceTraitInfo } from './marketplace-trait';
import { nodeNftMarketplaceInfo, webNftMarketplaceInfo } from './nft-marketplace';
import { nodeSip009NftInfo, webSip009NftInfo } from './sip009-nft';
import { nodeSip010TokenInfo, webSip010TokenInfo } from './sip010-token';
import { nodeTaralLenderInfo, webTaralLenderInfo } from './taral-lender';
import { nodeTaralBankInfo, webTaralBankInfo } from './taral-bank';
    export type { Sip010FtTraitContract } from './sip010-ft-trait';
export type { Sip009NftTraitContract } from './sip009-nft-trait';
export type { ClarityBitcoinContract } from './clarity-bitcoin';
export type { ExporterTraitContract } from './exporter-trait';
export type { FtTraitContract } from './ft-trait';
export type { ImporterTraitContract } from './importer-trait';
export type { NftTraitContract } from './nft-trait';
export type { StorageServiceTraitContract } from './storage-service-trait';
export type { DummyOracleContract } from './dummy-oracle';
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
export type { TaralImporterV1Contract } from './taral-importer-v1';
export type { TaralOracleV1Contract } from './taral-oracle-v1';
export type { TaralPurchaseOrderTraitContract } from './taral-purchase-order-trait';
export type { PurchaseOrderStorageContract } from './purchase-order-storage';
export type { TaralPurchaseOrderNftContract } from './taral-purchase-order-nft';
export type { TaralPurchaseOrderV1Contract } from './taral-purchase-order-v1';
export type { TaralStorageContract } from './taral-storage';
export type { UsdaTokenContract } from './usda-token';
export type { MarketplaceStorageContract } from './marketplace-storage';
export type { MarketplaceTraitContract } from './marketplace-trait';
export type { NftMarketplaceContract } from './nft-marketplace';
export type { Sip009NftContract } from './sip009-nft';
export type { Sip010TokenContract } from './sip010-token';
export type { TaralLenderContract } from './taral-lender';
export type { TaralBankContract } from './taral-bank';
    
    export const nodeTaralContracts = {
      nodeSip010FtTrait: nodeSip010FtTraitInfo,
  nodeSip009NftTrait: nodeSip009NftTraitInfo,
  nodeClarityBitcoin: nodeClarityBitcoinInfo,
  nodeExporterTrait: nodeExporterTraitInfo,
  nodeFtTrait: nodeFtTraitInfo,
  nodeImporterTrait: nodeImporterTraitInfo,
  nodeNftTrait: nodeNftTraitInfo,
  nodeStorageServiceTrait: nodeStorageServiceTraitInfo,
  nodeDummyOracle: nodeDummyOracleInfo,
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
  nodeTaralImporterV1: nodeTaralImporterV1Info,
  nodeTaralOracleV1: nodeTaralOracleV1Info,
  nodeTaralPurchaseOrderTrait: nodeTaralPurchaseOrderTraitInfo,
  nodePurchaseOrderStorage: nodePurchaseOrderStorageInfo,
  nodeTaralPurchaseOrderNft: nodeTaralPurchaseOrderNftInfo,
  nodeTaralPurchaseOrderV1: nodeTaralPurchaseOrderV1Info,
  nodeTaralStorage: nodeTaralStorageInfo,
  nodeUsdaToken: nodeUsdaTokenInfo,
  nodeMarketplaceStorage: nodeMarketplaceStorageInfo,
  nodeMarketplaceTrait: nodeMarketplaceTraitInfo,
  nodeNftMarketplace: nodeNftMarketplaceInfo,
  nodeSip009Nft: nodeSip009NftInfo,
  nodeSip010Token: nodeSip010TokenInfo,
  nodeTaralLender: nodeTaralLenderInfo,
  nodeTaralBank: nodeTaralBankInfo,
    };

    export const webTaralContracts = {
      webSip010FtTrait: webSip010FtTraitInfo,
  webSip009NftTrait: webSip009NftTraitInfo,
  webClarityBitcoin: webClarityBitcoinInfo,
  webExporterTrait: webExporterTraitInfo,
  webFtTrait: webFtTraitInfo,
  webImporterTrait: webImporterTraitInfo,
  webNftTrait: webNftTraitInfo,
  webStorageServiceTrait: webStorageServiceTraitInfo,
  webDummyOracle: webDummyOracleInfo,
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
  webTaralImporterV1: webTaralImporterV1Info,
  webTaralOracleV1: webTaralOracleV1Info,
  webTaralPurchaseOrderTrait: webTaralPurchaseOrderTraitInfo,
  webPurchaseOrderStorage: webPurchaseOrderStorageInfo,
  webTaralPurchaseOrderNft: webTaralPurchaseOrderNftInfo,
  webTaralPurchaseOrderV1: webTaralPurchaseOrderV1Info,
  webTaralStorage: webTaralStorageInfo,
  webUsdaToken: webUsdaTokenInfo,
  webMarketplaceStorage: webMarketplaceStorageInfo,
  webMarketplaceTrait: webMarketplaceTraitInfo,
  webNftMarketplace: webNftMarketplaceInfo,
  webSip009Nft: webSip009NftInfo,
  webSip010Token: webSip010TokenInfo,
  webTaralLender: webTaralLenderInfo,
  webTaralBank: webTaralBankInfo,
    };
    