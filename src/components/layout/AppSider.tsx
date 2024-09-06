import { Card, Layout, List, Spin, Statistic, Typography } from "antd";
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { ICrypto, IAsset } from "../../../types";
import { capitalize, percentDifference } from '../../../utils';

const siderStyle: React.CSSProperties = {
    padding: '1rem',
  };

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'eA85zj3n9v/uEDMSFhSH4444vuedKFiiuOxPB2RtIc0='
    }
  };
  

export default function AppSider(){
    const [isLoading,setIsLoading] = useState(false)
    const [crypto,setCrypto] = useState<ICrypto[]>([])
    const [assets,setAssets] = useState<IAsset[]>([
        {id: 'bitcoin', price: 26244, amount: 0.02,date: new Date()},
        {id: 'ethereum', price: 2400, amount: 5,date: new Date()},
    ])
    const getCrypto = async () => {
        setIsLoading(true);
        try {
            const cryptoData = await fetch('https://openapiv1.coinstats.app/coins', options );
            const cryptoDataJSON = await cryptoData.json();
            setCrypto(cryptoDataJSON);
            console.log(crypto);
            setAssets(
                assets.map((asset) => {
                    const coin = crypto.find(c => c.id === asset.id);
                    return {
                        isGrow: coin ? asset.price < coin.price : false,
                        growPercent: coin ? percentDifference(asset.price, coin.price) : 0,
                        totalAmount: coin ? asset.amount * coin.price : 0,
                        totalProfit: coin ? asset.amount * coin.price - asset.amount * asset.price : 0,
                        ...asset,
                    }
                })
            );
        } catch (error) {
            console.error(error);
        }
        finally{
            setIsLoading(false);
        }
    };
    useEffect(() => {getCrypto()}, [])
    if(isLoading) return <Spin fullscreen />
    return(
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map((asset) => (
            <Card key={asset.id} style={{ marginBottom: '1rem' }}>
                <Statistic 
                    title={capitalize(asset.id)} 
                    value={asset.totalAmount} 
                    precision={2} 
                    valueStyle={{ color: asset.isGrow ? 'green' : 'red' }} 
                    prefix={ asset.isGrow ? <ArrowUpOutlined /> : <ArrowDownOutlined />} 
                    suffix="$"
                />
                <List size="small" 
                    dataSource={[
                        {title: 'Total Profit', value: asset.totalProfit, isPlain: false},
                        {title: 'Asset Amount', value: asset.amount, isPlain: true},
                        {title: 'Difference', value: asset.growPercent, isPlain: false},
                    ]}
                    renderItem={(item: {title: string, value: number | undefined, isPlain: boolean}) => (
                        <List.Item>
                            <span>{item.title}</span>
                            {item.isPlain && <span>{item.value}</span>}
                            {!item.isPlain && (
                                <Typography.Text type={asset.isGrow ? 'success' : 'danger'}>
                                    {item.value}$
                                </Typography.Text>
                            )}
                        </List.Item>
                    )}
                />
            </Card>
            ))}
        </Layout.Sider>
    )
}

