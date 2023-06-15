
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface InsurancePoolAuditCompactContract {
      getTxValueForPoolCompact: (tx: Buffer) => Promise<ClarityTypes.Response<{
  "scriptPubKey": Buffer;
  "value": bigint
    } | null, bigint>>;
  ERR_FAILED_TO_PARSE_TX: () => Promise<ClarityTypes.Response<null, bigint>>;
  poolPubscriptkey: () => Promise<Buffer>;
  poolRewardAddrHash: () => Promise<Buffer>;
  }