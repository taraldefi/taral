import { Transaction } from "lib-shared";

export interface CostVotingContract {
    confirmMiners: (proposalId: number | bigint) => Transaction<boolean, bigint>;
    confirmVotes: (proposalId: number | bigint) => Transaction<boolean, bigint>;
    submitProposal: (
        functionContract: string,
        functionName: string,
        costFunctionContract: string,
        costFunctionName: string
    ) => Transaction<bigint, null>;
    veto: (proposalId: number | bigint) => Transaction<boolean, bigint>;
    voteProposal: (
        proposalId: number | bigint,
        amount: number | bigint
    ) => Transaction<boolean, bigint>;
    withdrawVotes: (
        proposalId: number | bigint,
        amount: number | bigint
    ) => Transaction<boolean, bigint>;
    getConfirmedProposal: (confirmedId: number | bigint) => Promise<{
        "confirmed-height": bigint;
        "cost-function-contract": string;
        "cost-function-name": string;
        "function-contract": string;
        "function-name": string;
    } | null>;
    getPrincipalVotes: (
        address: string,
        proposalId: number | bigint
    ) => Promise<bigint | null>;
    getProposal: (proposalId: number | bigint) => Promise<{
        "cost-function-contract": string;
        "cost-function-name": string;
        "expiration-block-height": bigint;
        "function-contract": string;
        "function-name": string;
    } | null>;
    getProposalVetos: (proposalId: number | bigint) => Promise<bigint | null>;
    getProposalVotes: (proposalId: number | bigint) => Promise<bigint | null>;
    ERR_ALREADY_VETOED: () => Promise<bigint>;
    ERR_AMOUNT_NOT_POSITIVE: () => Promise<bigint>;
    ERR_FETCHING_BLOCK_INFO: () => Promise<bigint>;
    ERR_FT_TRANSFER: () => Promise<bigint>;
    ERR_INSUFFICIENT_FUNDS: () => Promise<bigint>;
    ERR_INSUFFICIENT_VOTES: () => Promise<bigint>;
    ERR_NOT_LAST_MINER: () => Promise<bigint>;
    ERR_NO_SUCH_PROPOSAL: () => Promise<bigint>;
    ERR_PROPOSAL_CONFIRMED: () => Promise<bigint>;
    ERR_PROPOSAL_EXPIRED: () => Promise<bigint>;
    ERR_PROPOSAL_VETOED: () => Promise<bigint>;
    ERR_STX_TRANSFER: () => Promise<bigint>;
    ERR_TOO_MANY_CONFIRMED: () => Promise<bigint>;
    ERR_UNREACHABLE: () => Promise<bigint>;
    ERR_VETO_PERIOD_NOT_OVER: () => Promise<bigint>;
    ERR_VETO_PERIOD_OVER: () => Promise<bigint>;
    ERR_VOTE_ENDED: () => Promise<bigint>;
    ERR_VOTE_NOT_CONFIRMED: () => Promise<bigint>;
    MAX_CONFIRMED_PER_BLOCK: () => Promise<bigint>;
    REQUIRED_PERCENT_STX_VOTE: () => Promise<bigint>;
    REQUIRED_VETOES: () => Promise<bigint>;
    VETO_LENGTH: () => Promise<bigint>;
    VOTE_LENGTH: () => Promise<bigint>;
    confirmedProposalCount: () => Promise<bigint>;
    proposalCount: () => Promise<bigint>;
    confirmedCountAtBlock: (key: bigint) => Promise<bigint | null>;
    confirmedProposals: (key: { "confirmed-id": bigint }) => Promise<{
        "confirmed-height": bigint;
        "cost-function-contract": string;
        "cost-function-name": string;
        "function-contract": string;
        "function-name": string;
    } | null>;
    exercisedVeto: (key: {
        "proposal-id": bigint;
        "veto-height": bigint;
    }) => Promise<{
        vetoed: boolean;
    } | null>;
    functionsToConfirmedIds: (key: {
        "function-contract": string;
        "function-name": string;
    }) => Promise<{
        "proposal-id": bigint;
    } | null>;
    principalProposalVotes: (key: {
        address: string;
        "proposal-id": bigint;
    }) => Promise<{
        votes: bigint;
    } | null>;
    proposalConfirmedId: (key: { "proposal-id": bigint }) => Promise<{
        "confirmed-id": bigint;
    } | null>;
    proposalVetos: (key: { "proposal-id": bigint }) => Promise<{
        vetos: bigint;
    } | null>;
    proposalVotes: (key: { "proposal-id": bigint }) => Promise<{
        votes: bigint;
    } | null>;
    proposals: (key: { "proposal-id": bigint }) => Promise<{
        "cost-function-contract": string;
        "cost-function-name": string;
        "expiration-block-height": bigint;
        "function-contract": string;
        "function-name": string;
    } | null>;
    voteConfirmedProposals: (key: { "proposal-id": bigint }) => Promise<{
        "expiration-block-height": bigint;
    } | null>;
}
