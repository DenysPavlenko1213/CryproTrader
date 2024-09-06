import { Layout, Typography } from 'antd'
import React, { useContext } from 'react'
import CryptoContext from '../../context/CryptoContext';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
  };

export default function AppContent(){
  const {crypto,assets} = useContext(CryptoContext)
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{textAlign: 'left', color:'#fff'}}>Portfolio: {assets.map(asset => {
        const coin = crypto.find(c => c.id === asset.id)
        return asset.amount * coin?.price
      }).reduce((acc,val) => (acc += val), 0).toFixed(2)}$</Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  )
}
