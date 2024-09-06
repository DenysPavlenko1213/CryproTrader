import { Divider, Flex, Tag, Typography } from 'antd'
import { ICrypto } from '../types'
interface IProps{
    cryptoCoin: ICrypto | null | undefined
}
function CryptoInformationModal({cryptoCoin}: IProps) {
  return(
    <>
        <Flex align='center'>
            <img src={cryptoCoin?.icon} alt={cryptoCoin?.name} style={{width:50,marginRight:10}} />
            <Typography.Title level={2} style={{margin:0}}>({cryptoCoin?.symbol}) {cryptoCoin?.name}</Typography.Title>
        </Flex>
        <Divider/>
        <Typography.Paragraph>
            <Typography.Text strong>1 hour: </Typography.Text>
            <Tag color={cryptoCoin?.priceChange1h > 0 ? 'green':'red'}>{cryptoCoin?.priceChange1h}%</Tag>
            <Typography.Text strong>1 day: </Typography.Text>
            <Tag color={cryptoCoin?.priceChange1d > 0 ? 'green':'red'}>{cryptoCoin?.priceChange1d}%</Tag>
            <Typography.Text strong>1 week: </Typography.Text>
            <Tag color={cryptoCoin?.priceChange1w > 0 ? 'green':'red'}>{cryptoCoin?.priceChange1w}%</Tag>
        </Typography.Paragraph>
        <Typography.Paragraph>
            <Typography.Text strong>Price: </Typography.Text>
            {cryptoCoin?.price.toFixed(2)}$
        </Typography.Paragraph>
        <Typography.Paragraph>
            <Typography.Text strong>Price BTC: </Typography.Text>
            {cryptoCoin?.priceBtc}
        </Typography.Paragraph>
        <Typography.Paragraph>
            <Typography.Text strong>Market Cap: </Typography.Text>
            {cryptoCoin?.marketCap}$
        </Typography.Paragraph>
    </>
  )
}

export default CryptoInformationModal