import { IMetadata } from "../../../../../providers/types";
import { Transaction } from "../../../../../transaction";

// prettier-ignore

export interface CostVotingContract {
    confirmMiners: (proposalId: number, metadata: IMetadata) => Transaction<boolean, number>;
    confirmVotes: (proposalId: number, metadata: IMetadata) => Transaction<boolean, number>;
    submitProposal: (functionContract: string, functionName: string, costFunctionContract: string, costFunctionName: string, metadata: IMetadata) => Transaction<number, null>;
    veto: (proposalId: number, metadata: IMetadata) => Transaction<boolean, number>;
    voteProposal: (proposalId: number, amount: number, metadata: IMetadata) => Transaction<boolean, number>;
    withdrawVotes: (proposalId: number, amount: number, metadata: IMetadata) => Transaction<boolean, number>;
    getConfirmedProposal: (confirmedId: number, metadata: IMetadata) => Promise<{
        "confirmed-height": number;
        "cost-function-contract": string;
        "cost-function-name": string;
        "function-contract": string;
        "function-name": string
    } | null>;
    getPrincipalVotes: (address: string, proposalId: number, metadata: IMetadata) => Promise<number | null>;
    getProposal: (proposalId: number, metadata: IMetadata) => Promise<{
        "cost-function-contract": string;
        "cost-function-name": string;
        "expiration-block-height": number;
        "function-contract": string;
        "function-name": string
    } | null>;
    getProposalVetos: (proposalId: number, metadata: IMetadata) => Promise<number | null>;
    getProposalVotes: (proposalId: number, metadata: IMetadata) => Promise<number | null>;
    ERR_ALREADY_VETOED: () => Promise<number>;
    ERR_AMOUNT_NOT_POSITIVE: () => Promise<number>;
    ERR_FETCHING_BLOCK_INFO: () => Promise<number>;
    ERR_FT_TRANSFER: () => Promise<number>;
    ERR_INSUFFICIENT_FUNDS: () => Promise<number>;
    ERR_INSUFFICIENT_VOTES: () => Promise<number>;
    ERR_NOT_LAST_MINER: () => Promise<number>;
    ERR_NO_SUCH_PROPOSAL: () => Promise<number>;
    ERR_PROPOSAL_CONFIRMED: () => Promise<number>;
    ERR_PROPOSAL_EXPIRED: () => Promise<number>;
    ERR_PROPOSAL_VETOED: () => Promise<number>;
    ERR_STX_TRANSFER: () => Promise<number>;
    ERR_TOO_MANY_CONFIRMED: () => Promise<number>;
    ERR_UNREACHABLE: () => Promise<number>;
    ERR_VETO_PERIOD_NOT_OVER: () => Promise<number>;
    ERR_VETO_PERIOD_OVER: () => Promise<number>;
    ERR_VOTE_ENDED: () => Promise<number>;
    ERR_VOTE_NOT_CONFIRMED: () => Promise<number>;
    MAX_CONFIRMED_PER_BLOCK: () => Promise<number>;
    REQUIRED_PERCENT_STX_VOTE: () => Promise<number>;
    REQUIRED_VETOES: () => Promise<number>;
    VETO_LENGTH: () => Promise<number>;
    VOTE_LENGTH: () => Promise<number>;
    confirmedProposalCount: () => Promise<number>;
    proposalCount: () => Promise<number>;
    confirmedCountAtBlock: (key: number) => Promise<number | null>;
    confirmedProposals: (key: {
        "confirmed-id": number
    }) => Promise<{
        "confirmed-height": number;
        "cost-function-contract": string;
        "cost-function-name": string;
        "function-contract": string;
        "function-name": string
    } | null>;
    exercisedVeto: (key: {
        "proposal-id": number;
        "veto-height": number
    }) => Promise<{
        "vetoed": boolean
    } | null>;
    functionsToConfirmedIds: (key: {
        "function-contract": string;
        "function-name": string
    }) => Promise<{
        "proposal-id": number
    } | null>;
    principalProposalVotes: (key: {
        "address": string;
        "proposal-id": number
    }) => Promise<{
        "votes": number
    } | null>;
    proposalConfirmedId: (key: {
        "proposal-id": number
    }) => Promise<{
        "confirmed-id": number
    } | null>;
    proposalVetos: (key: {
        "proposal-id": number
    }) => Promise<{
        "vetos": number
    } | null>;
    proposalVotes: (key: {
        "proposal-id": number
    }) => Promise<{
        "votes": number
    } | null>;
    proposals: (key: {
        "proposal-id": number
    }) => Promise<{
        "cost-function-contract": string;
        "cost-function-name": string;
        "expiration-block-height": number;
        "function-contract": string;
        "function-name": string
    } | null>;
    voteConfirmedProposals: (key: {
        "proposal-id": number
    }) => Promise<{
        "expiration-block-height": number
    } | null>;
}
