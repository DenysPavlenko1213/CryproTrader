import {createContext, useEffect, useState} from 'react'
import { percentDifference } from '../utils';
import { IAsset, ICrypto } from '../types';
import { fakeAssets, fakeCrypto } from '../api';
interface ICryptoContext{
    assets: IAsset[],
    crypto: ICrypto[],
    isLoading: boolean,
    addAsset(newAsset: IAsset): void
}
const CryptoContext = createContext<ICryptoContext>({
    assets: [],
    crypto: [],
    isLoading: false,
    addAsset(newAsset) {
        
    },
})
export function CryptoContextProvider({children}: any) {
    const [isLoading,setIsLoading] = useState(false);
    const [crypto,setCrypto] = useState<ICrypto[]>([]);
    const [assets,setAssets] = useState<IAsset[]>([]);
    function mapAssets(assets: IAsset[],cryptoData: ICrypto[]){
        return assets.map(asset => {
            const coin = cryptoData.find(c => c.id === asset.id);
                return {
                    isGrow: coin ? asset.price < coin.price : false,
                    growPercent: coin ? percentDifference(asset.price, coin.price) : 0,
                    totalAmount: coin ? asset.amount * coin.price : 0,
                    totalProfit: coin ? asset.amount * coin.price - asset.amount * asset.price : 0,
                    name: coin?.name,
                    ...asset,
                }
        })
    }
    const getCrypto = async () => {
        setIsLoading(true);
        const cryptoData = await fakeCrypto();
        const assetsResponse = await fakeAssets();
        setAssets(assets);
        setAssets(mapAssets(assetsResponse,cryptoData));
        setCrypto(cryptoData);
        setIsLoading(false);
        console.log(crypto);
    };
    useEffect(() => {
        getCrypto();
    }, []);
    function addAsset(newAsset: IAsset){
        setAssets(prev => mapAssets([...prev,newAsset],crypto))
    }
  return (<CryptoContext.Provider value={{isLoading,crypto,assets, addAsset}}>
    {children}
    </CryptoContext.Provider>
  )
}
export default CryptoContext