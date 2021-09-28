import { Transaction } from "lib-shared";
import { AuthOptions } from "micro-stacks/connect";
import { StacksNetworkConfiguration } from "taral-configuration";

export interface SimpleStacksWebTransaction<Ok, Err> extends Transaction<Ok, Err> {
    payload: TxPayload;
}

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

export interface SimpleStacksContractCallPayload extends Omit<TxPayload, 'privateKey'> {
    publicKey: string;
    txType: 'contract_call';
    postConditions?: string[];
}
