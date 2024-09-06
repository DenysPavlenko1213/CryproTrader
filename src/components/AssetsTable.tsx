import { Table, TableColumnsType, TableProps } from 'antd';
import React, { useContext } from 'react'
import CryptoContext from '../context/CryptoContext';
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Price $',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
  ];
  
  
function AssetsTable() {
    const {assets} = useContext(CryptoContext)
    const data = assets.map(a => ({
        key:a.id,
        name:a.name,
        price:a.price,
        amount:a.amount,
    }))
  return (
    <Table
    columns={columns}
    dataSource={data}
    showSorterTooltip={{ target: 'sorter-icon' }}
  />
  )
}

export default AssetsTable