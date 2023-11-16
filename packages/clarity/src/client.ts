// @ts-ignore Suppressing "The import path cannot end with a '.ts' extension"
import { Account, Chain, ReadOnlyFn } from "./dependencies.ts";

export class Client {
  contractName: string;
  chain: Chain;
  deployer: Account;

  constructor(contractName: string, chain: Chain, deployer: Account) {
    this.contractName = contractName;
    this.chain = chain;
    this.deployer = deployer;
  }

  callReadOnlyFn(
    method: string,
    args: Array<any> = [],
    sender: Account = this.deployer,
  ): ReadOnlyFn {
    const result = this.chain.callReadOnlyFn(
      this.contractName,
      method,
      args,
      sender?.address,
    );

    return result;
  }

  public getContractAddress(): string {
    return `${this.deployer.address}.${this.contractName}`;
  }
}
