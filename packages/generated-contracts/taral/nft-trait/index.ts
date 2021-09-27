import { BaseProvider, Contract, proxy } from "lib-shared";
import { NftTraitInterface } from "./abi";
import type { NftTraitContract } from "./types";
export type { NftTraitContract } from "./types";

export const nftTraitContract = (provider: BaseProvider) => {
  const contract = proxy<NftTraitContract>(NftTraitInterface, provider);
  return contract;
};

export const nftTraitInfo: Contract<NftTraitContract> = {
  contract: nftTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/nft-trait.clar",
};
