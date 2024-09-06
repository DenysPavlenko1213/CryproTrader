import { Button, Layout, Select, Space } from "antd";

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    width: '100%',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const options = [
    {
      label: 'China',
      value: 'china',
      emoji: '🇨🇳',
      desc: 'China (中国)',
    },
    {
      label: 'USA',
      value: 'usa',
      emoji: '📈',
      desc: 'USA (美国)',
    },
    {
      label: 'Japan',
      value: 'japan',
      emoji: '🎌',
      desc: 'Japan (日本)',
    },
    {
      label: 'Korea',
      value: 'korea',
      emoji: '🇰🇷',
      desc: 'Korea (韩国)',
    },
  ];

export default function AppHeader(){
    function handleChange(value: string[], option: { label: string; value: string; emoji: string; desc: string; } | { label: string; value: string; emoji: string; desc: string; }[]): void {
        throw new Error("Function not implemented.");
    }

    return(
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: 250 }}
                value='press / to open'
                options={options}
                optionRender={(option) => (
                    <Space>
                        <img src="" alt="" />Crypto
                    </Space>
                )}
            />
            <Button type="primary">Add Asset</Button>
        </Layout.Header>
    )
}