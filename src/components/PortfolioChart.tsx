import { Chart as ChartJS, Tooltip,ArcElement,Legend } from 'chart.js'
import { useContext } from 'react'
import { Pie } from 'react-chartjs-2'
import CryptoContext from '../context/CryptoContext'
ChartJS.register(ArcElement,Tooltip,Legend)
function PortfolioChart() {
    const {assets} = useContext(CryptoContext)
    const data = {
        labels: assets.map((a) => a.name),
        datasets:[
            {
                label: '$',
                data:assets.map(a => a.totalAmount),
                backgroundColor:[
                    'rgba(255,99,132,1)',
                    'rgba(255,206,86,1)',
                ],
                borderWidth:1,
            },
        ],
    }
  return (
    <div style={{display:'flex', marginBottom: '1rem', justifyContent: 'center',height:500}}>
        <Pie data={data} />
    </div>
  )
}

export default PortfolioChart