import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';
import { Transaction } from '../../../../shared/transaction';

// prettier-ignore

export interface ArkadikoDaoContract {
    burnToken: (token: string, amount: number, recipient: string, metadata: IMetadata) => Transaction<boolean, number>;
    mintToken: (token: string, amount: number, recipient: string, metadata: IMetadata) => Transaction<boolean, number>;
    requestDikoTokens: (collateralAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
    setContractAddress: (name: string, address: string, qualifiedName: string, canMint: boolean, canBurn: boolean, metadata: IMetadata) => Transaction<boolean, number>;
    setDaoOwner: (address: string, metadata: IMetadata) => Transaction<boolean, ClarityTypes.Response<null, number>>;
    setGuardianAddress: (address: string, metadata: IMetadata) => Transaction<boolean, ClarityTypes.Response<null, number>>;
    setPayoutAddress: (address: string, metadata: IMetadata) => Transaction<boolean, ClarityTypes.Response<null, number>>;
    toggleEmergencyShutdown: (metadata: IMetadata) => Transaction<boolean, ClarityTypes.Response<null, number>>;
    getContractAddressByName: (name: string, metadata: IMetadata) => Promise<string | null>;
    getContractCanBurnByQualifiedName: (qualifiedName: string, metadata: IMetadata) => Promise<boolean>;
    getContractCanMintByQualifiedName: (qualifiedName: string, metadata: IMetadata) => Promise<boolean>;
    getDaoOwner: (metadata: IMetadata) => Promise<string>;
    getEmergencyShutdownActivated: (metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, null>>;
    getGuardianAddress: (metadata: IMetadata) => Promise<string>;
    getPayoutAddress: (metadata: IMetadata) => Promise<string>;
    getQualifiedNameByName: (name: string, metadata: IMetadata) => Promise<string | null>;
    ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, number>>;
    daoOwner: () => Promise<string>;
    emergencyShutdownActivated: () => Promise<boolean>;
    guardian: () => Promise<string>;
    payoutAddress: () => Promise<string>;
    contracts: (key: {
        "name": string
    }) => Promise<{
        "address": string;
        "qualified-name": string
    } | null>;
    contractsData: (key: {
        "qualified-name": string
    }) => Promise<{
        "can-burn": boolean;
        "can-mint": boolean
    } | null>;
}
