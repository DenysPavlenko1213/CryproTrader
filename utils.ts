export function percentDifference(price: number, price1: number): number {
    return 100 * Math.abs(price - price1) / ((price + price1) / 2)
}