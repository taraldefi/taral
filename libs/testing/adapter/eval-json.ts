import { NativeClarityBinProvider } from "lib-clarity-bin";

export async function evalJson({
  contractAddress,
  functionName,
  provider,
  args = [],
}: {
  contractAddress: string;
  functionName: string;
  provider: NativeClarityBinProvider;
  args?: string[];
}) {
  const evalCode = `(${functionName} ${args.join(" ")})`;
  return evalWithCode({
    evalCode,
    provider,
    contractAddress,
  });
}

export const evalWithCode = async ({
  evalCode,
  provider,
  contractAddress,
}: {
  evalCode: string;
  provider: NativeClarityBinProvider;
  contractAddress: string;
}) => {
  const receipt = await provider.runCommand(
    ["eval_at_chaintip", "--costs", contractAddress, provider.dbFilePath],
    {
      stdin: evalCode,
    }
  );
  const response = JSON.parse(receipt.stdout);
  if (receipt.stderr) {
    console.log(receipt.stderr);
  }
  if (!response.success) {
    throw new Error(JSON.stringify(response.error, null, 2));
  }
  return response;
};
