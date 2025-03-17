import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {useBudget} from "../Contex/useBudget"

ChartJS.register(ArcElement, Tooltip, Legend);

const SimplePieChart = () => {
  const{state}=useBudget()
  const categoryTotals = state.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {})
  const labels = Object.keys(categoryTotals)
  const dataValues = Object.values(categoryTotals)

  const backgroundColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#66FF99"
  ]
   
  const data = {
    labels,
    datasets: [
      {
        label: "Gastado",
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, labels.length), // Tomar solo los necesarios
      },
    ],
  }
  return (
    <div className="w-full max-w-sm mx-auto"> {/* Ajustar tamaño */}
      <Pie data={data} />
    </div>
  )
}

export default SimplePieChart;
