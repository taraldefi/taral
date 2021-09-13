export function unchanged(codeBody: string) {
  return codeBody;
}

export interface IMetadata {
  discriminator: "metadata";
  sender: string;
  address: string;
}

export class Metadata implements IMetadata {
  discriminator: "metadata";
  sender: string;
  address: string;

  public constructor(sender: string, address: string) {
    this.sender = sender;
    this.discriminator = "metadata";
    this.address = address;
  }
}

export const NO_METADATA: IMetadata = new Metadata("", "");

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
