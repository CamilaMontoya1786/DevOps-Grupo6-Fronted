import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import LogoImage from "../imagine/logo.png";
import "../styles/loguin.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { signin } = useAuth();
  
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (value) => {
    try {
      await signin(value);
    } catch (error) {
      setErrorMessage("Ups, los datos no son correctos. Vuelve a intentar"); // Manejo de errores
    }
  };

  return (
    <div>
      <div className="header_Loguin">
        <img src={LogoImage} alt="Descripción de la imagen" />
        <h1 id="title_register">Mis Luquitas</h1>
      </div>
      
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("gmail", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de correo electrónico inválido",
              },
            })}
          />
          {errors.gmail && (
                <span className="error-message-login">{errors.gmail.message}</span>
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
                <span className="error-message-login">{errors.password.message}</span>
              )}
              

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
