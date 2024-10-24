import React, { useState, useEffect } from "react";
import styles from '../styles/restorePassword.module.css';
import LogoImage from "../imagine/logo.png";

function Restorepassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Efecto para gestionar la clase del body para estilos
  useEffect(() => {
    document.body.classList.add("special-body-restorepassword"); // Agrega clase especial al montarse

    // Función de limpieza para eliminar la clase al desmontarse
    return () => {
      document.body.classList.remove("special-body-restorepassword");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de una llamada API
    if (email) {
      setMessage("Se ha enviado un enlace de recuperación a tu correo.");
      setEmail(""); // Limpiar el campo de email
    } else {
      setMessage("Por favor, ingresa un correo electrónico válido.");
    }
  };

  return (
    <div className={styles.restorepassword_page}>
      <div className={styles.header}>
        <img className={styles.LogoImage} src={LogoImage} alt="Descripción de la imagen" />
        <h2 className={styles.h2}>Mis Luquitas</h2>
      </div>

      <form className={styles.container} onSubmit={handleSubmit}>
        <div >
          <h1 className={styles.titulo}>Recuperar contraseña</h1>
          <hr></hr>
          <p className={styles.parrafo}>
            Ingresa tu correo electrónico para recibir un enlace de
            recuperación.{" "}
          </p>
          <input className={styles.input}
            type="email"
            id="email"
            placeholder="Correo Electronico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <hr></hr>
        </div>


        <div className={styles.button}>
          <button className={styles.button_1} type="submit">
            Enviar
          </button>
          <button className={styles.button_1}  type="submit">
            Cancelar
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Restorepassword;