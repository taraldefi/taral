import { TaralStorageContract } from "taral-contracts";

export interface IStorageFileRegister {
  fileBuffer: Buffer;

  fileName: string;

  privateKey: string;

  contract: TaralStorageContract;
}
