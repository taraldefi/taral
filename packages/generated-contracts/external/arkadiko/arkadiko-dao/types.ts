
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface ArkadikoDaoContract {
      burnToken: (token: string, amount: number | bigint, recipient: string) => Transaction<boolean, bigint>;
  mintToken: (token: string, amount: number | bigint, recipient: string) => Transaction<boolean, bigint>;
  requestDikoTokens: (collateralAmount: number | bigint) => Transaction<boolean, bigint>;
  setContractAddress: (name: string, address: string, qualifiedName: string, canMint: boolean, canBurn: boolean) => Transaction<boolean, bigint>;
  setDaoOwner: (address: string) => Transaction<boolean, bigint>;
  setGuardianAddress: (address: string) => Transaction<boolean, bigint>;
  setPayoutAddress: (address: string) => Transaction<boolean, bigint>;
  toggleEmergencyShutdown: () => Transaction<boolean, bigint>;
  getContractAddressByName: (name: string) => Promise<string | null>;
  getContractCanBurnByQualifiedName: (qualifiedName: string) => Promise<boolean>;
  getContractCanMintByQualifiedName: (qualifiedName: string) => Promise<boolean>;
  getDaoOwner: () => Promise<string>;
  getEmergencyShutdownActivated: () => Promise<ClarityTypes.Response<boolean, null>>;
  getGuardianAddress: () => Promise<string>;
  getPayoutAddress: () => Promise<string>;
  getQualifiedNameByName: (name: string) => Promise<string | null>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
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