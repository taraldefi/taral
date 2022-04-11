export interface IFilterItem {
  symbol: string;
  decimals: number;
}

export type Filter = { [key: string]: IFilterItem };

export interface IOkCoinFeedRequest {
  oracleSecretKey: string;
  infuraApiKey: string;
}

export interface IBinanceFeedRequest {
  oracleSecretKey: string;
  infuraApiKey: string;
}

export interface IOracleFeedRequest {
  coinbaseKey: string;
  coinbasePassPhrase: string;
  coinbaseSecretKey: string;
}
