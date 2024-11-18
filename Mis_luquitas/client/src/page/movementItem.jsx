import React, { useState } from "react";
import { deleteMovimiento } from "../api/auth";
import Expenses from "./expenses";
import Income from "./income";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import styles from "../styles/movementItem.module.css"; // Importa el CSS Module para los estilos de movimiento
import style from "../styles/ModalStyles.module.css";
import deleteIcon from "../imagine/eliminar.png";
import editIcon from "../imagine/lapiz.png";

const MovimientoItem = ({ movimiento, refresh }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Modal */}
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        {/* Icono de cerrar */}
        <button onClick={closeModal} className={style.closeModalBtn}>
          <MdClose size={24} />
        </button>

        {movimiento.type === "expense" ? (
          <Expenses modoEdicion={true} expense={movimiento} refresh={refresh} />
        ) : (
          <Income modoEdicion={true} income={movimiento} refresh={refresh} />
        )}
      </Modal>

      {/* Fila de movimiento */}

      <tr className={style.Texto}>
        <td>
          {movimiento.expenseDate
            ? movimiento.expenseDate
            : movimiento.incomeDate}
        </td>
        <td className={movimiento.expenseAmount ? styles.redText : ""}>
          {movimiento.expenseAmount
            ? `-$ ${movimiento.expenseAmount.toLocaleString("es-CO")}`
            : `$ ${movimiento.incomeAmount.toLocaleString("es-CO")}`}
        </td>
        <td>
          {movimiento.expenseCategory
            ? movimiento.expenseCategory
            : movimiento.incomeCategory}
        </td>
        <td>
          {movimiento.expenseMethodPayment
            ? movimiento.expenseMethodPayment
            : movimiento.incomeMethodPayment}
        </td>
        <td>
          {movimiento.expenseDescription
            ? movimiento.expenseDescription
            : movimiento.incomeDescription}
        </td>
        <td>
          <button className={styles.editButton} onClick={openModal}>
            <img src={editIcon} alt="Edit" className={styles.icon} />
          </button>
        </td>
        <td>
          <button
            className={styles.deleteButton}
            onClick={() => {
              deleteMovimiento(
                movimiento.expenseId
                  ? movimiento.expenseId
                  : movimiento.incomeId,
                movimiento.type
              );
              refresh();
            }}
          >
            <img src={deleteIcon} alt="Delete" className={styles.icon} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default MovimientoItem;
