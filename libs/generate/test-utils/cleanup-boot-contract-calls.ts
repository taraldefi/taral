import * as fileSystem from "fs";

const TESTNET_BOOT_CONTRACT = "ST000000000000000000002AMW42H";

export function cleanupBootContractsCalls(path: string): string {
  const tmpContractFilePath = path.replace(".clar", ".tmp");

  const data = fileSystem.readFileSync(path, "utf8");

  const regexExpression = new RegExp(`'${TESTNET_BOOT_CONTRACT}`, "g");

  const result: string = data.replace(regexExpression, "");

  const dos2UnixContent: string = replaceAll(result, "\r\n", "\n");

  fileSystem.writeFileSync(tmpContractFilePath, dos2UnixContent, "utf8");

  return tmpContractFilePath;
}

export function cleanupTmpContractFile(path: string) {
  fileSystem.unlinkSync(path);
}

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, "g"), replace);
}
