export function unchanged(codeBody: string) {
  return codeBody;
}

export interface IFunctionParameteers {
  args: string[];
}

export interface DeployerAccount {
  secretKey: string;
  stacksAddress: string;
}
