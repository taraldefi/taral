import { Contract } from "../../../lib/types";
import { proxy } from "../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../lib/providers/base-provider";

import type { NftTraitContract } from "./types";
import { NftTraitInterface } from "./abi";

export type { NftTraitContract } from "./types";

export const nftTraitContract = (provider: BaseProvider) => {
  const contract = proxy<NftTraitContract>(NftTraitInterface, provider);
  return contract;
};

export const nftTraitInfo: Contract<NftTraitContract> = {
  contract: nftTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/contracts/taral/nft-trait.clar",
};
