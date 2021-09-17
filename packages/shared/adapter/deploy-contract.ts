import { NativeClarityBinProvider } from "../native-cli/native-provider";

export async function deployContract(
  contractIdentifier: string,
  tmpContractFilePath: string,
  provider: NativeClarityBinProvider
) {
  const receipt = await provider.runCommand([
    "launch",
    contractIdentifier,
    tmpContractFilePath,
    provider.dbFilePath,
    "--costs",
    "--assets",
  ]);
  if (receipt.stderr) {
    throw new Error(`Error on ${tmpContractFilePath}:
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
      throw new Error(`Error on ${tmpContractFilePath}:
    ${error}
    ${startLine ? `Near line ${startLine}` : ""}
    Raw trace:
    ${trace}
      `);
    }
    throw new Error(`Error on ${tmpContractFilePath}:
  ${JSON.stringify(output.error, null, 2)}
    `);
  }
}
