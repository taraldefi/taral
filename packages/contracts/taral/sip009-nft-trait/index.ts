import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { Sip009NftTraitContract } from "./types";
import { Sip009NftTraitInterface } from "./abi";
export type { Sip009NftTraitContract } from "./types";

export const nodeSip009NftTraitContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<Sip009NftTraitContract>(
    Sip009NftTraitInterface,
    provider,
  );
  return contract;
};

export const nodeSip009NftTraitInfo: NodeContract<Sip009NftTraitContract> = {
  contract: nodeSip009NftTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/sip009-nft-trait.clar",
};

export const webSip009NftTraitContract = (provider: BaseWebProvider) => {
  const contract = webProxy<Sip009NftTraitContract>(
    Sip009NftTraitInterface,
    provider,
  );
  return contract;
};

export const webSip009NftTraitInfo: WebContract<Sip009NftTraitContract> = {
  contract: webSip009NftTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/sip009-nft-trait.clar",
};
