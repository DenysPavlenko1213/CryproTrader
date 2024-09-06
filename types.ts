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
    id: string,
    price: number,
    amount: number,
    isGrow?: boolean,
    date: Date,
    totalAmount?: number,
    totalProfit?: number,
    growPercent?: number,
}