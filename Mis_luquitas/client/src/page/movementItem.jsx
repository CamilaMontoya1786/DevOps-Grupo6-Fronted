import React, { useState, useEffect } from 'react';
import editIcon from '../imagine/lapiz.png';
import deleteIcon from '../imagine/eliminar.png';
import styles from '../styles/movementItem.module.css';
import { getFormasPago, getCategorias } from '../api/auth';  // Importar las funciones para obtener categorías

const MovimientoItem = ({ movimiento, setMovimientos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovimiento, setEditedMovimiento] = useState(movimiento);
  const [formasPago, setFormasPago] = useState([]);  // Estado para almacenar las formas de pago
  const [categorias, setCategorias] = useState([]);  // Estado para almacenar las categorías

  // Cargar las formas de pago desde el backend solo una vez
  useEffect(() => {
    const fetchFormasPago = async () => {
      try {
        const data = await getFormasPago();  // Trae las formas de pago
        setFormasPago(data);  // Guardamos las formas de pago en el estado
      } catch (error) {
        console.error("Error al obtener las formas de pago", error);
      }
    };

    fetchFormasPago();  // Ejecuta la función cuando el componente se monta
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  // Cargar las categorías desde el backend solo una vez
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();  // Trae las categorías desde el backend
        setCategorias(data);  // Guardamos las categorías en el estado
      } catch (error) {
        console.error("Error al obtener las categorías", error);
      }
    };

    fetchCategorias();  // Ejecuta la función cuando el componente se monta
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  // Mantener el estado del movimiento actualizado cuando el componente reciba nuevos datos
  useEffect(() => {
    setEditedMovimiento(movimiento);
  }, [movimiento]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      setMovimientos((prev) =>
        prev.map((m) => (m.id === editedMovimiento.id ? editedMovimiento : m))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el movimiento", error);
    }
  };

  const handleDelete = async () => {
    try {
      setMovimientos((prev) => prev.filter((m) => m.id !== editedMovimiento.id));
    } catch (error) {
      console.error("Error al eliminar el movimiento", error);
    }
  };

  return (
    <tr className={styles.row}>
      <td className={styles.fecha}>
        {isEditing ? (
          <input
            type="date"
            value={editedMovimiento.fecha}
            onChange={(e) => setEditedMovimiento({ ...editedMovimiento, fecha: e.target.value })}
          />
        ) : editedMovimiento.fecha}
      </td>

      <td className={`${styles.monto} ${editedMovimiento.type === 'expense' ? styles.amountNegative : ''}`}>
        {isEditing ? (
          <input
            type="number"
            value={editedMovimiento.monto}
            onChange={(e) => setEditedMovimiento({ ...editedMovimiento, monto: parseFloat(e.target.value) })}
          />
        ) : editedMovimiento.monto}
      </td>

      <td className={styles.categoria}>
        {isEditing ? (
          <select
            value={editedMovimiento.categoria}  // Muestra la categoría actualmente seleccionada
            onChange={(e) => setEditedMovimiento({ ...editedMovimiento, categoria: e.target.value })}
          >
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))
            ) : (
              <option value={editedMovimiento.categoria}>{editedMovimiento.categoria}</option>  // Muestra el valor actual si no hay categorías
            )}
          </select>
        ) : (
          <span>{editedMovimiento.categoria}</span>  // Muestra la categoría actual si no estás editando
        )}
      </td>

      <td className={styles.formaPago}>
        {isEditing ? (
          <select
            value={editedMovimiento.formaPago}  // Muestra la forma de pago actualmente seleccionada
            onChange={(e) => setEditedMovimiento({ ...editedMovimiento, formaPago: e.target.value })}
          >
            {formasPago.length > 0 ? (
              formasPago.map((formaPago) => (
                <option key={formaPago} value={formaPago}>
                  {formaPago}
                </option>
              ))
            ) : (
              <option value={editedMovimiento.formaPago}>{editedMovimiento.formaPago}</option>  // Muestra el valor actual si no hay formas de pago
            )}
          </select>
        ) : (
          <span>{editedMovimiento.formaPago}</span>  // Muestra la forma de pago actual si no estás editando
        )}
      </td>

      <td className={styles.descripcion}>
        {isEditing ? (
          <input
            type="text"
            value={editedMovimiento.descripcion}
            onChange={(e) => setEditedMovimiento({ ...editedMovimiento, descripcion: e.target.value })}
          />
        ) : editedMovimiento.descripcion}
      </td>
      <td className={styles.acciones}>
        <button className={styles.editButton} onClick={isEditing ? handleSave : handleEditToggle}>
          {isEditing ? 'Guardar' : <img src={editIcon} alt="Edit" className={styles.icon} />}
        </button>
      </td>
      <td className={styles.acciones}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <img src={deleteIcon} alt="Delete" className={styles.icon} />
        </button>
      </td>
    </tr>
  );
};

export default MovimientoItem;
