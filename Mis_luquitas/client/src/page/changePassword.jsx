import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; // Asegúrate de que axios esté instalado
import password from "../styles/changePassword.module.css";
import LogoImage from "../imagine/logo.png";

function Changepassword() {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Capturar token y email desde los parámetros de la URL
  const { tokenEmail, email } = useParams();

  const navigate = useNavigate();

  // Efecto para gestionar la clase del body para estilos
  useEffect(() => {
    document.body.classList.add("special-body-restorepassword");

    return () => {
      document.body.classList.remove("special-body-restorepassword");
    };
  }, []);

  // Función para enviar la nueva contraseña al servidor
  const changePassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/reset/resetPassword/${tokenEmail}`,
        {
          email: email,
          newPassword: passwordValue,
        }
      );

      if (response.status === 200) {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "¡Súper!",
          text: response.data.message || "Contraseña cambiada exitosamente.",
        });

        setPasswordValue("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        // Mostrar mensaje de error del servidor
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: response.data.message || "Error al cambiar la contraseña.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Ocurrió un error. Inténtalo de nuevo más tarde.",
      });
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordValue === confirmPassword && passwordValue !== "") {
      changePassword(); // Llamar al método POST si las contraseñas coinciden
    } else if (passwordValue === "" || confirmPassword === "") {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Por favor, completa ambos campos.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Las contraseñas no coinciden.",
      });
    }
  };

  return (
    <div className={password["restorepassword_page-password"]}>
      <div className={password["header-password"]}>
        <img
          className={password["LogoImage-password"]}
          src={LogoImage}
          alt="Logo"
        />
        <h2 className={password["h2-password"]}>Mis Luquitas</h2>
      </div>

      <form className={password["container-password"]} onSubmit={handleSubmit}>
        <div>
          <h1 className={password["titulo-password"]}>
            Crear nueva contraseña
          </h1>

          <hr />
          <input
            className={password["input-password"]}
            type="password"
            placeholder="Nueva contraseña"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            required
          />
          <input
            className={password["input-password"]}
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <hr />
        </div>

        <div className={password["button-password"]}>
          <button className={password["button_1-password"]} type="submit">
            Cambiar Contraseña
          </button>
        </div>
      </form>
      {message && <p className={password["p-password"]}>{message}</p>}
    </div>
  );
}

export default Changepassword;
