import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoDaoContract {
  burnToken: (token: string, amount: number, recipient: string) => Transaction<boolean, number>;
  mintToken: (token: string, amount: number, recipient: string) => Transaction<boolean, number>;
  requestDikoTokens: (collateralAmount: number) => Transaction<boolean, number>;
  setContractAddress: (name: string, address: string, qualifiedName: string, canMint: boolean, canBurn: boolean) => Transaction<boolean, number>;
  setDaoOwner: (address: string) => Transaction<boolean, number>;
  setGuardianAddress: (address: string) => Transaction<boolean, number>;
  setPayoutAddress: (address: string) => Transaction<boolean, number>;
  toggleEmergencyShutdown: () => Transaction<boolean, number>;
  getContractAddressByName: (name: string) => Promise<string | null>;
  getContractCanBurnByQualifiedName: (qualifiedName: string) => Promise<boolean>;
  getContractCanMintByQualifiedName: (qualifiedName: string) => Promise<boolean>;
  getDaoOwner: () => Promise<string>;
  getEmergencyShutdownActivated: () => Promise<ClarityTypes.Response<boolean, null>>;
  getGuardianAddress: () => Promise<string>;
  getPayoutAddress: () => Promise<string>;
  getQualifiedNameByName: (name: string) => Promise<string | null>;
  ERRNOTAUTHORIZED: () => Promise<number>;
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
