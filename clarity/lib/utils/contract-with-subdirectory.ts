import {
  CONTRACT_EXTENSION,
  CONTRACT_FOLDER,
  TEST_CONTRACT_FOLDER,
} from "../constants";

export function contractWithSubDirectory(
  contractName: string,
  subfolder: string
) {
  if (contractName.endsWith(CONTRACT_EXTENSION)) {
    return `${CONTRACT_FOLDER}/${subfolder}/${contractName}`;
  }

  return `${CONTRACT_FOLDER}/${subfolder}/${contractName}.clar`;
}

export function testContractWithSubdirectory(
  contractName: string,
  subfolder: string
) {
  if (contractName.endsWith(CONTRACT_EXTENSION)) {
    return `${TEST_CONTRACT_FOLDER}/${subfolder}/${contractName}`;
  }

  return `${TEST_CONTRACT_FOLDER}/${subfolder}/${contractName}.clar`;
}
