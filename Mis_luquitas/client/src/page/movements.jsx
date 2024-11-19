import  { useEffect, useState } from "react";
import Expenses from "./expenses"; // Asegúrate de tener la ruta correcta
import Income from "./income"; // Importa el componente Income
import styles from "../styles/movements.module.css";
import Agregar from "../imagine/Agregar.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import Modal from "react-modal";  // Importar el modal
import { MdClose } from "react-icons/md";  // Importar el icono de cierre

function Movements() {
  const [showExpenses, setShowExpenses] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [showPresupuesto, setShowPresupuesto] = useState(true);
  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const disponible = ingresos - gastos;

  // Estados para manejar el modal
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budgetedExpense, setBudgetedExpense] = useState("");
  const [error, setError] = useState(null);

  // Función para obtener los ingresos
  const fetchIngresos = async () => {
    try {
      const response = await axios.get(
        "https://devops-backend-grupo6.onrender.com/subtract/getSubtract",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setIngresos(response.data.totalIncomes);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Error al obtener los ingresos",
        error,
      });
    }
  };

  // Función para obtener los gastos
  const fetchGastos = async () => {
    try {
      const response = await axios.get(
        "https://devops-backend-grupo6.onrender.com/subtract/getSubtract",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setGastos(response.data.totalExpenses);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Error al obtener los gastos",
        error,
      });
    }
  };

  // Función de refresh para actualizar ingresos y gastos
  const refresh = async () => {
    await fetchIngresos();
    await fetchGastos();
  };

  useEffect(() => {
    fetchIngresos();
    fetchGastos();
  }, []);

  const handleExpensesClick = () => {
    setShowExpenses(true);
    setShowIncome(false);
    setShowPresupuesto(false);
  };

  const handleIncomeClick = () => {
    setShowIncome(true);
    setShowExpenses(false);
    setShowPresupuesto(false);
  };

  // Función para manejar la descarga de Excel
  const excel = (datos) => {
    const nl = XLSX.utils.book_new();
    const hojas = XLSX.utils.aoa_to_sheet([]);



    // Añadir las cabeceras
    XLSX.utils.sheet_add_aoa(hojas, [["Ingreso Total"]], { origin: "A2" });
    XLSX.utils.sheet_add_aoa(hojas, [["Gasto Total"]], { origin: "B2" });
    XLSX.utils.sheet_add_aoa(hojas, [["Saldo Real"]], { origin: "C2" });
    XLSX.utils.sheet_add_aoa(hojas, [["Gasto Presupuestado"]], { origin: "D2" });
    XLSX.utils.sheet_add_aoa(hojas, [["Excedente en Gastos"]], { origin: "E2" });

    // Añadir los valores en la fila 3
    XLSX.utils.sheet_add_aoa(hojas, [[datos.totalIncomes]], { origin: "A3" });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.totalExpensesByCategory]], { origin: "B3" });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.subtract]], { origin: "C3" });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.budgetedExpense]], { origin: "D3" });
    XLSX.utils.sheet_add_aoa(hojas, [[datos.overExpense]], { origin: "E3" });

    // Añadir cabeceras para categorías de gasto
    XLSX.utils.sheet_add_aoa(hojas, [["Categoria Gasto"]], { origin: "A6" });
    XLSX.utils.sheet_add_aoa(hojas, [["Real"]], { origin: "B6" });

    let suma = 7;
    const category = Object.getOwnPropertyNames(datos.expensesByCategory).sort();

    // Añadir las categorías y sus valores
    for (let index = 0; index < category.length; index++) {
      let categoryName = `A${suma}`;
      let categoryValue = `B${suma}`;

      XLSX.utils.sheet_add_aoa(hojas, [[category[index]]], { origin: categoryName });
      XLSX.utils.sheet_add_aoa(hojas, [[datos.expensesByCategory[category[index]]]], { origin: categoryValue });
      suma++;
    }

   

    // Añadir la hoja al libro y descargar el archivo
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
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: "No se ha encontrado un token. Por favor inicia sesión.",
        });
        return;
      }

      // Solicitud GET al backend con fechas y monto
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
    }
  };

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.todo_movements}>
      <div className={styles.header}>
        <h2 className={styles.h2}>Movimientos</h2>
      </div>
      <div className={styles.body_movements}>
        <button
          type="button"
          className={styles.button_movements}
          onClick={handleIncomeClick}
        >
          Ingresos <img src={Agregar} alt="Descripción de la imagen" />
        </button>

        <button
          type="button"
          className={styles.button_movements}
          onClick={handleExpensesClick}
        >
          Gastos <img src={Agregar} alt="Descripción de la imagen" />
        </button>
      </div>
      {/* Renderiza el componente Expenses pasando la función refresh */}
      {showExpenses && <Expenses modoEdicion={false} refresh={refresh} />}
      {showIncome && <Income modoEdicion={false} refresh={refresh} />}{" "}
      {/* Renderiza el componente Income */}
      {showPresupuesto && (
        <div className={styles.presupuesto}>
          <div className={styles.header}>
            <h2>Plan Presupuestal</h2>
          </div>

          <div className={styles.presupuesto_superior}>
            <div className={styles.superior}>
              <label htmlFor="ingresos">Ingresos:</label>
              <input
                type="text"
                name="ingresos"
                readOnly
                value={`$ ${ingresos.toLocaleString("es-CO")}`}
              />
            </div>

            <div className={styles.superior}>
              <label htmlFor="gastos">Gastos:</label>
              <input
                type="text"
                name="gastos"
                readOnly
                value={`$ ${gastos.toLocaleString("es-CO")}`}
              />
            </div>
          </div>

          <div className={styles.inferior}>
            <label htmlFor="disponible">Disponible:</label>
            <input
              type="text"
              name="disponible"
              readOnly
              value={`$ ${disponible.toLocaleString("es-CO")}`}
            />
          </div>
          <Link to="#" onClick={handleDownloadClick} className={styles.link}>
            Descarga tu plan presupuestal  aquí
          </Link>
        </div>
      )}

      {/* Modal para realizar consultas y generar el informe */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Generar Informe Presupuestal"
        className={styles.modalContent}  // Asegúrate de tener un estilo adecuado
        overlayClassName={styles.modalOverlay}  // Asegúrate de tener un estilo adecuado
      >
        <div className={styles.modalHeader}>
        <h2>Generar Informe Presupuestal</h2>
          <button onClick={closeModal} className={styles.closeButton}>
            <MdClose size={30} />
          </button>
          
        </div>
        <div className={styles.datePickerContainer}>
          <div className={styles.desde}>
            <label>
              Desde
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.hasta}>
            <label>
              Hasta
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.informe}>
            <label>
              Gasto Presupuestado
              <input
                type="text"
                value={budgetedExpense}
                onChange={(e) => setBudgetedExpense(e.target.value)}
                placeholder="Monto"
              />
            </label>
          </div>

          <button onClick={fetchFinancialData}>Generar Informe</button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </Modal>
    </div>
  );
}

export default Movements;
