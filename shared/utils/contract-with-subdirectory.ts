import { CONTRACT_EXTENSION, CONTRACT_FOLDER } from "../constants";

export function contractWithSubDirectory(contractName: string) {
  if (contractName.endsWith(CONTRACT_EXTENSION)) {
    return `${CONTRACT_FOLDER}/${contractName}`;
  }

  return `${CONTRACT_FOLDER}/${contractName}.clar`;
}
