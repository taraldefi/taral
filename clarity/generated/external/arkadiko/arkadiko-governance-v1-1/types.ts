import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoGovernanceV11Contract {
  addContractAddress: (name: string, address: string, qualifiedName: string, canMint: boolean, canBurn: boolean) => Transaction<boolean, number>;
  endProposal: (proposalId: number) => Transaction<number, number>;
  propose: (stakePoolDiko: string, startBlockHeight: number, title: string, url: string, contractChanges: {
    "address": string;
  "can-burn": boolean;
  "can-mint": boolean;
  "name": string;
  "qualified-name": string
      }[]) => Transaction<boolean, number>;
  returnVotesToMember: (token: string, proposalId: number, member: string) => Transaction<boolean, number>;
  toggleGovernanceShutdown: () => Transaction<boolean, number>;
  tokenAmountToVotes: (stakePoolDiko: string, token: string, amount: number) => Transaction<number, number>;
  voteAgainst: (stakePoolDiko: string, token: string, proposalId: number, amount: number) => Transaction<number, number>;
  voteFor: (stakePoolDiko: string, token: string, proposalId: number, amount: number) => Transaction<number, number>;
  getProposalById: (proposalId: number) => Promise<{
    "contract-changes": {
    "address": string;
  "can-burn": boolean;
  "can-mint": boolean;
  "name": string;
  "qualified-name": string
      }[];
  "end-block-height": number;
  "id": number;
  "is-open": boolean;
  "no-votes": number;
  "proposer": string;
  "start-block-height": number;
  "title": string;
  "url": string;
  "yes-votes": number
      }>;
  getProposalIds: () => Promise<ClarityTypes.Response<number[], null>>;
  getProposals: () => Promise<ClarityTypes.Response<{
    "contract-changes": {
    "address": string;
  "can-burn": boolean;
  "can-mint": boolean;
  "name": string;
  "qualified-name": string
      }[];
  "end-block-height": number;
  "id": number;
  "is-open": boolean;
  "no-votes": number;
  "proposer": string;
  "start-block-height": number;
  "title": string;
  "url": string;
  "yes-votes": number
      }[], null>>;
  getTokensByMemberById: (proposalId: number, member: string, token: string) => Promise<{
    "amount": number
      }>;
  getVotesByMemberById: (proposalId: number, member: string) => Promise<{
    "vote-count": number
      }>;
  isTokenAccepted: (token: string) => Promise<boolean>;
  DAOOWNER: () => Promise<string>;
  ERRBLOCKHEIGHTNOTREACHED: () => Promise<number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRNOCONTRACTCHANGES: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRNOTENOUGHBALANCE: () => Promise<number>;
  ERRWRONGTOKEN: () => Promise<number>;
  STATUSOK: () => Promise<number>;
  governanceShutdownActivated: () => Promise<boolean>;
  proposalCount: () => Promise<number>;
  proposalIds: () => Promise<number[]>;
  proposals: (key: {
    "id": number
      }) => Promise<{
    "contract-changes": {
    "address": string;
  "can-burn": boolean;
  "can-mint": boolean;
  "name": string;
  "qualified-name": string
      }[];
  "end-block-height": number;
  "id": number;
  "is-open": boolean;
  "no-votes": number;
  "proposer": string;
  "start-block-height": number;
  "title": string;
  "url": string;
  "yes-votes": number
      } | null>;
  tokensByMember: (key: {
    "member": string;
  "proposal-id": number;
  "token": string
      }) => Promise<{
    "amount": number
      } | null>;
  votesByMember: (key: {
    "member": string;
  "proposal-id": number
      }) => Promise<{
    "vote-count": number
      } | null>;
}
