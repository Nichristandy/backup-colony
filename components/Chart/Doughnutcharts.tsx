import React from 'react';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(ArcElement, Tooltip, Legend);

export const customData = {
    labels: ['Inhibited', 'Unoccupied', 'Unavaible'],
    datasets: [
        {
            label: '# of Votes',
            data: [500, 300, 200],
            backgroundColor: [
                '#52B788',
                '#95D5B2',
                '#FF483C'
            ],
            borderColor: [
                '#52B788',
                '#95D5B2',
                '#FF483C'
            ],
            borderWidth: 1,
        },
    ],
};

export const customOptions = {
    plugins: {
        legend: {
            display: true,
            position: "top",
            align: "center",
            labels: {
                font: {
                    size: 16,
                },
                boxWidth: 20,
            },
            responsive: true,
        },
    },
}

type DoughnutProps = {
    data?: {
        labels: any,
        datasets: any
    }
    options?: any
    width?: string
    height?: string
    className?: string
}

const Doughnutcharts = ({ data, options, width, height, className }: DoughnutProps) => {

    return (
        <div className='w-full flex items-center gap-2 overflow-x-hidden overflow-y-auto'>
            <Doughnut
                data={data ? data : customData}
                height={height}
                width={width}
                options={options ? options : customOptions}
                className={className}
            />
        </div>
    )
}

export default Doughnutcharts;
