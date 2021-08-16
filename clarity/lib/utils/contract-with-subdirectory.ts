import { CONTRACT_EXTENSION, CONTRACT_FOLDER } from "../constants";

export function contractWithSubDirectory(
  contractName: string,
  subfolder: string
) {
  if (contractName.endsWith(CONTRACT_EXTENSION)) {
    return `${CONTRACT_FOLDER}/${subfolder}/${contractName}`;
  }

  return `${CONTRACT_FOLDER}/${subfolder}/${contractName}.clar`;
}
