import { Transaction } from '../../shared/transaction';
import { ClarityTypes } from '../../shared/clarity/types';
import { IMetadata } from '../../shared/providers/types';

// prettier-ignore

export interface ArkadikoVaultDataV11Contract {
  closeVault: (vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
  setLastVaultId: (vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
  setStackerPayout: (vaultId: number, lotIndex: number, collateralAmount: number, recipient: string, metadata: IMetadata) => Transaction<boolean, number>;
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
  "updated-at-block-height": number
      }, metadata: IMetadata) => Transaction<boolean, number>;
  updateVaultEntries: (user: string, vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
  getLastVaultId: (metadata: IMetadata) => Promise<number>;
  getStackingPayout: (vaultId: number, lotIndex: number, metadata: IMetadata) => Promise<{
    "collateral-amount": number;
  "principal": string
      }>;
  getStackingPayoutLots: (vaultId: number, metadata: IMetadata) => Promise<{
    "ids": number[]
      }>;
  getVaultById: (id: number, metadata: IMetadata) => Promise<{
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
  "updated-at-block-height": number
      }>;
  getVaultEntries: (user: string, metadata: IMetadata) => Promise<{
    "ids": number[]
      }>;
  getVaults: (user: string, metadata: IMetadata) => Promise<ClarityTypes.Response<{
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
  "updated-at-block-height": number
      } | null>;
}
