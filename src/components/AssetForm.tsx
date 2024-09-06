import { Button, DatePicker, Divider, Flex, Form, InputNumber, Result, Select, Space, Typography } from 'antd'
import { useContext, useRef, useState } from 'react'
import CryptoContext from '../context/CryptoContext'

function AssetForm({onClose}) {
    const {crypto,addAsset} = useContext(CryptoContext)
    const [form] = Form.useForm()
    const [coin,setCoin] = useState(null)
    const [submitted,setSubmitted] = useState(false)
    const assetRef = useRef()
    if(submitted){
        return(
            <Result
    status="success"
    title="Successfully Added"
    subTitle={`Added ${assetRef.current.amount} of ${coin.price} by price ${assetRef.current.price}`}
    extra={[
      <Button type="primary" key="console" onClick={onClose}>
        Close
      </Button>
    ]}
    />
        )
    }
    if(!coin){
        return(
            <Select
                style={{ width: '100%' }}
                placeholder='Select Coin'
                onSelect={(val) => setCoin(crypto.find((c) => c.id === val))}
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
        )
    }
    function onFinish(values: any): void {
        console.log(values)
        const newAsset = {
            id: coin.id,
            amount:values.amount,
            price:values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }
    const validateMessages = {
        required: "'${label}' is required!",
        types: {
            number: '${label} is not valid number'
        },
        number:{
            range: '${label} must be between ${min} and ${max}'
        }
      };

    function handleAmountChange(value: ValueType | null) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }
    function handlePriceChange(value: ValueType | null) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }

  return (
    <Form
    form={form}
    name="basic"
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 10 }}
    style={{ maxWidth: 600 }}
    initialValues={{
        price: coin.price.toFixed(2),
    }}
    onFinish={onFinish}
    validateMessages={validateMessages}
  >
    <Flex align='center'>
        <img src={coin?.icon} alt={coin?.name} style={{width:50,marginRight:10}} />
        <Typography.Title level={2} style={{margin:0}}>{coin?.name}</Typography.Title>
    </Flex>
    <Divider />
        
    <Form.Item
      label="Amount"
      name="amount"
      rules={[{ required: true, type: 'number',min: 0, }]}
    >
      <InputNumber style={{width:'100%'}} onChange={handleAmountChange} />
    </Form.Item>

    <Form.Item
      label="Price"
      name="price"
    >
      <InputNumber onChange={handlePriceChange} style={{width:'100%'}} />
    </Form.Item>
    <Form.Item label="Date" name="date">
      <DatePicker showTime style={{width:'100%'}} />
    </Form.Item>
    <Form.Item label="Total" name="total">
      <InputNumber disabled style={{width:'100%'}} />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Add Asset
      </Button>
    </Form.Item>
  </Form>
  )
}

export default AssetForm