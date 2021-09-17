import { getRootDirectory } from "./root";

export const CONTRACT_EXTENSION = ".clar";

export function getRootRelativeContractsFolder() {
    const root = getRootDirectory();

    return `${root}/packages/clarity/contracts`;
}

export function getRootRelativeTestContractsFolder() {
    const root = getRootDirectory();

    return `${root}/packages/shared/test-utils/contracts`;
}