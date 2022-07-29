import {
  nodeSip010TraitFtStandardInfo,
  webSip010TraitFtStandardInfo,
} from "./sip-010-trait-ft-standard";
import { nodeUsdaTokenInfo, webUsdaTokenInfo } from "./usda-token";
export type { Sip010TraitFtStandardContract } from "./sip-010-trait-ft-standard";
export type { UsdaTokenContract } from "./usda-token";

export const nodeArkadikoContracts = {
  nodeSip010TraitFtStandard: nodeSip010TraitFtStandardInfo,
  nodeUsdaToken: nodeUsdaTokenInfo,
};

export const webArkadikoContracts = {
  webSip010TraitFtStandard: webSip010TraitFtStandardInfo,
  webUsdaToken: webUsdaTokenInfo,
};
