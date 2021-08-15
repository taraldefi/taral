import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';
import { Transaction } from '../../../../shared/transaction';

// prettier-ignore

export interface ArkadikoGovernanceV11Contract {
    addContractAddress: (name: string, address: string, qualifiedName: string, canMint: boolean, canBurn: boolean, metadata: IMetadata) => Transaction<boolean, number>;
    endProposal: (proposalId: number, metadata: IMetadata) => Transaction<number, number>;
    propose: (startBlockHeight: number, title: string, url: string, contractChanges: {
        "address": string;
        "can-burn": boolean;
        "can-mint": boolean;
        "name": string;
        "qualified-name": string
    }[], metadata: IMetadata) => Transaction<boolean, number>;
    returnVotesToMember: (token: string, proposalId: number, member: string, metadata: IMetadata) => Transaction<boolean, number>;
    toggleGovernanceShutdown: (metadata: IMetadata) => Transaction<boolean, number>;
    voteAgainst: (token: string, proposalId: number, amount: number, metadata: IMetadata) => Transaction<number, number>;
    voteFor: (token: string, proposalId: number, amount: number, metadata: IMetadata) => Transaction<number, number>;
    getProposalById: (proposalId: number, metadata: IMetadata) => Promise<{
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
    getProposalIds: (metadata: IMetadata) => Promise<ClarityTypes.Response<number[], null>>;
    getProposals: (metadata: IMetadata) => Promise<ClarityTypes.Response<{
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
    getTokensByMemberById: (proposalId: number, member: string, token: string, metadata: IMetadata) => Promise<{
        "amount": number
    }>;
    getVotesByMemberById: (proposalId: number, member: string, metadata: IMetadata) => Promise<{
        "vote-count": number
    }>;
    isTokenAccepted: (token: string, metadata: IMetadata) => Promise<boolean>;
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
