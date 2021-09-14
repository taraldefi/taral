import { ClarityAbiFunction, ClarityAbiVariable } from "@stacks/transactions";
import { ClarinetAccount } from "..";
import { ClarityAbiMap } from "../clarity";
import { Transaction } from "../transaction";

export interface IProviderRequest {
  function: ClarityAbiFunction;
  arguments: any[];
}

export abstract class BaseProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  async callReadOnly(_request: IProviderRequest, _account: ClarinetAccount): Promise<any> {
    throw new Error("Not implemented");
  }

  callPublic(_request: IProviderRequest, _account: ClarinetAccount): Transaction<any, any> {
    throw new Error("Not implemented");
  }

  async callMap(_map: ClarityAbiMap, _key: any, _account: ClarinetAccount) {
    throw new Error("Not implemented");
  }

  async callVariable(_variable: ClarityAbiVariable, _account: ClarinetAccount) {
    throw new Error("Not implemented");
  }
}
