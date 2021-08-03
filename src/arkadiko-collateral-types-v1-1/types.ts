import { Transaction } from '../../shared/transaction';
import { ClarityTypes } from '../../shared/clarity/types';
import { IMetadata } from '../../shared/providers/types';

// prettier-ignore

export interface ArkadikoCollateralTypesV11Contract {
  addCollateralType: (token: string, name: string, url: string, collateralType: string, tokenAddress: string, liquidationRatio: number, liquidationPenalty: number, stabilityFee: number, stabilityFeeDecimals: number, stabilityFeeApy: number, maximumDebt: number, collateralToDebtRatio: number, metadata: IMetadata) => Transaction<boolean, number>;
  addDebtToCollateralType: (token: string, debt: number, metadata: IMetadata) => Transaction<number, number>;
  changeRiskParameters: (collateralType: string, changes: {
    "key": string;
  "new-value": number
      }[], metadata: IMetadata) => Transaction<boolean, number>;
  subtractDebtFromCollateralType: (token: string, debt: number, metadata: IMetadata) => Transaction<number, number>;
  getCollateralToDebtRatio: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getCollateralTypeByName: (name: string, metadata: IMetadata) => Promise<ClarityTypes.Response<{
    "collateral-to-debt-ratio": number;
  "liquidation-penalty": number;
  "liquidation-ratio": number;
  "maximum-debt": number;
  "name": string;
  "stability-fee": number;
  "stability-fee-apy": number;
  "stability-fee-decimals": number;
  "token": string;
  "token-address": string;
  "token-type": string;
  "total-debt": number;
  "url": string
      }, null>>;
  getLiquidationPenalty: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getLiquidationRatio: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getMaximumDebt: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStabilityFee: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStabilityFeeApy: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStabilityFeeDecimals: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getTokenAddress: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
  getTotalDebt: (token: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  OWNER: () => Promise<string>;
  collateralTypes: (key: {
    "name": string
      }) => Promise<{
    "collateral-to-debt-ratio": number;
  "liquidation-penalty": number;
  "liquidation-ratio": number;
  "maximum-debt": number;
  "name": string;
  "stability-fee": number;
  "stability-fee-apy": number;
  "stability-fee-decimals": number;
  "token": string;
  "token-address": string;
  "token-type": string;
  "total-debt": number;
  "url": string
      } | null>;
}
