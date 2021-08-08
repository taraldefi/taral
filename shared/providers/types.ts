export function unchanged(codeBody: string) {
  return codeBody;
}

export interface IMetadata {
  discriminator: "metadata";
  sender: string;
}

export class Metadata implements IMetadata {
  discriminator: "metadata";
  sender: string;

  public constructor(sender: string) {
    this.sender = sender;
    this.discriminator = "metadata";
  }
}

export const NO_METADATA: IMetadata = new Metadata("");

export function instanceOfMetadata(object: any): object is IMetadata {
  return object != null && object.discriminator === "metadata";
}

export interface IFunctionParameteers {
  args: string[];
  metadata: IMetadata;
}

export interface DeployerAccount {
  secretKey: string;
  stacksAddress: string;
}
