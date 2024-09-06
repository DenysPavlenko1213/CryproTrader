import AppHeader from './AppHeader'
import { Layout, Spin } from 'antd'
import AppSider from './AppSider'
import AppContent from './AppContent'
import { useContext } from 'react'
import CryptoContext from '../../context/CryptoContext'

function AppLayout() {
    const {isLoading} = useContext(CryptoContext)
    if(isLoading) 
        { return <Spin fullscreen /> }
  return (
    <Layout>
    <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
    </Layout>
  )
}

export default AppLayout