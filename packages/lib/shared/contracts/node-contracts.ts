import { ClarinetAccount } from "../configuration";
import { BaseNodeProvider } from "../providers";

export type NodeContractBuilder<T> = (
    provider: BaseNodeProvider
  ) => (account: ClarinetAccount) => T;
  
  export interface NodeContract<T> {
    address: string;
    contractFile: string;
    contract: NodeContractBuilder<T>;
  }
  
  export interface NodeContracts<T> {
    [key: string]: NodeContract<T>;
  }
  
  export interface NodeContractInstance<T> {
    identifier: string;
    contract: T;
  }
  
  export type NodeContractInstances<T extends NodeContracts<M>, M> = {
    [Name in keyof T]: NodeContractInstance<ReturnType<T[Name]["contract"]>>;
  };