import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../styles/Reports.module.css";

const Descarga = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  const [ingresos, setIngresos] = useState(null);  // Estado para ingresos
  const [gastos, setGastos] = useState(null);  // Estado para gastos



  const fetchFinancialData = async () => {
    if (!startDate || !endDate) {
      setError("Por favor ingresa todas las fechas.");
      return;
    }

    try {
      // Obtener el token desde el localStorage
      const token = localStorage.getItem("token");
      console.log(token)

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: "No se ha encontrado un token. Por favor inicia sesión.",
        });
        return;
      }

      // Realizar la solicitud GET con los parámetros y el token en los headers
      const response = await axios.get("http://localhost:3000/subtract/getFinancialSummary", {
        params: {
          startDate,
          endDate,
        },
        headers: {
          Authorization: ` ${token}`,
        },
      });

   console.log(response)

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Error al obtener los datos. Intenta nuevamente.",
      });

      console.error("Error al obtener los datos. Intenta nuevamente", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Plan Presupuestal</h2>
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

      {/* Mostrar error si existe */}
      {error && <div className={styles.error}>{error}</div>}

    
    </div>
  );
};

export default Descarga;

