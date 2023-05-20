import { ClarityAbiVariable } from "@stacks/transactions";
import { BaseProvider, INodeProviderRequest } from ".";
import { ClarityAbiMap } from "..";
import { Transaction } from "../transaction";

export abstract class BaseNodeProvider implements BaseProvider {
    // eslint-disable-next-line @typescript-eslint/require-await
    async callReadOnly(_request: INodeProviderRequest): Promise<any> {
        throw new Error("Not implemented");
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    callPublic(_request: INodeProviderRequest): Transaction<any, any> {
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
