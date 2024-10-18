import React, { useState } from "react";
import Expenses from "./Expenses"; // Asegúrate de tener la ruta correcta
import Income from "./Income"; // Importa el componente Income
import styles from "../styles/movements.module.css";
import Agregar from "../imagine/Agregar.png";

function Movements() {
  const [showExpenses, setShowExpenses] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [showPresupuesto, setShowPresupuesto] = useState(true); // Nuevo estado para el presupuesto
  const ingresos = 1000; // Ejemplo de valor
  const gastos = 500; // Ejemplo de valor
  const disponible = ingresos - gastos; // Cálculo del disponible

  const handleExpensesClick = () => {
    setShowExpenses(true);
    setShowIncome(false);
    setShowPresupuesto(false); // Ocultar el presupuesto al mostrar gastos
  };

  const handleIncomeClick = () => {
    setShowIncome(true);
    setShowExpenses(false);
    setShowPresupuesto(false); // Ocultar el presupuesto al mostrar ingresos
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
          Ingresos
          <img src={Agregar} alt="Descripción de la imagen" />
        </button>

        <button
          type="button"
          className={styles.button_movements}
          onClick={handleExpensesClick}
        >
          Gastos
          <img src={Agregar} alt="Descripción de la imagen" />
        </button>
      </div>
      
      {showIncome && <Income />} {/* Renderiza el componente Income */}
      {showExpenses && <Expenses />} {/* Renderiza el componente Expenses */}

      {showPresupuesto && ( // Muestra el presupuesto solo si showPresupuesto es true
        <div className={styles.presupuesto}>
          <div className={styles.header}>
            <h2>Plan Presupuestal</h2>
          </div>

          <div className={styles.presupuesto_superior}>
            <div className={styles.superior}>
              <label htmlFor="ingresos">Ingresos:</label>
              <input type="text" name="ingresos" readOnly value={ingresos} />
            </div>

            <div className={styles.superior}>
              <label htmlFor="gastos">Gastos:</label>
              <input type="text" name="gastos" readOnly value={gastos} />
            </div>
          </div>

          <div className={styles.inferior}>
            <label htmlFor="disponible">Disponible:</label>
            <input type="text" name="disponible" readOnly value={disponible} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Movements;
