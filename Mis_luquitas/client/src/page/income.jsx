import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/income.module.css";
import Swal from "sweetalert2"; // Importa SweetAlert2

function Income({ modoEdicion = false, income = null, refresh }) {
  const [formData, setFormData] = useState({
    fecha: "",
    monto: "",
    formaPago: "",
    categoria: "",
    descripcion: "",
  });
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  useEffect(() => {
    if (income) {
      setFormData({
        formaPago: income.incomeMethodPaymentId,
        categoria: income.incomeCategoryId,
        descripcion: income.incomeDescription,
        fecha: income.
        incomeDate,
        monto: income.incomeAmount,
      });
    }
  }, [income]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/incomeMethodPayment/incomeMethodPayments"
        );
        setUserList(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/incomeCategory/incomeCategories"
        );
        setCategoryList(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategoryData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Activar el estado de carga

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          authorization: `${token}`,
        },
      };

      const ingresoData = {
        incomeDate: formData.fecha,
        incomeAmount: parseFloat(formData.monto),
        incomeMethodPaymentId: formData.formaPago,
        incomeCategoryId: formData.categoria,
        incomeDescription: formData.descripcion,
      };
      console.log(ingresoData);

      if (modoEdicion) {
        const response = await axios.post("http://localhost:3000/income/updateIncome/" + income.incomeId,
          ingresoData,
          config
        );

        if (response.status === 200) {
          setFormData({
            fecha: "",
            monto: "",
            formaPago: "",
            categoria: "",
            descripcion: "",
          });
        }
        const successMessage =
          response.data.message || "Ingreso actualizado exitosamente.";
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: successMessage,
        }); // Muestra el mensaje de éxito
      } else {
        const response = await axios.post(
          "http://localhost:3000/income/createIncome",
          ingresoData,
          config
        );

        if (response.status === 200) {
          setFormData({
            fecha: "",
            monto: "",
            formaPago: "",
            categoria: "",
            descripcion: "",
          });
        }
        const successMessage =
          response.data.message || "Ingreso guardado exitosamente.";
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: successMessage,
        }); // Muestra el mensaje de éxito
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Capturamos el mensaje de error
      const errorMessage =
        error.response?.data?.error ||
        "Hubo un problema al guardar el ingreso. Inténtalo de nuevo.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      }); // Muestra el mensaje de error
    } finally {
      refresh()
      setLoading(false); // Desactivar el estado de carga
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "monto") {
      const regex = /^\d*\.?\d{0,2}$/;
      if (value === "" || regex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className={styles.todo_income}>
      <div className={styles.container_income}>
        <h1>Registrar Ingreso</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input_income}
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            required
          />

          <input
            className={styles.input_income}
            name="monto"
            placeholder="Monto"
            type="text"
            value={formData.monto}
            onChange={handleChange}
            required
          />

          <select
            className={styles.select_income}
            name="formaPago"
            value={formData.formaPago}
            onChange={handleChange}
            required
          >
            <option value="">Forma de Pago</option>
            {userList.map((incomeMethodPayment) => (
              <option
                key={incomeMethodPayment.incomeMethodPaymentId}
                value={incomeMethodPayment.incomeMethodPaymentId}
              >
                {incomeMethodPayment.incomeMethodPaymentName}
              </option>
            ))}
          </select>

          <select
            className={styles.select_income}
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Categoría</option>
            {categoryList.map((category) => (
              <option
                key={category.incomeCategoryId}
                value={category.incomeCategoryId}
              >
                {category.incomeName}
              </option>
            ))}
          </select>

          <input
            className={styles.input_incomeDescripcion}
            name="descripcion"
            placeholder="Descripción"
            type="text"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          <button
            className={styles.button_income}
            type="submit"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Income;
