import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const ViewAnalytics = () => {
  const data = {
    labels: ['CSE', 'IT', 'ECE', 'MECH'],
    datasets: [
      {
        label: 'Placement %',
        data: [81, 75, 75, 70],
        backgroundColor: ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B'],
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Department-wise Placement Analytics</h2>
      <Bar data={data} />
    </div>
  );
};

export default ViewAnalytics;
