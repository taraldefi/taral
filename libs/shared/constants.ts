import { getRootDirectory } from "./root";

export const CONTRACT_EXTENSION = ".clar";

export const CONTRACTS_RELATIVE_LOCATION = "packages/clarity/contracts";

export function getRootRelativeContractsFolder() {
    const root = getRootDirectory();

    return `${root}/${CONTRACTS_RELATIVE_LOCATION}`;
}
