import React, { useEffect, useState } from "react";
import Expenses from "./expenses"; // Asegúrate de tener la ruta correcta
import Income from "./income"; // Importa el componente Income
import styles from "../styles/movements.module.css";
import Agregar from "../imagine/Agregar.png";
import axios from "axios";
import Swal from "sweetalert2";


function Movements() {
  const [showExpenses, setShowExpenses] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [showPresupuesto, setShowPresupuesto] = useState(true);
  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const disponible = ingresos - gastos;

  // Función para obtener los ingresos
  const fetchIngresos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/subtract/getSubtract",
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
        "http://localhost:3000/subtract/getSubtract",
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
                value={`$ ${ingresos.toLocaleString("es-MX")}`}
              />
            </div>

            <div className={styles.superior}>
              <label htmlFor="gastos">Gastos:</label>
              <input type="text" name="gastos" readOnly 
              value={`$ ${gastos.toLocaleString("es-MX" )}`} />
            </div>
          </div>

          <div className={styles.inferior}>
            <label htmlFor="disponible">Disponible:</label>
            <input type="text" name="disponible" readOnly
             value={`$ ${disponible.toLocaleString("es-MX" )}`} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Movements;
