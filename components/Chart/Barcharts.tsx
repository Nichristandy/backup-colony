import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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

type BarProps = {
    data?: {
        labels: any,
        datasets: any
    }
    options?: any
    width?: string
    height?: string
    className?: string
}

const Barcharts = ({ data, options, width, height, className }: BarProps) => {

    return (
        <div className='w-full flex items-center gap-2 overflow-x-hidden overflow-y-auto'>
            <Bar
                data={data ? data : customData}
                height={height}
                width={width}
                options={options ? options : customOptions}
                className={className}
            />
        </div>
    )
}

export default Barcharts;
