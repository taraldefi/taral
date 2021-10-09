import { NativeClarityBinProvider } from "lib-clarity-bin";
import { StacksNetworkConfiguration } from "taral-configuration";
import { NodeContract } from "./contracts";
import type { DeployerAccount } from "./providers";
import { ResultAssets } from "./transaction";

export interface EvalOk {
  success: true;
  costs: {
    [key: string]: any;
    runtime: number;
  };
  output_serialized: string;
}

export interface EvalErr {
  success: false;
  error: string;
}

export type EvalResult = EvalOk | EvalErr;

export interface ExecuteOk {
  success: true;
  message: string;
  events: any[];
  output_serialized: string;
  costs: {
    [key: string]: any;
    runtime: number;
  };
  assets: ResultAssets;
  // todo: logs
}

export interface ExecuteErr {
  message: string;
  error: any;
  output_serialized: string;
  costs: {
    [key: string]: any;
    runtime: number;
  };
  assets: ResultAssets;
  success: false;
}

export type ExecuteResult = ExecuteOk | ExecuteErr;

export interface UtilsContract {
  getBlockHeight: Promise<number>;
}