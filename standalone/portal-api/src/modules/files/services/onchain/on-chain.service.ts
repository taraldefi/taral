import { Injectable, NotFoundException, Scope } from '@nestjs/common';

import {
  canRead,
  canWrite,
  IStorageFileReadInterrogation,
  IStorageFileWriteInterrogation,
} from '@libs/storage';
import { ConfigService } from '@nestjs/config';
import { nodeTaralContracts, StorageServiceContract } from 'taral-contracts';
import { ApiProvider } from 'lib-api';
import { StacksMainnet, StacksNetwork, StacksTestnet } from '@stacks/network';
import { ClarinetAccount, NodeContractInstance } from 'lib-shared';
import { Configuration } from '../../../../configuration';

@Injectable({
  scope: Scope.DEFAULT,
})
export class OnChainService {
  private readonly Testnet: StacksNetwork = new StacksTestnet({
    url: 'http://localhost:3999',
  });

  private readonly Mainnet: StacksNetwork = new StacksMainnet();

  private storageContract: NodeContractInstance<
    (account: ClarinetAccount) => StorageServiceContract
  >;

  private storageContractCreated: boolean;

  constructor(private configService: ConfigService) {}

  public async canRead(
    fileId: string,
    participantAddress: string,
  ): Promise<boolean> {
    if (this.mock()) {
      return true;
    }

    return this.checkCanRead(fileId, participantAddress);
  }

  public async canWrite(
    fileId: string,
    participantAddress: string,
  ): Promise<boolean> {
    if (this.mock()) {
      return true;
    }

    return this.checkCanWrite(fileId, participantAddress);
  }

  private async checkCanRead(
    fileId: string,
    participantAddress: string,
  ): Promise<boolean> {
    const privateKey = Configuration.onchain.privateKey;
    const address = Configuration.onchain.address;

    const storageContract = await this.getStorageContract();

    const payload: IStorageFileReadInterrogation = {
      contract: storageContract.contract({
        address: address,
        privateKey: privateKey,
        mnemonic: '',
        balance: 0n,
      }),
      fileId: fileId,
      participant: participantAddress,
    };

    const canReadFile = await canRead(payload);
    return canReadFile;
  }

  private async checkCanWrite(
    fileId: string,
    participantAddress: string,
  ): Promise<boolean> {
    const privateKey = Configuration.onchain.privateKey;
    const address = Configuration.onchain.address;

    const storageContract = await this.getStorageContract();

    const payload: IStorageFileWriteInterrogation = {
      contract: storageContract.contract({
        address: address,
        privateKey: privateKey,
        mnemonic: '',
        balance: 0n,
      }),
      fileId,
      participant: participantAddress,
    };

    const canWriteFile = await canWrite(payload);
    return canWriteFile;
  }

  private mock(): boolean {
    return Configuration.onchain.mock;
  }

  private async getStorageContract(): Promise<
    NodeContractInstance<(account: ClarinetAccount) => StorageServiceContract>
  > {
    if (this.storageContractCreated) {
      return this.storageContract;
    }

    this.storageContract = await this.produceContract();
    this.storageContractCreated = true;

    return this.storageContract;
  }

  private async produceContract(): Promise<
    NodeContractInstance<(account: ClarinetAccount) => StorageServiceContract>
  > {
    const network = Configuration.onchain.network;

    let onChainNetwork: StacksNetwork;

    switch (network) {
      case 'testnet':
        onChainNetwork = this.Testnet;
        break;
      case 'mainnet':
        onChainNetwork = this.Mainnet;
        break;
      default:
        throw new NotFoundException('Invalid on-chain network configuration');
    }

    const privateKey = Configuration.onchain.privateKey;
    const address = Configuration.onchain.address;

    const contracts = await ApiProvider.fromContracts(
      false,
      nodeTaralContracts,
      onChainNetwork,
      {
        secretKey: privateKey,
        stacksAddress: address,
      },
    );

    const result = contracts.nodeStorageService;
    return result;
  }
}
