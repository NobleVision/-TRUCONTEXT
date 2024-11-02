import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Warehousing', 'Maintenance', 'Freight', 'Insurance'],
  datasets: [
    {
      data: [40, 38, 22, 20],
      backgroundColor: [
        '#3f51b5',
        '#1a237e',
        '#ff9800',
        '#cddc39',
      ],
      borderWidth: 0,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
      },
    },
  },
  cutout: '70%',
  maintainAspectRatio: false,
};

function OperatingCostsChart() {
  return (
    <div style={{ height: '300px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default OperatingCostsChart;
