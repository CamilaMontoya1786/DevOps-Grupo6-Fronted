import { useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "../styles/Reports.module.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { color } from "chart.js/helpers";


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
  ChartDataLabels
);

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [financialData, setFinancialData] = useState([]);
  const [error, setError] = useState(null);

  // const userId = 1;

  const fetchFinancialData = async () => {
    if (!startDate || !endDate) {
      setError("Por favor ingresa todas las fechas.");
      return;
    }

    try {

      // Obtener el token desde el localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: "No se ha encontrado un token. Por favor inicia sesión.",
        });
        return;
      }

      // Realizar la solicitud GET con los parámetros y el token en los headers

      const response = await axios.get("http://localhost:3000/graphic", {
        params: {
          startDate,
          endDate,

        },
        headers: {
          Authorization: ` ${token}`,
        },
      });

      // Actualizar el estado con los datos financieros obtenidos
      setFinancialData(response.data);
      setError(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Error al obtener los datos. Intenta nuevamente.",
      });

      console.error("Error fetching financial data:", err);
    }
  };

  const BarChart = ({ data }) => {
    const incomeData = data.filter((item) => item.type === "income");
    const expenseData = data.filter((item) => item.type === "expense");

    const chartData = {
      labels: [
        ...new Set([
          ...incomeData.map((item) => item.date),
          ...expenseData.map((item) => item.date),
        ]),
      ],
      datasets: [
        {
          label: "Ingresos",
          data: incomeData.map((item) => item.amount),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          datalabels: {
            color: "black",
            align: "center",
            anchor: "center",
            font: { weight: "normal" },
          },
        },
        {
          label: "Gastos",
          data: expenseData.map((item) => item.amount),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          datalabels: {
            color: "black",
            align: "center",
            anchor: "center",
            font: { weight: "normal" },
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
      scales: { x: { ticks: { display: false } } },
    };

    return (
      <div className={styles.chartContainer}>
        <h3>Gráfico de Barras</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    );
  };

  const LineChart = ({ data }) => {
    const incomeData = data.filter((item) => item.type === "income");
    const expenseData = data.filter((item) => item.type === "expense");

    const chartData = {
      labels: [
        ...new Set([
          ...incomeData.map((item) => item.date),
          ...expenseData.map((item) => item.date),
        ]),
      ],
      datasets: [
        {
          label: "Ingresos",
          data: incomeData.map((item) => item.amount),
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Gastos",
          data: expenseData.map((item) => item.amount),
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
          tension: 0.1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { datalabels: { display: true } },
      scales: { x: { ticks: { display: false } } },
    };

    return (
      <div className={styles.chartContainer}>
        <h3>Tendencia de Ingresos y Gastos</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    );
  };

  BarChart.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  LineChart.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <div className={styles.container}>
      <h2>Reporte Financiero</h2>
      <div className={styles.datePickerContainer}>
        <div className={styles.desde}>
          <label>Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={styles.hasta}>
          <label>Hasta</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={fetchFinancialData}>Buscar Datos</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {financialData.length > 0 && (
        <div className={styles.chartsWrapper}>
          <BarChart data={financialData} />
          <LineChart data={financialData} />
        </div>
      )}
    </div>
  );
};

export default Reports;
