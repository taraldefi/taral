
  
  import { Transaction } from 'taral-shared';
  import { ClarityTypes } from 'taral-shared'

  export interface ArkadikoGovernanceV11Contract {
      addContractAddress: (name: string, address: string, qualifiedName: string, canMint: boolean, canBurn: boolean) => Transaction<boolean, bigint>;
  endProposal: (proposalId: number | bigint) => Transaction<bigint, bigint>;
  propose: (stakePoolDiko: string, startBlockHeight: number | bigint, title: string, url: string, contractChanges: {
  "address": string;
  "can-burn": boolean;
  "can-mint": boolean;
  "name": string;
  "qualified-name": string
    }[]) => Transaction<boolean, bigint>;
  returnVotesToMember: (token: string, proposalId: number | bigint, member: string) => Transaction<boolean, bigint>;
  toggleGovernanceShutdown: () => Transaction<boolean, bigint>;
  tokenAmountToVotes: (stakePoolDiko: string, token: string, amount: number | bigint) => Transaction<bigint, bigint>;
  voteAgainst: (stakePoolDiko: string, token: string, proposalId: number | bigint, amount: number | bigint) => Transaction<bigint, bigint>;
  voteFor: (stakePoolDiko: string, token: string, proposalId: number | bigint, amount: number | bigint) => Transaction<bigint, bigint>;
  getProposalById: (proposalId: number | bigint) => Promise<{
  "contract-changes": {
  "address": string;
  "can-burn": boolean;
  "can-mint": boolean;
  "name": string;
  "qualified-name": string
    }[];
  "end-block-height": bigint;
  "id": bigint;
  "is-open": boolean;
  "no-votes": bigint;
  "proposer": string;
  "start-block-height": bigint;
  "title": string;
  "url": string;
  "yes-votes": bigint
    }>;
  getProposalIds: () => Promise<ClarityTypes.Response<bigint[], null>>;
  getProposals: () => Promise<ClarityTypes.Response<{
  "contract-changes": {
  "address": string;
  "can-burn": boolean;
  "can-mint": boolean;
  "name": string;
  "qualified-name": string
    }[];
  "end-block-height": bigint;
  "id": bigint;
  "is-open": boolean;
  "no-votes": bigint;
  "proposer": string;
  "start-block-height": bigint;
  "title": string;
  "url": string;
  "yes-votes": bigint
    }[], null>>;
  getTokensByMemberById: (proposalId: number | bigint, member: string, token: string) => Promise<{
  "amount": bigint
    }>;
  getVotesByMemberById: (proposalId: number | bigint, member: string) => Promise<{
  "vote-count": bigint
    }>;
  isTokenAccepted: (token: string) => Promise<boolean>;
  DAOOWNER: () => Promise<string>;
  ERRBLOCKHEIGHTNOTREACHED: () => Promise<bigint>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<bigint>;
  ERRNOCONTRACTCHANGES: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  ERRNOTENOUGHBALANCE: () => Promise<bigint>;
  ERRWRONGTOKEN: () => Promise<bigint>;
  STATUSOK: () => Promise<bigint>;
  governanceShutdownActivated: () => Promise<boolean>;
  proposalCount: () => Promise<bigint>;
  proposalIds: () => Promise<bigint[]>;
  proposals: (key: {
  "id": bigint
    }) => Promise<{
  "contract-changes": {
  "address": string;
  "can-burn": boolean;
  "can-mint": boolean;
  "name": string;
  "qualified-name": string
    }[];
  "end-block-height": bigint;
  "id": bigint;
  "is-open": boolean;
  "no-votes": bigint;
  "proposer": string;
  "start-block-height": bigint;
  "title": string;
  "url": string;
  "yes-votes": bigint
    } | null>;
  tokensByMember: (key: {
  "member": string;
  "proposal-id": bigint;
  "token": string
    }) => Promise<{
  "amount": bigint
    } | null>;
  votesByMember: (key: {
  "member": string;
  "proposal-id": bigint
    }) => Promise<{
  "vote-count": bigint
    } | null>;
  }