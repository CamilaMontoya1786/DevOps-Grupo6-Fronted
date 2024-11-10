// Changepassword.js
import React, { useState, useEffect } from "react";
import password from '../styles/changePassword.module.css';
import LogoImage from "../imagine/logo.png";

function Changepassword() {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Efecto para gestionar la clase del body para estilos
  useEffect(() => {
    document.body.classList.add("special-body-restorepassword");

    // Limpieza al desmontar
    return () => {
      document.body.classList.remove("special-body-restorepassword");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordValue === confirmPassword && passwordValue !== "") {
      setMessage("Contraseña cambiada exitosamente.");
      setPasswordValue(""); // Limpiar el campo de contraseña
      setConfirmPassword(""); // Limpiar campo de confirmación
    } else if (passwordValue === "" || confirmPassword === "") {
      setMessage("Por favor, completa ambos campos.");
    } else {
      setMessage("Las contraseñas no coinciden.");
    }
  };

  return (
    <div className={password['restorepassword_page-password']}>
      <div className={password['header-password']}>
        <img className={password['LogoImage-password']} src={LogoImage} alt="Logo" />
        <h2 className={password['h2-password']}>Mis Luquitas</h2>
      </div>

      <form className={password['container-password']} onSubmit={handleSubmit}>
        <div>
          <h1 className={password['titulo-password']}>Crear nueva contraseña</h1>
          <hr />
          <input
            className={password['input-password']}
            type="password"
            placeholder="Nueva contraseña"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            required
          />
          <input
            className={password['input-password']}
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <hr />
        </div>

        <div className={password['button-password']}>
          <button className={password['button_1-password']} type="submit">
            Cambiar Contraseña
          </button>
        </div>
      </form>
      {message && <p className={password['p-password']}>{message}</p>}
    </div>
  );
}

export default Changepassword;
