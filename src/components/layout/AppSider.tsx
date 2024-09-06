import { Card, Layout, List, Spin, Statistic, Tag, Typography } from "antd";
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { capitalize } from '../../utils';
import CryptoContext from "../../context/CryptoContext";
import { IAsset } from "../../types";

const siderStyle: React.CSSProperties = {
    padding: '1rem',
  };
  

export default function AppSider(){
    const {assets} = useContext(CryptoContext)
    return(
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map((asset: IAsset) => (
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
                        {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                        {title: 'Asset Amount', value: asset.amount, isPlain: true},
                    ]}
                    renderItem={(item: {title: string, value: number | undefined, isPlain?: boolean, withTag?: boolean}) => (
                        <List.Item>
                            <span>{item.title}</span>
                            <span>
                                {item.withTag && (<Tag color={asset.isGrow ? 'green':'red'}>{asset.growPercent?.toFixed(2)}%</Tag>)}
                                {item.isPlain && item.value}
                                {!item.isPlain && (
                                    <Typography.Text type={asset.isGrow ? 'success' : 'danger'}>
                                        {item.value?.toFixed(2)}$
                                    </Typography.Text>
                                )}
                            </span>
                        </List.Item>
                    )}
                />
            </Card>
            ))}
        </Layout.Sider>
    )
}