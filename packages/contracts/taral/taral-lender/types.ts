
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralLenderContract {
      registerLender: (name: string, description: string, country: string) => Transaction<boolean, null>;
  updateLenderTrackRecord: (lenderId: string, success: boolean) => Transaction<boolean, string>;
  getLender: (id: string) => Promise<{
  "country": string;
  "description": string;
  "failed-transactions": bigint;
  "name": string;
  "successful-transactions": bigint
    } | null>;
  lenders: (key: {
  "id": string
    }) => Promise<{
  "country": string;
  "description": string;
  "failed-transactions": bigint;
  "name": string;
  "successful-transactions": bigint
    } | null>;
  }