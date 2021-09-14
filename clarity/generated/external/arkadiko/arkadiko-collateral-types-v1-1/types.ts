import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoCollateralTypesV11Contract {
  addCollateralType: (token: string, name: string, url: string, collateralType: string, tokenAddress: string, liquidationRatio: number, liquidationPenalty: number, stabilityFee: number, stabilityFeeDecimals: number, stabilityFeeApy: number, maximumDebt: number, collateralToDebtRatio: number) => Transaction<boolean, number>;
  addDebtToCollateralType: (token: string, debt: number) => Transaction<number, number>;
  changeRiskParameters: (collateralType: string, changes: {
    "key": string;
  "new-value": number
      }[]) => Transaction<boolean, number>;
  subtractDebtFromCollateralType: (token: string, debt: number) => Transaction<number, number>;
  getCollateralToDebtRatio: (token: string) => Promise<ClarityTypes.Response<number, null>>;
  getCollateralTypeByName: (name: string) => Promise<ClarityTypes.Response<{
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
  getLiquidationPenalty: (token: string) => Promise<ClarityTypes.Response<number, null>>;
  getLiquidationRatio: (token: string) => Promise<ClarityTypes.Response<number, null>>;
  getMaximumDebt: (token: string) => Promise<ClarityTypes.Response<number, null>>;
  getStabilityFee: (token: string) => Promise<ClarityTypes.Response<number, null>>;
  getStabilityFeeApy: (token: string) => Promise<ClarityTypes.Response<number, null>>;
  getStabilityFeeDecimals: (token: string) => Promise<ClarityTypes.Response<number, null>>;
  getTokenAddress: (token: string) => Promise<ClarityTypes.Response<string, null>>;
  getTotalDebt: (token: string) => Promise<ClarityTypes.Response<number, null>>;
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
