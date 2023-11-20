import {
  CONTRACTS_RELATIVE_LOCATION,
  CONTRACT_EXTENSION,
  getRootRelativeContractsFolder,
} from "../constants";

export function contractWithSubDirectory(
  contractName: string,
  subfolder: string,
): string {
  if (contractName.endsWith(CONTRACT_EXTENSION)) {
    return `${getRootRelativeContractsFolder()}/${subfolder}/${contractName}`;
  }

  return `${getRootRelativeContractsFolder()}/${subfolder}/${contractName}.clar`;
}

export function contractWithSubDirectoryRelativeFilePath(
  contractName: string,
  subfolder: string,
) {
  if (contractName.endsWith(CONTRACT_EXTENSION)) {
    return `${CONTRACTS_RELATIVE_LOCATION}/${subfolder}/${contractName}`;
  }

  return `${CONTRACTS_RELATIVE_LOCATION}/${subfolder}/${contractName}.clar`;
}
