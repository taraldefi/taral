import { ClarityTypes } from "../../../../lib/clarity/types";
import { Transaction } from "../../../../lib/transaction";

export interface ArkadikoCollateralTypesV11Contract {
  addCollateralType: (
    token: string,
    name: string,
    url: string,
    collateralType: string,
    tokenAddress: string,
    liquidationRatio: number | bigint,
    liquidationPenalty: number | bigint,
    stabilityFee: number | bigint,
    stabilityFeeDecimals: number | bigint,
    stabilityFeeApy: number | bigint,
    maximumDebt: number | bigint,
    collateralToDebtRatio: number | bigint
  ) => Transaction<boolean, bigint>;
  addDebtToCollateralType: (
    token: string,
    debt: number | bigint
  ) => Transaction<bigint, bigint>;
  changeRiskParameters: (
    collateralType: string,
    changes: {
      key: string;
      "new-value": bigint;
    }[]
  ) => Transaction<boolean, bigint>;
  subtractDebtFromCollateralType: (
    token: string,
    debt: number | bigint
  ) => Transaction<bigint, bigint>;
  getCollateralToDebtRatio: (
    token: string
  ) => Promise<ClarityTypes.Response<bigint, null>>;
  getCollateralTypeByName: (name: string) => Promise<
    ClarityTypes.Response<
      {
        "collateral-to-debt-ratio": bigint;
        "liquidation-penalty": bigint;
        "liquidation-ratio": bigint;
        "maximum-debt": bigint;
        name: string;
        "stability-fee": bigint;
        "stability-fee-apy": bigint;
        "stability-fee-decimals": bigint;
        token: string;
        "token-address": string;
        "token-type": string;
        "total-debt": bigint;
        url: string;
      },
      null
    >
  >;
  getLiquidationPenalty: (
    token: string
  ) => Promise<ClarityTypes.Response<bigint, null>>;
  getLiquidationRatio: (
    token: string
  ) => Promise<ClarityTypes.Response<bigint, null>>;
  getMaximumDebt: (
    token: string
  ) => Promise<ClarityTypes.Response<bigint, null>>;
  getStabilityFee: (
    token: string
  ) => Promise<ClarityTypes.Response<bigint, null>>;
  getStabilityFeeApy: (
    token: string
  ) => Promise<ClarityTypes.Response<bigint, null>>;
  getStabilityFeeDecimals: (
    token: string
  ) => Promise<ClarityTypes.Response<bigint, null>>;
  getTokenAddress: (
    token: string
  ) => Promise<ClarityTypes.Response<string, null>>;
  getTotalDebt: (token: string) => Promise<ClarityTypes.Response<bigint, null>>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  OWNER: () => Promise<string>;
  collateralTypes: (key: { name: string }) => Promise<{
    "collateral-to-debt-ratio": bigint;
    "liquidation-penalty": bigint;
    "liquidation-ratio": bigint;
    "maximum-debt": bigint;
    name: string;
    "stability-fee": bigint;
    "stability-fee-apy": bigint;
    "stability-fee-decimals": bigint;
    token: string;
    "token-address": string;
    "token-type": string;
    "total-debt": bigint;
    url: string;
  } | null>;
}
