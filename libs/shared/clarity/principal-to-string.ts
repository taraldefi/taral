import {
    addressToString,
    ClarityType,
    PrincipalCV
} from "@stacks/transactions";
import { toJSON } from "..";

export function principalToString(principal: PrincipalCV): string {
    if (principal.type === ClarityType.PrincipalStandard) {
        return addressToString(principal.address);
    } else if (principal.type === ClarityType.PrincipalContract) {
        const address = addressToString(principal.address);
        return `${address}.${principal.contractName.content}`;
    } else {
        throw new Error(`Unexpected principal data: ${toJSON(principal)}`);
    }
}
