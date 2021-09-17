import {
    CONTRACT_EXTENSION, getRootRelativeContractsFolder
} from "../constants";

export function contractWithSubDirectory(
    contractName: string,
    subfolder: string
): string {
    if (contractName.endsWith(CONTRACT_EXTENSION)) {
        return `${getRootRelativeContractsFolder()}/${subfolder}/${contractName}`;
    }

    return `${getRootRelativeContractsFolder()}/${subfolder}/${contractName}.clar`;
}
