import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import pattern from 'patternomaly';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircularProgressChartProps {
  percentage?: number;
}

const CircularProgressChart: React.FC<CircularProgressChartProps> = ({
  percentage = 62.5,
}) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        // backgroundColor: ['#4287f5', '#ff6b6b'],
        backgroundColor: [
          '#4287f5',
          pattern.draw('diagonal-right-left', '#ff6b6b'),
        ],
        borderWidth: 0,
        circumference: 360,
        rotation: -90,
      },
    ],
  };

  const options = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div style={{ height: '200px', width: '200px' }}>
      <Doughnut data={data} options={options} />
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-4xl font-bold'>{percentage}%</span>
      </div>
    </div>
  );
};

export default CircularProgressChart;
