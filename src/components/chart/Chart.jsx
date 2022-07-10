import React from 'react'
import "./chart.scss"
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
    {name:"Jan", Total: 1600},
    {name:"Feb", Total: 2000},
    {name:"Mar", Total: 1400},
    {name:"Apr", Total: 2200},
    {name:"May", Total: 1400},
    {name:"Jun", Total: 2500},
    {name:"Jul", Total: 1600}
  ]
  

export default function Chart({aspect,title}) {



  return (

    <div className='chart'>
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%"  aspect={aspect}>

            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                   
                </defs>
                <XAxis dataKey="name" stroke='gray'/>
                
                <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
                <Tooltip />
                <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                
            </AreaChart>
        </ResponsiveContainer>
    </div>

  )
}
