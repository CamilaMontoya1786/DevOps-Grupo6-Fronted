import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/restorePassword.module.css';
import LogoImage from "../imagine/logo.png";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Restorepassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("special-body-restorepassword");
    return () => {
      document.body.classList.remove("special-body-restorepassword");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        // Aquí defines la URL de tu API y envías el correo
        const response = await axios.post("http://localhost:3000/requestReset/findEmail", { email });
    
        if (response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un problema al enviar el correo. Inténtalo de nuevo.',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Se ha enviado un enlace de recuperación a tu correo.',
            confirmButtonText: 'Aceptar',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'Error al conectar con el servidor.',
          confirmButtonText: 'Aceptar',
        });
        console.error(error);
      }

      setEmail(""); // Limpiar el campo de email
    } else 
    {Swal.fire({
      icon: 'error',
          title: '¡Error!',
          text: 'Por favor, ingresa un correo electrónico válido.',
          confirmButtonText: 'Aceptar',
    });
    }
  };

  const handleCancel = () => {
    setMessage("Proceso cancelado");
    navigate('/login');
  };

  return (
    <div className={styles.restorepassword_page}>
      <div className={styles.header}>
        <img className={styles.LogoImage} src={LogoImage} alt="Logo" />
        <h2 className={styles.h2}>Mis Luquitas</h2>
      </div>

      <form className={styles.container} onSubmit={handleSubmit}>
        <div>
          <h1 className={styles.titulo}>Recuperar contraseña</h1>
          <hr />
          <p className={styles.parrafo}>
            Ingresa tu correo electrónico para recibir un enlace de recuperación.
          </p>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ zIndex: 10, pointerEvents: "auto" }}
          />
          <hr />
        </div>

        <div className={styles.button}>
          <button className={styles.button_1} type="submit">
            Enviar
          </button>
          <button className={styles.button_1} 
          type="button" 
          onClick={(handleCancel) }>
            Cancelar
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Restorepassword;
