import {createContext, useEffect, useState} from 'react'
import { percentDifference } from '../utils';
import { IAsset, ICrypto } from '../types';
import { fakeAssets, fakeCrypto } from '../api';
interface ICryptoContext{
    assets: IAsset[],
    crypto: ICrypto[],
    isLoading: boolean,
}
const CryptoContext = createContext<ICryptoContext>({
    assets: [],
    crypto: [],
    isLoading: false,
})
export function CryptoContextProvider({children}: any) {
    const [isLoading,setIsLoading] = useState(false);
    const [crypto,setCrypto] = useState<ICrypto[]>([]);
    const [assets,setAssets] = useState<IAsset[]>([]);

    const getCrypto = async () => {
        setIsLoading(true);
        const cryptoData = await fakeCrypto();
        const assetsResponse = await fakeAssets();
        setAssets(assets);
        setAssets(
            assetsResponse.map((asset) => {
                const coin = cryptoData.find(c => c.id === asset.id);
                return {
                    isGrow: coin ? asset.price < coin.price : false,
                    growPercent: coin ? percentDifference(asset.price, coin.price) : 0,
                    totalAmount: coin ? asset.amount * coin.price : 0,
                    totalProfit: coin ? asset.amount * coin.price - asset.amount * asset.price : 0,
                    ...asset,
                }
            })
        );
        setCrypto(cryptoData);
        setIsLoading(false);
        console.log(crypto);
    };
    useEffect(() => {
        getCrypto();
    }, []);
  return (<CryptoContext.Provider value={{isLoading,crypto,assets}}>
    {children}
    </CryptoContext.Provider>
  )
}
export default CryptoContext