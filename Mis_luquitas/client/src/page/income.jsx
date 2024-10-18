import React, { useState } from "react";
import styles from "../styles/income.module.css";

function Income() {
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Gasto guardado exitosamente.");
    // Reiniciar el formulario
    setFecha("");
    setMonto("");
    setFormaPago("");
    setCategoria("");
    setDescripcion("");
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
    <div className={styles.todo_income}>
      <div className={styles.container_income}>
        <h1>Registrar Ingreso</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input_income}
            name=""
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <input
            className={styles.input_income}
            name=""
            placeholder="Monto"
            type="text" // Permitir texto para validar manualmente
            value={monto}
            onChange={handleMontoChange}
            required
          />

                
          <select
            className={styles.select_income}
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
            className={styles.select_income}
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
            className={styles.input_incomeDescripcion}
            name=""
            placeholder="Descripción"
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <button className={styles.button_income} type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Income;
