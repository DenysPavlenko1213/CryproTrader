import { Button, Drawer, Layout, Modal, Select, Space } from "antd";
import { useContext, useState } from "react";
import CryptoContext from "../../context/CryptoContext";
import CryptoInformationModal from "../CryptoInformationModal";
import { ICrypto } from "../../types";
import AssetForm from "../AssetForm";

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    width: '100%',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

export default function AppHeader(){
  const {crypto} = useContext(CryptoContext)
  const [modal,setModal] = useState(false)
  const [drawer,setDrawer] = useState(false)
  const [coin,setCoin] = useState<ICrypto | null | undefined>(null)
  function handleSelect(value: string) {
    setCoin(crypto.find(c => c.id === value))
    setModal(true)
  }

    return(
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: 250 }}
                value='press / to open'
                onSelect={handleSelect}
                options={crypto.map(coin => ({
                  label:coin.name,
                  value:coin.id,
                  icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label} />{' '}
                        {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
            <Modal open={modal} footer={null} onCancel={() => setModal(false)}>
                <CryptoInformationModal cryptoCoin={coin}></CryptoInformationModal>
            </Modal>
            <Drawer width={600} onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
              <AssetForm onClose={() => setDrawer(false)}></AssetForm>
            </Drawer>
        </Layout.Header>
    )
}