import { TaralOracleV1Contract } from "taral-contracts";
import { Memoize } from "typescript-memoize";
import { getOracleContract } from "./contracts";

class ContractHelper {
  @Memoize()
  public async buildOracleContract(): Promise<TaralOracleV1Contract> {
    const oracleContractInfo = await getOracleContract();
    const oracleContract = oracleContractInfo.contract;
    const account = oracleContractInfo.account;

    const contract = oracleContract.contract(account);

    return contract;
  }
}

export const ORACLE_HELPER = new ContractHelper();
