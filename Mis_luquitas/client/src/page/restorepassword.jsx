import React, { useState, useEffect } from "react";
import "../styles/restorepassword.css";
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
    <div>
      <div className="header-restorepassword">
        <img src={LogoImage} alt="Descripción de la imagen" />
        <h2>Mis Luquitas</h2>
      </div>

      <form className="container-restorepassword" onSubmit={handleSubmit}>
        <div>
          <h1 className="titulo">Recuperar contraseña</h1>
          <hr></hr>
          <p className="parrafo">
            Ingresa tu correo electrónico para recibir un enlace de
            recuperación.{" "}
          </p>
          <input
            className="input-restorepassword"
            type="email"
            id="email"
            placeholder="Correo Electronico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <hr></hr>
        </div>
        <div className="button-container">
          <button className="button-restorepassword" type="submit">
            Enviar
          </button>
          <button className="button-restorepassword" type="submit">
            Cancelar
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Restorepassword;