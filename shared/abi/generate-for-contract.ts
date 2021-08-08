import { NativeClarityBinProvider } from "@blockstack/clarity";
import { mkdir, writeFile } from "fs/promises";
import { normalize, relative, resolve } from "path";
import {
  generateIndexFile,
  generateInterface,
  generateInterfaceFile,
  generateTypesFile,
} from ".";
import { getContractNameFromPath } from "../utils";

export async function generateFilesForContract({
  contractFile: _contractFile,
  outputFolder,
  subFolder,
  provider,
  contractAddress,
}: {
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

  const abi = await generateInterface({
    contractFile,
    provider,
    contractAddress,
  });

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
