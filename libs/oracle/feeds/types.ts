export interface IFilterItem {
  symbol: string;
  decimals: number;
}

export type Filter = { [key: string]: IFilterItem };

export interface IOkCoinFeedRequest {
  oracleSignKey: string;
  infuraApiKey: string;
}

export interface IBinanceFeedRequest {
  oracleSignKey: string;
  infuraApiKey: string;
}

export interface IOracleFeedRequest {
  coinbaseKey: string;
  coinbasePassPhrase: string;
  coinbaseSecretKey: string;
}
