import { BaseContract, BaseWebProvider, Noop } from "..";

export type WebContractBuilder<T> = (
  provider: BaseWebProvider
) => (onFinish?: Noop, onCancel?: Noop) => T;

export interface WebContract<T> extends BaseContract {
  contract: WebContractBuilder<T>;
}

export interface WebContracts<T> {
  [key: string]: WebContract<T>;
}

export interface WebContractInstance<T> {
  identifier: string;
  contract: T;
}

export type WebContractInstances<T extends WebContracts<M>, M> = {
  [Name in keyof T]: WebContractInstance<ReturnType<T[Name]["contract"]>>;
};
