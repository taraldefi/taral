import { NativeClarityBinProvider } from "lib-clarity-bin";
import { ExecuteResult, Logger } from "lib-shared";

export const executeJson = async ({
  contractAddress,
  senderAddress,
  functionName,
  provider,
  args = [],
}: {
  contractAddress: string;
  senderAddress: string;
  provider: NativeClarityBinProvider;
  functionName: string;
  args?: string[];
}) => {
  const result = await provider.runCommand([
    "execute",
    "--costs",
    "--assets",
    provider.dbFilePath,
    contractAddress,
    functionName,
    senderAddress,
    ...args,
  ]);
  const response: ExecuteResult = JSON.parse(result.stdout);

  if (result.stderr) {
    Logger.error("execute-json", result.stderr);
  }

  if (response && "error" in response) {
    throw new Error(
      `Transaction error: ${JSON.stringify(response.error, null, 2)}`
    );
  }
  if (result.exitCode !== 0) {
    throw new Error(`Execution error: ${result.stderr}`);
  }
  return response;
};
