import { Transaction } from "lib-shared";
import { AuthOptions, ContractCallOptions } from "micro-stacks/connect";
import { StacksNetworkConfiguration } from "taral-configuration";

export interface WebTransaction<Ok, Err> extends Transaction<Ok, Err> {
    payload: TxPayload;
}

export interface WebTransaction2<Ok, Err> extends Transaction<Ok, Err> {
    payload: ContractCallOptions;
}

export type AppDetails = {
    name: string;
    icon: string;
};

export interface TxPayload {
    contractAddress: string;
    contractName: string;
    functionName: string;
    functionArgs: string[];
    network: StacksNetworkConfiguration;
    privateKey: string;
    stxAddress: string;
    appDetails: AuthOptions['appDetails'];
}

export interface ContractCallPayload extends Omit<TxPayload, 'privateKey'> {
    publicKey: string;
    txType: 'contract_call';
    postConditions?: string[];
}

export interface WebConfig {
    stxAddress: string;
    privateKey: string;
    network: StacksNetworkConfiguration;
    appDetails: AppDetails;
}
