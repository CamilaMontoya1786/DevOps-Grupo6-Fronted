import React, { useState } from "react";
import styles from "../styles/expenses.module.css";

function Expenses() {
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const expenseData = {
      fecha,
      monto,
      formaPago,
      categoria,
      descripcion,
    };

    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();
      alert("Gasto guardado exitosamente.");

      // Reiniciar el formulario
      setFecha("");
      setMonto("");
      setFormaPago("");
      setCategoria("");
      setDescripcion("");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el gasto.");
    }
  };

  const handleMontoChange = (e) => {
    const value = e.target.value;

    // Permitir solo números y punto decimal
    const regex = /^\d*\.?\d{0,2}$/;

    if (value === "" || regex.test(value)) {
      setMonto(value);
    }
  };

  return (
    <div className={styles.todo_expenses}>
      <div className={styles.container_expenses}>
        <h1>Registrar Gasto</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input_expenses}
            name=""
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <input
            className={styles.input_expenses}
            name=""
            placeholder="Monto"
            type="text" // Permitir texto para validar manualmente
            id="monto"
            value={monto}
            onChange={handleMontoChange}
            required
          />

          <select
            className={styles.select_expenses}
            name=""
            value={formaPago}
            onChange={(e) => setFormaPago(e.target.value)}
            required
          >
            <option value="">Forma de Pago</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
          </select>

          <select
            className={styles.select_expenses}
            name=""
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Categoría</option>
            <option value="comida">Comida</option>
            <option value="transporte">Transporte</option>
            <option value="entretenimiento">Entretenimiento</option>
          </select>

          <input
            className={styles.input_expensesDescripcion}
            name=""
            placeholder="Descripción"
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />

          <button className={styles.button_expenses} type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Expenses;
