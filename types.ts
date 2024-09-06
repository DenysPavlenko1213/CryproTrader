export interface ICrypto{
    id: string,
    icon: string,
    name: string,
    symbol: string,
    rank: number,
    price: number,
    availableSupply: number,
    explorers?: string[],
    fullyDilutedValuation: number,
    priceBtc: number,
    totalSupply: number,
    volume: number,
    marketCap: number
}
export interface IAsset{
    grow: any;
    id: string,
    price: number,
    amount: number,
    isGrow: boolean,
    growPercent: number,
}