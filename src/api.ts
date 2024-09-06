import { cryptoAssets,cryptoCoins } from './data'
import { IAsset, ICrypto } from './types'
export const fakeAssets = () => {
    return new Promise<IAsset[]>(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 2000)
    })
}
export const fakeCrypto = () => {
    return new Promise<ICrypto[]>(resolve => {
        setTimeout(() => {
            resolve(cryptoCoins)
        }, 2000)
    })
}