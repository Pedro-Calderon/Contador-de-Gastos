import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SimplePieChart = () => {
  const data = {
    labels: ['Ahorro', 'Comida', 'Casa', 'Gastos Varios' ,'Ocio','Salud','Suscripciones'], 
    datasets: [
      {
        label: 'Gastado', 
        data: [20, 30, 40, 10], 
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
      },
    ],
  };

  return (
    <div>
      <Pie data={data} /> 
    </div>
  );
};

export default SimplePieChart;
