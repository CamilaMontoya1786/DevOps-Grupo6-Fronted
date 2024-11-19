import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../styles/Reports.module.css";
import * as XLSX from "xlsx";

const Descarga = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budgetedExpense, setBudgetedExpense] = useState("");
  const [error, setError] = useState(null);

  const variable = [
    {
      precio: 20000,
      descripcion: "Mascota",
    },
  ];

  const excel = (datos) => {
    const nl = XLSX.utils.book_new();
    //  const ds = XLSX.utils.json_to_sheet(variable);

    const hojas = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.sheet_add_aoa(hojas, [["Ingreso Total"]], { origin: "A2" });
    XLSX.utils.sheet_add_aoa(hojas, [["Gasto Total"]], { origin: "B2" });
    XLSX.utils.sheet_add_aoa(hojas, [["Saldo Real"]], { origin: "C2" });
    XLSX.utils.sheet_add_aoa(hojas, [["Gasto Presupuestado"]], {
      origin: "D2",
    });
    XLSX.utils.sheet_add_aoa(hojas, [["Excedente en Gastos"]], {
      origin: "E2",
    });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.totalIncomes]], { origin: "A3" });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.totalExpensesByCategory]], {
      origin: "B3",
    });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.subtract]], { origin: "C3" });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.budgetedExpense]], {
      origin: "D3",
    });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.overExpense]], { origin: "E3" });
    XLSX.utils.sheet_add_aoa(hojas, [["Categoria Gasto"]], { origin: "A6" });
    XLSX.utils.sheet_add_aoa(hojas, [["Real"]], { origin: "B6" });
    let suma = 7;

    const category = Object.getOwnPropertyNames(
      datos.expensesByCategory
    ).sort();

    for (
      let index = 0;
      index < Object.keys(datos.expensesByCategory).length;
      index++
    ) {
      let categoryName = `A${suma}`;
      let categoryValue = `B${suma}`;
      XLSX.utils.sheet_add_aoa(hojas, [[category[index]]], { origin: categoryName,
      });
      XLSX.utils.sheet_add_aoa(
        hojas,
        [[datos.expensesByCategory[category[index]]]],
        { origin: categoryValue }
      );
      suma++;
      console.log(categoryName);
    }

    XLSX.utils.book_append_sheet(nl, hojas, "Mi Presupuesto");
    XLSX.writeFile(nl, "Presupuesto_Mensual.xlsx");
  };

  // Función para enviar datos al backend
  const fetchFinancialData = async () => {
    if (!startDate || !endDate || !budgetedExpense) {
      setError("Por favor ingresa todas las fechas y el monto.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: "No se ha encontrado un token. Por favor inicia sesión.",
        });
        return;
      }

      // Solicitud POST al backend con fechas y monto
      const response = await axios.get(
        "https://devops-backend-grupo6.onrender.com/subtract/getFinancialSummary",
        {
          params: {
            startDate,
            endDate,
            budgetedExpense: parseFloat(budgetedExpense),
          },
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      excel(response.data);

      Swal.fire({
        icon: "success",
        title: "Datos obtenidos con éxito",
        text: "Consulta realizada correctamente.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Error al obtener los datos. Intenta nuevamente.",
      });

      console.error("Error al obtener los datos", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Plan Presupuestal</h2>
      <div className={styles.datePickerContainer}>
        <div className={styles.desde}>
          <label>Desde
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          /></label>
        </div>
        <div className={styles.hasta}>
          <label>Hasta
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          /></label>
        </div>
        <div className={styles.presupuesto}>
          <label>Gasto Presupuestado
          <input
            type="text"
            value={budgetedExpense}
            onChange={(e) => setBudgetedExpense(e.target.value)}
            placeholder="Monto"
          /></label>
        </div>
      
        <button onClick={fetchFinancialData}>Generar Informe</button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Descarga;
