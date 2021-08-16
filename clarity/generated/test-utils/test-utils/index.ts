import { BaseProvider } from "../../../lib/providers/base-provider";
import { proxy } from "../../../lib/test-utils/proxy";
import { Contract } from "../../../lib/types";
import { TestUtilsInterface } from "./abi";
import type { TestUtilsContract } from "./types";

export type { TestUtilsContract } from "./types";

export const testUtilsContract = (provider: BaseProvider) => {
  const contract = proxy<TestUtilsContract>(TestUtilsInterface, provider);
  return contract;
};

export const testUtilsInfo: Contract<TestUtilsContract> = {
  contract: testUtilsContract,
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "clarity/contracts/test-utils/test-utils.clar",
};
