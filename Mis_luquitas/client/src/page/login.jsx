import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import LogoImage from "../imagine/logo.png";
import styles from "../styles/loguin.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { signin } = useAuth();
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar mensajes de error

  const onSubmit = async (value) => {
    try {
      console.log("Datos enviados:", value); // Datos enviados para depuración
      const user = await signin(value);
      console.log("Respuesta de signin:", user); // Respuesta recibida

      // Verifica que el token sea válido
      if (!user || !user.userToken) {
        throw new Error("Datos de usuario no válidos");
      }

      localStorage.setItem("token", user.userToken);
      await fetchUserData();
      console.log("Token almacenado:", user.userToken);
      navigate("/home");
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops!",
         text:"Los datos no son correctos.Vuelve a intentar.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.header_Loguin}>
        <img src={LogoImage} alt="Descripción de la imagen" />
        <h1 className={styles.title_register}>Mis Luquitas</h1>
      </div>

      <div className={styles.login_container}>
        <h2>Iniciar sesión</h2>
        <hr />

        <form className={styles.Login_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {
                required: "Este campo es requerido", // Mensaje personalizado
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo electrónico inválido",
                },
              })}
            />
            {errors.email && (
              <span className={styles.error_message_login}>
                {errors.email.message}
              </span>
            )}

            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "Este campo es requerido", // Mensaje personalizado
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "La contraseña debe incluir al menos un número, una letra mayúscula, una letra minúscula y un carácter especial",
                },
              })}
            />
            {errors.password && (
              <span className={styles.error_message_login}>
                {errors.password.message}
              </span>
            )}
          </div>
          <hr />
          <button className={styles.button} type="submit">
            Ingresar
          </button>
          {errorMessage && (
            <div className={styles.error_message_login}>{errorMessage}</div>
          )}{" "}
          {/* Mostrar mensaje de error */}
          <div className={styles.restorePassword}>
            <Link to="/restorepassword" className={styles.link}>
              ¿Olvidaste tu contraseña?
            </Link>{" "}
            {/* Enlace a restaurar contraseña */}
            <Link to="/register" className={styles.link}>
              Crear cuenta nueva
            </Link>{" "}
            {/* Enlace a restaurar contraseña */}
          </div>
        </form>
      </div>
    </div>
  );
}

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");

    console.trace("identificando");

    const response = await axios.get(
      "https://devops-backend-grupo6.onrender.com/login/getUserProfile/" + token
    );

    localStorage.setItem("user", response.data);
  } catch (error) {
    console.error("Error al obtener el token:", error);
  }
};

// fetchUserData();

export default Login;
