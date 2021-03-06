import { ClarityAbiVariable } from "@stacks/transactions";
import { ClarityAbiMap } from "../clarity";
import { Transaction } from "../transaction";

export abstract class BaseProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  async callReadOnly(_request: any): Promise<any> {
    throw new Error("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  callPublic(_request: any): Transaction<any, any> {
    throw new Error("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async callMap(_map: ClarityAbiMap, _key: any) {
    throw new Error("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async callVariable(_variable: ClarityAbiVariable) {
    throw new Error("Not implemented");
  }
}
