import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
} from "../../generated/taral";
import { ClarinetAccounts } from "../configuration";
import { IMetadata } from "../providers";

export interface BaseRequest {
  accounts: ClarinetAccounts;
}

export interface ClarityBitcoinRequest extends BaseRequest {
  contract: ClarityBitcoinContract;
}

export interface FtSwapRequest extends BaseRequest {
  contract: BtcFtSwapContract;
}

export interface NftSwapRequest extends BaseRequest {
  contract: BtcNftSwapContract;
}

export function getPrivateKey(request: BaseRequest): string {
  var deployer = request.accounts.deployer;

  return deployer.privateKey;
}

export function getAddress(request: BaseRequest): string {
  var deployer = request.accounts.deployer;

  return deployer.address;
}

export function getMetadata(request: BaseRequest): IMetadata {
  return {
    discriminator: "metadata",
    sender: getPrivateKey(request),
    address: getAddress(request),
  };
}
