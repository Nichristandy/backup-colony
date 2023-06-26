import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels:{
          boxWidth: 0
        },
        display: false
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data ={
    labels,
    datasets:[{
        data: [100,100,100,100,100,100,100],
    backgroundColor: [
        '#52B788',
        '#95D5B2',
        '#FF483C'
    ],
    borderColor: [
        '#52B788',
        '#95D5B2',
        '#FF483C'
    ]
}
]
}


const LineCharts = () => {
  return (
    <>
        <Line options={options} data={data} />
    </>
  )
}

export default LineCharts