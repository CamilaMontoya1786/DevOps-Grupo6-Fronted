import { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa el plugin
import '../styles/reports.css';
import PropTypes from 'prop-types';

// Registrar los elementos necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Registrar el plugin de etiquetas
);

const Reports = () => {
  // Estados para las fechas y los datos obtenidos
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [financialData, setFinancialData] = useState([]);
  const [error, setError] = useState(null);

  // Asignamos el ID de usuario de forma fija (puedes reemplazarlo por lo que necesites)
  const userId = 1;

  const fetchFinancialData = async () => {
    if (!startDate || !endDate) {
      setError('Por favor ingresa todas las fechas.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/graphic', {
        params: {
          startDate,
          endDate,
          userId,
        },
      });
      setFinancialData(response.data);
      setError(null);
    } catch (err) {
      setError('Error al obtener los datos. Intenta nuevamente.');
      console.error('Error fetching financial data:', err);
    }
  };

  // Componente para el gráfico de barras
  const BarChart = ({ data }) => {
    const incomeData = data.filter(item => item.type === 'income');
    const expenseData = data.filter(item => item.type === 'expense');

    const chartData = {
      labels: [...new Set([...incomeData.map(item => item.date), ...expenseData.map(item => item.date)])],
      datasets: [
        {
          label: 'Ingresos',
          data: incomeData.map(item => item.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          datalabels: {
            color: 'black',
            align: 'center',
            anchor: 'center',
            font: {
              weight: 'normal',
            },
          },
        },
        {
          label: 'Gastos',
          data: expenseData.map(item => item.amount),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          datalabels: {
            color: 'black',
            align: 'center',
            anchor: 'center',
            font: {
              weight: 'normal',
            },
          },
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          display: true,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false, // Esto elimina las fechas (ticks) en el eje X
          },
        },
      },
    };

    return (
      <div className="chart-container">
        <h3>Gráfico de Barras</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    );
  };

  // Componente para la gráfica de tendencia (línea)
  const LineChart = ({ data }) => {
    const incomeData = data.filter(item => item.type === 'income');
    const expenseData = data.filter(item => item.type === 'expense');

    const chartData = {
      labels: [...new Set([...incomeData.map(item => item.date), ...expenseData.map(item => item.date)])],
      datasets: [
        {
          label: 'Ingresos',
          data: incomeData.map(item => item.amount),
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Gastos',
          data: expenseData.map(item => item.amount),
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
          tension: 0.1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          display: true,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false, // Esto elimina las fechas (ticks) en el eje X
          },
        },
      },
    };

    return (
      <div className="chart-container">
        <h3>Tendencia de Ingresos y Gastos</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    );
  };

  BarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })).isRequired,
  };

  LineChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })).isRequired,
  };

  return (
    <div className="container">
      <h2>Reporte Financiero</h2>
      
      <div className="date-picker-container">
        <div>
          <label>Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>Hasta</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={fetchFinancialData}>Buscar Datos</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {financialData.length > 0 && (
        <div className="charts-wrapper">
          <BarChart data={financialData} />
          <LineChart data={financialData} />
        </div>
      )}
    </div>
  );
};

export default Reports;
