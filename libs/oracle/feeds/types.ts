
export interface IFilterItem {
    symbol: string;
    decimals: number;
}

export type Filter = { [key: string]: IFilterItem };