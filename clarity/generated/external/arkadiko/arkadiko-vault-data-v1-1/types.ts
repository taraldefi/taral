import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoVaultDataV11Contract {
  closeVault: (vaultId: number | bigint) => Transaction<boolean, bigint>;
  setLastVaultId: (vaultId: number | bigint) => Transaction<boolean, bigint>;
  setStackerPayout: (vaultId: number | bigint, lotIndex: number | bigint, collateralAmount: number | bigint, recipient: string) => Transaction<boolean, bigint>;
  updateVault: (vaultId: number | bigint, data: {
  "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": bigint;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": bigint;
  "debt": bigint;
  "id": bigint;
  "is-liquidated": boolean;
  "leftover-collateral": bigint;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": bigint;
  "stability-fee-last-accrued": bigint;
  "stacked-tokens": bigint;
  "stacker-name": string;
  "updated-at-block-height": bigint
    }) => Transaction<boolean, bigint>;
  updateVaultEntries: (user: string, vaultId: number | bigint) => Transaction<boolean, bigint>;
  getLastVaultId: () => Promise<bigint>;
  getStackingPayout: (vaultId: number | bigint, lotIndex: number | bigint) => Promise<{
  "collateral-amount": bigint;
  "principal": string
    }>;
  getStackingPayoutLots: (vaultId: number | bigint) => Promise<{
  "ids": bigint[]
    }>;
  getVaultById: (id: number | bigint) => Promise<{
  "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": bigint;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": bigint;
  "debt": bigint;
  "id": bigint;
  "is-liquidated": boolean;
  "leftover-collateral": bigint;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": bigint;
  "stability-fee-last-accrued": bigint;
  "stacked-tokens": bigint;
  "stacker-name": string;
  "updated-at-block-height": bigint
    }>;
  getVaultEntries: (user: string) => Promise<{
  "ids": bigint[]
    }>;
  getVaults: (user: string) => Promise<ClarityTypes.Response<{
  "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": bigint;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": bigint;
  "debt": bigint;
  "id": bigint;
  "is-liquidated": boolean;
  "leftover-collateral": bigint;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": bigint;
  "stability-fee-last-accrued": bigint;
  "stacked-tokens": bigint;
  "stacker-name": string;
  "updated-at-block-height": bigint
    }[], null>>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  lastVaultId: () => Promise<bigint>;
  closingVault: (key: {
  "user": string
    }) => Promise<{
  "vault-id": bigint
    } | null>;
  stackingPayout: (key: {
  "lot-index": bigint;
  "vault-id": bigint
    }) => Promise<{
  "collateral-amount": bigint;
  "principal": string
    } | null>;
  stackingPayoutLots: (key: {
  "vault-id": bigint
    }) => Promise<{
  "ids": bigint[]
    } | null>;
  vaultEntries: (key: {
  "user": string
    }) => Promise<{
  "ids": bigint[]
    } | null>;
  vaults: (key: {
  "id": bigint
    }) => Promise<{
  "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": bigint;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": bigint;
  "debt": bigint;
  "id": bigint;
  "is-liquidated": boolean;
  "leftover-collateral": bigint;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": bigint;
  "stability-fee-last-accrued": bigint;
  "stacked-tokens": bigint;
  "stacker-name": string;
  "updated-at-block-height": bigint
    } | null>;
}
