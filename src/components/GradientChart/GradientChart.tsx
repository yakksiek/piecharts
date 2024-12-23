import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  // Plugin,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import pattern from 'patternomaly';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircularProgressChartProps {
  percentage?: number;
}

// Custom plugin to create gradient pattern
// const gradientPatternPlugin: Plugin<'pie' | 'doughnut'> = {
//   id: 'gradientPattern',
//   beforeDraw: (chart) => {
//     const { ctx } = chart;

//     // Create temporary canvas for pattern
//     const tempCanvas = document.createElement('canvas');
//     const tempCtx = tempCanvas.getContext('2d');
//     if (!tempCtx) return;

//     // Set pattern size
//     tempCanvas.width = 20;
//     tempCanvas.height = 20;

//     // Create gradient
//     const gradient = tempCtx.createRadialGradient(10, 10, 0, 10, 10, 14);
//     gradient.addColorStop(0.4057, '#E51793');
//     gradient.addColorStop(1, '#EA5400');

//     // Fill background with gradient
//     tempCtx.fillStyle = gradient;
//     tempCtx.fillRect(0, 0, 20, 20);

//     // Add diagonal lines
//     tempCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
//     tempCtx.lineWidth = 2;
//     tempCtx.beginPath();

//     // Draw diagonal lines
//     for (let x = -20; x < 40; x += 4) {
//       tempCtx.moveTo(x, 0);
//       tempCtx.lineTo(x + 20, 20);
//     }
//     tempCtx.stroke();

//     // Create pattern from temporary canvas
//     const pattern = ctx.createPattern(tempCanvas, 'repeat');

//     // Update the dataset's background color with the pattern
//     if (pattern && chart.data.datasets[0]) {
//       chart.data.datasets[0].backgroundColor[1] = pattern;
//     }
//   },
// };

// export const gradientPlugin: Plugin<'pie' | 'doughnut'> = {
//   id: 'gradient',
//   beforeDraw(chart) {
//     const ctx = chart.ctx;
//     const chartArea = chart.chartArea;

//     const xCenter = (chartArea.left + chartArea.right) / 2;
//     const yCenter = (chartArea.top + chartArea.bottom) / 2;
//     const innerRadius = 0;
//     const outerRadius = (chartArea.right - chartArea.left) / 2;

//     // Gradient for the blue slice
//     const primaryGradient = ctx.createRadialGradient(
//       xCenter,
//       yCenter,
//       innerRadius,
//       xCenter,
//       yCenter,
//       outerRadius
//     );
//     primaryGradient.addColorStop(0, '#0D3B7F');
//     primaryGradient.addColorStop(0.7, '#176AE5');

//     const secondaryGradient = ctx.createRadialGradient(
//       xCenter,
//       yCenter,
//       innerRadius,
//       xCenter,
//       yCenter,
//       outerRadius
//     );
//     secondaryGradient.addColorStop(0, '#E51793');
//     secondaryGradient.addColorStop(0.7, '#EA5400');

//     // Create stripe pattern using the secondary color
//     // const stripePattern = createStripePattern(ctx, secondaryGradientColors[1]);

//     // Apply gradients to the respective segments
//     console.log(chart.data.datasets);
//     const datasetPrimary = chart.data.datasets[0];

//     if (Array.isArray(datasetPrimary?.backgroundColor)) {
//       const primarySegmentIndex = 1; // Index of the blue slice
//       const secondarySegmentIndex = 0; // Index of the orange slice

//       // Replace plain colors with gradients
//       datasetPrimary.backgroundColor[primarySegmentIndex] = primaryGradient;
//       // datasetPrimary.backgroundColor[secondarySegmentIndex] = notCoveredState
//       //   ? secondaryGradient
//       //   : stripePattern || secondaryGradient;
//       datasetPrimary.backgroundColor[secondarySegmentIndex] = secondaryGradient;
//     }

//     chart.update();
//   },
// };

export const CircularProgressChart: React.FC<CircularProgressChartProps> = ({
  percentage = 62.5,
}) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        // backgroundColor: ['#4287f5', '#ff6b6b'],
        backgroundColor: [
          '#4287f5',
          // pattern.draw('diagonal-right-left', '#e56842'),
          'grey',
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
      <Doughnut data={data} options={options} plugins={[]} />
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-4xl font-bold'>{percentage}%</span>
      </div>
    </div>
  );
};
