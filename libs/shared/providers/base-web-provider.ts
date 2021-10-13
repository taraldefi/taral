import { ClarityAbiVariable } from "@stacks/transactions";
import { BaseProvider, IWebProviderRequest } from ".";
import { ClarityAbiMap, Transaction } from "..";

export abstract class BaseWebProvider implements BaseProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  async callReadOnly(_request: IWebProviderRequest): Promise<any> {
    throw new Error("Not implemented");
  }

  callPublic(_request: IWebProviderRequest): Transaction<any, any> {
    throw new Error("Not implemented");
  }

  async callMap(_map: ClarityAbiMap, _key: any) {
    throw new Error("Not implemented");
  }

  async callVariable(_variable: ClarityAbiVariable) {
    throw new Error("Not implemented");
  }
}
