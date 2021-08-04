import { NativeClarityBinProvider } from "@blockstack/clarity";
import { ClarityAbi } from "../clarity";
import { getContractNameFromPath } from "../utils";

export async function generateInterface({
  provider,
  contractFile,
  contractAddress = "S1G2081040G2081040G2081040G208105NK8PE5",
}: {
  contractFile: string;
  provider: NativeClarityBinProvider;
  contractAddress?: string;
}): Promise<ClarityAbi> {
  let contractName = getContractNameFromPath(contractFile);
  const receipt = await provider.runCommand([
    "launch",
    `${contractAddress}.${contractName}`,
    contractFile,
    provider.dbFilePath,
    "--output_analysis",
    "--costs",
    "--assets",
  ]);
  if (receipt.stderr) {
    throw new Error(`Error on ${contractFile}:
    ${receipt.stderr}
      `);
  }

  const output = JSON.parse(receipt.stdout);
  if (output.error) {
    const { initialization } = output.error;
    if (initialization?.includes("\nNear:\n")) {
      const [error, trace] = initialization.split("\nNear:\n");
      let startLine = "";
      const matcher = /start_line: (\d+),/;
      const matches = matcher.exec(trace);
      if (matches) startLine = matches[1];
      throw new Error(`Error on ${contractFile}:
      ${error}
      ${startLine ? `Near line ${startLine}` : ""}
      Raw trace:
      ${trace}
        `);
    }
    throw new Error(`Error on ${contractFile}:
    ${JSON.stringify(output.error, null, 2)}
      `);
  }
  const abi = output.analysis;
  return abi;
}
