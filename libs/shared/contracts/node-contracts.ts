import { ClarinetAccount } from "..";
import { BaseNodeProvider } from "../providers";
import { BaseContract } from "./types";

export type NodeContractBuilder<T> = (
  provider: BaseNodeProvider
) => (account: ClarinetAccount) => T;

export interface NodeContract<T> extends BaseContract {
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
