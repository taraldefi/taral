import { ClarityAbiVariable } from "@stacks/transactions";
import { BaseProvider, INodeProviderRequest } from ".";
import { ClarityAbiMap } from "..";
import { Transaction } from "../transaction";

export abstract class BaseNodeProvider extends BaseProvider {
    // eslint-disable-next-line @typescript-eslint/require-await
    async callReadOnly(_request: INodeProviderRequest): Promise<any> {
      throw new Error("Not implemented");
    }
  
    callPublic(_request: INodeProviderRequest): Transaction<any, any> {
      throw new Error("Not implemented");
    }
  
    async callMap(_map: ClarityAbiMap, _key: any) {
      throw new Error("Not implemented");
    }
  
    async callVariable(_variable: ClarityAbiVariable) {
      throw new Error("Not implemented");
    }
  }
  