import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoVaultDataV11Contract {
  closeVault: (vaultId: number) => Transaction<boolean, number>;
  setLastVaultId: (vaultId: number) => Transaction<boolean, number>;
  setStackerPayout: (vaultId: number, lotIndex: number, collateralAmount: number, recipient: string) => Transaction<boolean, number>;
  updateVault: (vaultId: number, data: {
    "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": number;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": number;
  "debt": number;
  "id": number;
  "is-liquidated": boolean;
  "leftover-collateral": number;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": number;
  "stability-fee-last-accrued": number;
  "stacked-tokens": number;
  "stacker-name": string;
  "updated-at-block-height": number
      }) => Transaction<boolean, number>;
  updateVaultEntries: (user: string, vaultId: number) => Transaction<boolean, number>;
  getLastVaultId: () => Promise<number>;
  getStackingPayout: (vaultId: number, lotIndex: number) => Promise<{
    "collateral-amount": number;
  "principal": string
      }>;
  getStackingPayoutLots: (vaultId: number) => Promise<{
    "ids": number[]
      }>;
  getVaultById: (id: number) => Promise<{
    "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": number;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": number;
  "debt": number;
  "id": number;
  "is-liquidated": boolean;
  "leftover-collateral": number;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": number;
  "stability-fee-last-accrued": number;
  "stacked-tokens": number;
  "stacker-name": string;
  "updated-at-block-height": number
      }>;
  getVaultEntries: (user: string) => Promise<{
    "ids": number[]
      }>;
  getVaults: (user: string) => Promise<ClarityTypes.Response<{
    "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": number;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": number;
  "debt": number;
  "id": number;
  "is-liquidated": boolean;
  "leftover-collateral": number;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": number;
  "stability-fee-last-accrued": number;
  "stacked-tokens": number;
  "stacker-name": string;
  "updated-at-block-height": number
      }[], null>>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  lastVaultId: () => Promise<number>;
  closingVault: (key: {
    "user": string
      }) => Promise<{
    "vault-id": number
      } | null>;
  stackingPayout: (key: {
    "lot-index": number;
  "vault-id": number
      }) => Promise<{
    "collateral-amount": number;
  "principal": string
      } | null>;
  stackingPayoutLots: (key: {
    "vault-id": number
      }) => Promise<{
    "ids": number[]
      } | null>;
  vaultEntries: (key: {
    "user": string
      }) => Promise<{
    "ids": number[]
      } | null>;
  vaults: (key: {
    "id": number
      }) => Promise<{
    "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": number;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": number;
  "debt": number;
  "id": number;
  "is-liquidated": boolean;
  "leftover-collateral": number;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": number;
  "stability-fee-last-accrued": number;
  "stacked-tokens": number;
  "stacker-name": string;
  "updated-at-block-height": number
      } | null>;
}
