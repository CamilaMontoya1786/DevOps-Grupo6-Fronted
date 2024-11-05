import React, { useState, useEffect } from 'react';
import { updateMovimiento, deleteMovimiento } from '../api/auth';
import styles from '../styles/movementItem.module.css';
import editIcon from '../imagine/lapiz.png';
import deleteIcon from '../imagine/eliminar.png';

const MovementItem = ({ movimiento, setMovimientos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovimiento, setEditedMovimiento] = useState(movimiento);

  useEffect(() => {
    setEditedMovimiento(movimiento);
  }, [movimiento]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    setMovimientos(prev => prev.map(m => m.id === movimiento.id ? editedMovimiento : m));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setMovimientos(prev => prev.filter(m => m.id !== movimiento.id));
  };

  return (
    <tr className={styles.row}>
      <td className={styles.fecha}>{isEditing ? (
        <input 
          type="date" 
          value={editedMovimiento.fecha} 
          onChange={(e) => setEditedMovimiento({ ...editedMovimiento, fecha: e.target.value })}
        />
      ) : editedMovimiento.fecha}</td>
      
      <td className={`${styles.monto} ${editedMovimiento.monto < 0 ? styles.amountNegative : ''}`}>
        {isEditing ? (
          <input 
            type="number" 
            value={editedMovimiento.monto} 
            onChange={(e) => setEditedMovimiento({ ...editedMovimiento, monto: parseFloat(e.target.value) })}
          />
        ) : editedMovimiento.monto}
      </td>
      
      <td className={styles.categoria}>{isEditing ? (
        <input 
          type="text" 
          value={editedMovimiento.categoria} 
          onChange={(e) => setEditedMovimiento({ ...editedMovimiento, categoria: e.target.value })}
        />
      ) : editedMovimiento.categoria}</td>
      
      <td className={styles.formaPago}>{isEditing ? (
        <input 
          type="text" 
          value={editedMovimiento.formaPago} 
          onChange={(e) => setEditedMovimiento({ ...editedMovimiento, formaPago: e.target.value })}
        />
      ) : editedMovimiento.formaPago}</td>
      
      <td className={styles.descripcion}>{isEditing ? (
        <input 
          type="text" 
          value={editedMovimiento.descripcion} 
          onChange={(e) => setEditedMovimiento({ ...editedMovimiento, descripcion: e.target.value })}
        />
      ) : editedMovimiento.descripcion}</td>
      
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

export default MovementItem;
