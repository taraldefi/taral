import { Configuration, SmartContractsApi } from '@stacks/blockchain-api-client';
import { BufferReader, ClarityAbiVariable, ClarityType, deserializeCV, deserializeTransaction, PostCondition, responseOkCV, serializeCV, serializePostCondition } from '@stacks/transactions';
import { ok, err } from 'neverthrow';
import {
    BaseProvider,
    Transaction,
    getContractIdentifier,
    Contracts,
    ContractInstances,
    cvToValue,
    parseToCV,
    WebTransactionReceipt,
    SubmitOptions,
    IProviderRequest,
    ClarityAbiMap,
    TransactionResult,
    WebSignerOptions,
} from 'lib-shared';
import { getPublicKey } from 'noble-secp256k1';
import { TokenSigner } from 'stacks-crypto';
import { StacksNetworkConfiguration } from 'taral-configuration';
import { getTransactionById } from 'lib-stacks';
import { SimpleStacksWebTransaction, TxPayload, SimpleStacksContractCallPayload } from './types';
import { AppDetails, WebConfig } from '../shared';

export class SimpleStacksWebProvider implements BaseProvider {
    apiClient: SmartContractsApi;
    identifier: string;
    stxAddress: string;
    privateKey: string;
    network: StacksNetworkConfiguration;
    appDetails: AppDetails;

    constructor({
        network,
        identifier,
        stxAddress,
        privateKey,
        appDetails,
    }: WebConfig & { identifier: string }) {
        const apiConfig = new Configuration({
            fetchApi: window.fetch.bind(window),
            basePath: network.coreApiUrl,
        });

        const apiClient = new SmartContractsApi(apiConfig);
        this.apiClient = apiClient;
        this.identifier = identifier;
        this.privateKey = privateKey;
        this.stxAddress = stxAddress;
        this.network = network;
        this.appDetails = appDetails;
    }
    callMap(_map: ClarityAbiMap, _key: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    callVariable(_variable: ClarityAbiVariable): Promise<void> {
        throw new Error('Method not implemented.');
    }

    static fromContracts<T extends Contracts<M>, M>(
        contracts: T,
        config: WebConfig
    ): ContractInstances<T, M> {
        const instances = {} as ContractInstances<T, M>;
        for (const k in contracts) {
            const contract = contracts[k];
            const identifier = getContractIdentifier(contract);
            const provider = new this({ ...config, identifier });
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            const instance = contract.contract(provider) as ReturnType<T[typeof k]['contract']>;
            instances[k] = {
                identifier,
                contract: instance,
            };
        }
        return instances;
    }

    async callReadOnly(request: IProviderRequest) {
        const argumentsFormatted = request.arguments.map((arg, index) => {
            const { type } = request.function.args[index];
            const valueCV = parseToCV(arg, type);
            return serializeCV(valueCV).toString('hex');
        });
        const [contractAddress, contractName] = this.identifier.split('.');
        const response = await this.apiClient.callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: request.function.name,
            readOnlyFunctionArgs: {
                sender: request.caller.address,
                arguments: argumentsFormatted,
            },
        });
        if (!response.okay || !response.result) {
            console.log(response);
            throw new Error('Error calling read-only function');
        }
        const resultCV = deserializeCV(Buffer.from(response.result.replace(/^0x/, ''), 'hex'));
        const value = cvToValue(resultCV);
        switch (resultCV.type) {
            case ClarityType.ResponseOk:
                return ok(value);
            case ClarityType.ResponseErr:
                return err(value);
            default:
                return value;
        }
    }

    callPublic(request: IProviderRequest): Transaction<any, any> {
        const argumentsFormatted = request.arguments.map((arg, index) => {
            const { type } = request.function.args[index];
            const valueCV = parseToCV(arg, type);
            return serializeCV(valueCV).toString('hex');
        });
        const [contractAddress, contractName] = this.identifier.split('.');

        return this.makeTx({
            contractAddress,
            contractName,
            functionName: request.function.name,
            functionArgs: argumentsFormatted,
            network: this.network,
            stxAddress: request.caller.address,
            privateKey: request.caller.privateKey,
            appDetails: this.appDetails,
        });
    }

    private makeTx<Ok, Err>(payload: TxPayload): SimpleStacksWebTransaction<Ok, Err> {
        return {
            payload,
            submit: async (options: SubmitOptions): Promise<WebTransactionReceipt<Ok, Err>> => {
                const postConditions = this.serializePostConditions((options as WebSignerOptions).postConditions);
                const token = await this.makeContractCallToken({
                    postConditions,
                    ...payload,
                });

                if (!(window as any).StacksProvider) {
                    throw new Error('Please install the wallet');
                }
                const request = await (window as any).StacksProvider.transactionRequest(token);
                const { txRaw } = request;
                const txBuffer = Buffer.from(txRaw.replace(/^0x/, ''), 'hex');
                const stacksTransaction = deserializeTransaction(new BufferReader(txBuffer));

                const successfulFunctionCallResult = await getTransactionById(
                    stacksTransaction.txid(),
                    this.network
                );

                return {
                    txId: request.txId,
                    stacksTransaction,
                    getResult: () => {
                        const resultCV = deserializeCV(
                            Buffer.from(successfulFunctionCallResult)
                        );

                        const result = cvToValue(resultCV);

                        const transactionResult: TransactionResult<any, any> = {
                            isOk: true,
                            response: responseOkCV(resultCV),
                            value: result,
                            events: [], // leave events empty for now and figure later how to fetch them
                        };

                        return Promise.resolve(transactionResult);
                    },
                };
            },
        };
    }


    private async makeContractCallToken(options: TxPayload & { postConditions?: string[] }) {
        const { functionArgs, privateKey, ...rest } = options;
        const args: string[] = functionArgs.map(arg => {
            if (typeof arg === 'string') {
                return arg;
            }
            return serializeCV(arg).toString('hex');
        });
        // const defaults = getDefaults(signer);
        const publicKey = getPublicKey(privateKey, true);
        const payload: SimpleStacksContractCallPayload = {
            functionArgs: args,
            txType: 'contract_call',
            publicKey,
            ...rest,
        };

        const tokenSigner = new TokenSigner('ES256k', privateKey);
        const token = await tokenSigner.sign(payload as any);
        return token;
    }

    private serializePostConditions(postConditions?: PostCondition[]): string[] {
        let pcSerialized: string[] = [];
        if (postConditions && typeof postConditions[0] !== 'string') {
            pcSerialized = postConditions.map(pc => serializePostCondition(pc).toString('hex'));
        }
        return pcSerialized;
    }

}
