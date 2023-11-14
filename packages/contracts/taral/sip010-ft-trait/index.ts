import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { Sip010FtTraitContract } from "./types";
import { Sip010FtTraitInterface } from "./abi";
export type { Sip010FtTraitContract } from "./types";

export const nodeSip010FtTraitContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<Sip010FtTraitContract>(
    Sip010FtTraitInterface,
    provider,
  );
  return contract;
};

export const nodeSip010FtTraitInfo: NodeContract<Sip010FtTraitContract> = {
  contract: nodeSip010FtTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/sip010-ft-trait.clar",
};

export const webSip010FtTraitContract = (provider: BaseWebProvider) => {
  const contract = webProxy<Sip010FtTraitContract>(
    Sip010FtTraitInterface,
    provider,
  );
  return contract;
};

export const webSip010FtTraitInfo: WebContract<Sip010FtTraitContract> = {
  contract: webSip010FtTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/sip010-ft-trait.clar",
};
