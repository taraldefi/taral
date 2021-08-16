import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoDaoInterface } from "./abi";
import type { ArkadikoDaoContract } from "./types";

export type { ArkadikoDaoContract } from "./types";

export const arkadikoDaoContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDaoContract>(ArkadikoDaoInterface, provider);
  return contract;
};

export const arkadikoDaoInfo: Contract<ArkadikoDaoContract> = {
  contract: arkadikoDaoContract,
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "clarity/contracts/external/arkadiko/arkadiko-dao.clar",
};
