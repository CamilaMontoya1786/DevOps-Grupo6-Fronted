import  { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/expenses.module.css";
import Swal from "sweetalert2";

function Expenses({ modoEdicion = false, expense = null, refresh }) {
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
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/expenseMethodPayment/expenseMethodPayments"
        );
        setUserList(response.data);
      } catch (error) {
        console.error("Error al obtener los métodos de pago:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/expenseCategory/expenseCategories"
        );
        setCategoryList(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategoryData();
  }, []);

  useEffect(() => {
    if (expense) {
      setFormData({
        formaPago: expense.expenseMethodPaymentId,
        categoria: expense.expenseCategoryId,
        descripcion: expense.expenseDescription,
        fecha: expense.expenseDate,
        monto: expense.expenseAmount,
      });
    }
  }, [expense]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Activar el estado de carga

    const expenseData = {
      expenseDate: formData.fecha,
      expenseAmount: parseFloat(formData.monto),
      expenseMethodPaymentId: formData.formaPago,
      expenseCategoryId: formData.categoria,
      expenseDescription: formData.descripcion,
    };

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          authorization: `${token}`,
        },
      };
      
      if (modoEdicion) {
        const response = await axios.post(
          "http://localhost:3000/expense/updateExpense/" + expense.expenseId,
          expenseData,
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
          response.data.message || "Gasto actaulizado exitosamente.";
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: successMessage,
        }); // Muestra el mensaje de éxito
      } else {
        const response = await axios.post(
          "http://localhost:3000/expense/createExpense",
          expenseData,
          config
        );

        if (response.status === 201) {
          alert("Gasto guardado exitosamente.");
          setFormData({
            fecha: "",
            monto: "",
            formaPago: "",
            categoria: "",
            descripcion: "",
          });
        }
        const successMessage =
          response.data.message || "Gasto guardado exitosamente.";
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: successMessage,
        }); // Muestra el mensaje de éxito
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Capturamos el mensaje de error
      const errorMessage =error.response?.data?.error ||"Hubo un problema al guardar el gasto. Inténtalo de nuevo.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      }); // Muestra el mensaje de error
    } finally {
      refresh();
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
    <div className={styles.todo_expenses}>
      <div className={styles.container_expenses}>
        <h1>Registrar Gasto</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input_expenses}
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            required
          />

          <input
            className={styles.input_expenses}
            name="monto"
            placeholder="Monto"
            type="text"
            value={formData.monto}
            onChange={handleChange}
            required
          />

          <select
            className={styles.select_expenses}
            name="formaPago"
            value={formData.formaPago}
            onChange={handleChange}
            required
          >
            <option value="">Forma de Pago</option>
            {userList.map((expenseMethodPayment) => (
              <option
                key={expenseMethodPayment.expenseMethodPaymentId}
                value={expenseMethodPayment.expenseMethodPaymentId}
              >
                {expenseMethodPayment.expenseMethodPaymentName}
              </option>
            ))}
          </select>

          <select
            className={styles.select_expenses}
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Categoría</option>
            {categoryList.map((expenseCategory) => (
              <option
                key={expenseCategory.expenseCategoryId}
                value={expenseCategory.expenseCategoryId}
              >
                {expenseCategory.categoryName}
              </option>
            ))}
          </select>

          <input
            className={styles.input_expensesDescripcion}
            name="descripcion"
            placeholder="Descripción"
            type="text"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          <button
            className={styles.button_expenses}
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

export default Expenses;
