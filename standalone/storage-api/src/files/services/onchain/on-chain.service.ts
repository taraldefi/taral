import { Injectable, NotFoundException, Scope } from '@nestjs/common';

import {
    canRead,
    canWrite,
    getFileHash,
    grantAccessToFile,
    IStorageFileReadInterrogation,
    IStorageFileRegister,
    IStorageFileUpdate,
    IStorageFileWriteInterrogation,
    registerFile,
    revokeAccessFromFile,
    updateAccessToFile,
    updateFile,
} from '@libs/storage';
import { ConfigService } from '@nestjs/config';
import { nodeTaralContracts, TaralOracleV1Contract, TaralStorageContract } from "taral-contracts";
import { ApiProvider } from "lib-testing";
import { StacksMainnet, StacksNetwork, StacksTestnet } from '@stacks/network';
import { ClarinetAccount, NodeContractInstance } from 'lib-shared';



@Injectable({
    scope: Scope.DEFAULT
})
export class OnChainService {

    private readonly Testnet: StacksNetwork = new StacksTestnet({
        url: "http://localhost:3999",
    });

    private readonly Mainnet: StacksNetwork = new StacksMainnet();

    private storageContract: NodeContractInstance<(account: ClarinetAccount) => TaralStorageContract>;

    private storageContractCreated: boolean;

    constructor(private configService: ConfigService) {

    }

    public async canRead(fileId: number, participantAddress: string): Promise<boolean> {
        if (this.mock()) {
            return true;
        }

        return this.checkCanRead(fileId, participantAddress);
    }

    public async canWrite(fileId: number, participantAddress: string): Promise<boolean> {
        if (this.mock()) {
            return true;
        }

        return this.checkCanWrite(fileId, participantAddress);
    }

    private async checkCanRead(fileId: number, participantAddress: string): Promise<boolean> {
        const privateKey = this.configService.get('onchain.deployerprivatekey') as string;
        const address = this.configService.get('onchain.deployeraddress') as string;

        const payload: IStorageFileReadInterrogation = {
            contract: this.storageContract.contract({
                address: address,
                privateKey: privateKey,
                mnemonic: '',
                balance: 0n
            }),
            fileId: BigInt(fileId),
            participant: participantAddress
        };

        const canReadFile = await canRead(payload);
        return canReadFile;
    }

    private async checkCanWrite(fileId: number, participantAddress: string): Promise<boolean> {
        const privateKey = this.configService.get('onchain.deployerprivatekey') as string;
        const address = this.configService.get('onchain.deployeraddress') as string;

        const payload: IStorageFileWriteInterrogation = {
            contract: this.storageContract.contract({
                address: address,
                privateKey: privateKey,
                mnemonic: '',
                balance: 0n
            }),
            fileId: BigInt(fileId),
            participant: participantAddress
        };

        const canWriteFile = await canWrite(payload);
        return canWriteFile;
    }

    private mock(): boolean {
        return this.configService.get('onchain.mock') as boolean;
    }

    private async getStorageContract(): Promise<NodeContractInstance<(account: ClarinetAccount) => TaralStorageContract>> {
        if (this.storageContractCreated) {
            return this.storageContract;
        }

        this.storageContract = await this.produceContract();
        this.storageContractCreated = true;

        return this.storageContract;
    } 

    private async produceContract(): Promise<NodeContractInstance<(account: ClarinetAccount) => TaralStorageContract>> {
        const network = this.configService.get('onchain.network');

        let onChainNetwork: StacksNetwork;

        switch (network) {
            case 'testnet':
                onChainNetwork = this.Testnet;
                break;
            case 'mainnet':
                onChainNetwork = this.Mainnet;
                break;
            default:
                throw new NotFoundException(
                    "Invalid on-chain network configuration"
                );
        }

        const privateKey = this.configService.get('onchain.deployerprivatekey') as string;
        const address = this.configService.get('onchain.deployeraddress') as string;

        const contracts = await ApiProvider.fromContracts(
            false,
            nodeTaralContracts,
            onChainNetwork,
            {
                secretKey: privateKey,
                stacksAddress: address,
            }
        );

        const result = contracts.nodeTaralStorage;
        return result;
    }
}