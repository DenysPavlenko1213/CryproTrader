import { Card, Layout, List, Spin, Statistic, Typography } from "antd";
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { ICrypto, IAsset } from "../../../types";
import { percentDifference } from '../../../utils';

const siderStyle: React.CSSProperties = {
    padding: '1rem',
  };

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

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
        {id: 'bitcoin', price: 5, amount: 10},
        {id: 'ethereum', price: 199, amount: 10},
    ])
    const getCrypto = async () => {
        setIsLoading(true);
        try {
            const cryptoData = await fetch('https://openapiv1.coinstats.app/coins', options );
            const cryptoDataJSON = await cryptoData.json();
            setCrypto(cryptoDataJSON);
            console.log(crypto);
            setAssets(
                assets.map(asset => {
                    const coin = crypto.find(c => c.id === asset.id);
                    return {
                        isGrow: coin ? asset.price < coin.price : false,
                        growPercent: percentDifference(asset.price, coin.price),
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
        {assets.map((asset) => {
            <Card key={asset.id} style={{ marginBottom: '1rem' }}>
                <Statistic 
                    title={asset.id} 
                    value={asset.amount} 
                    precision={2} 
                    valueStyle={{ color: asset.isGrow ? 'green' : 'red' }} 
                    prefix={ asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />} 
                    suffix="$">
                </Statistic>
                <List size="small" 
                    dataSource={data}
                    renderItem={(item: string) => ( <List.Item> <Typography.Text mark>[ITEM]</Typography.Text> {item} </List.Item>)}>
                </List>
            </Card>
        })}
        {/* <Card bordered={false}>
                <Statistic title="Idle" value={9.3} precision={2} valueStyle={{ color: '#cf1322' }} prefix={<ArrowUpOutlined />} suffix="%"/>
        </Card> */}
        </Layout.Sider>
    )
}

