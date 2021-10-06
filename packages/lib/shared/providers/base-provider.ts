import { ClarityAbiFunction, ClarityAbiVariable } from "@stacks/transactions";
import { ClarinetAccount } from "..";
import { ClarityAbiMap } from "../clarity";
import { Transaction } from "../transaction";

export interface IProviderRequest {
  function: ClarityAbiFunction;
  caller: ClarinetAccount;
  arguments: any[];

  onFinish?: () => void;
  onCancel?: () => void;
}

export abstract class BaseProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  async callReadOnly(_request: IProviderRequest): Promise<any> {
    throw new Error("Not implemented");
  }

  callPublic(_request: IProviderRequest): Transaction<any, any> {
    throw new Error("Not implemented");
  }

  async callMap(_map: ClarityAbiMap, _key: any) {
    throw new Error("Not implemented");
  }

  async callVariable(_variable: ClarityAbiVariable) {
    throw new Error("Not implemented");
  }
}
