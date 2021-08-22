import { NativeClarityBinProvider } from "@blockstack/clarity";
import * as fileSystem from "fs";
import { mkdir, writeFile } from "fs/promises";
import { normalize, relative, resolve } from "path";
import {
  generateIndexFile,
  generateInterface,
  generateInterfaceFile,
  generateTypesFile,
} from ".";
import { getContractNameFromPath } from "../utils";

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, "g"), replace);
}

export async function generateFilesForContract({
  generate,
  contractFile: _contractFile,
  outputFolder,
  subFolder,
  provider,
  contractAddress,
}: {
  generate: boolean;
  contractFile: string;
  outputFolder: string;
  subFolder: string;
  provider: NativeClarityBinProvider;
  contractAddress?: string;
}) {
  const currentPath = process.cwd();
  var normalizedPath = normalize(currentPath).replace(/\\/g, "/");
  const contractFile = resolve(normalizedPath, _contractFile).replace(
    /\\/g,
    "/"
  );

  const contractName = getContractNameFromPath(contractFile);

  const tmpContractFilePath = resolve(
    normalizedPath,
    _contractFile.replace(".clar", ".tmp")
  ).replace(/\\/g, "/");

  let data = fileSystem.readFileSync(contractFile, "utf8");

  var regexExpression = new RegExp("ST000000000000000000002AMW42H", "g");

  var result: string = data.replace(regexExpression, contractAddress ?? "");

  let dos2UnixContent: string = replaceAll(result, "\r\n", "\n");

  fileSystem.writeFileSync(tmpContractFilePath, dos2UnixContent, "utf8");

  const abi = await generateInterface({
    contractFile: tmpContractFilePath,
    provider,
    contractAddress,
  });

  fileSystem.unlinkSync(tmpContractFilePath);

  console.log(`handled ${contractName}`);

  // We do not generate boot contracts
  //
  if (!generate) {
    return;
  }

  const typesFile = generateTypesFile(abi, contractName, subFolder);
  if (!contractAddress && process.env.NODE_ENV !== "test") {
    console.warn("Please provide an address with every contract.");
  }

  const indexFile = generateIndexFile({
    contractFile: relative(process.cwd(), contractFile).replace(/\\/g, "/"),
    address: contractAddress || "",
    subFolder: subFolder,
  });

  const abiFile = generateInterfaceFile({ contractFile, abi, subFolder });

  const outputPath = resolve(`${outputFolder}/${subFolder}`, ".", contractName);
  await mkdir(outputPath, { recursive: true });

  await writeFile(resolve(outputPath, "abi.ts"), abiFile);
  await writeFile(resolve(outputPath, "index.ts"), indexFile);
  await writeFile(resolve(outputPath, "types.ts"), typesFile);
}
