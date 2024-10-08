import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import LogoImage from "../imagine/logo.png";
import styles from "../styles/loguin.module.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { signin } = useAuth();

  const [setErrorMessage] = useState("");

  const onSubmit = async (value) => {
    try {
      await signin(value);
    } catch (error) {
      setErrorMessage("Ups, los datos no son correctos. Vuelve a intentar"); // Manejo de errores
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
        <hr></hr>

        <form className={styles.Login_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo electrónico inválido",
                },
              })}
            />
            {errors.gmail && (
              <span className={styles.error_message_login}>
                {errors.gmail.message}
              </span>
            )}

            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: true,
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
          <hr></hr>
          <button className={styles.button} type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
