import {
  CONTRACT_EXTENSION, getRootRelativeContractsFolder, getRootRelativeTestContractsFolder,
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

export function testContractWithSubdirectory(
  contractName: string,
  subfolder: string
) {
  if (contractName.endsWith(CONTRACT_EXTENSION)) {
    return `${getRootRelativeTestContractsFolder()}/${subfolder}/${contractName}`;
  }

  return `${getRootRelativeTestContractsFolder()}/${subfolder}/${contractName}.clar`;
}
