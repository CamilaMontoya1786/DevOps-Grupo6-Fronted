import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import LogoImage from "../imagine/logo.png";
import "../styles/register.css";

// Lista de países
const countries = [
  "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda",
  // Agrega aquí los demás países
];

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { signup } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (value) => {
    try {
      await signup(value);
    } catch (error) {
      setErrorMessage("Error al registrarse. Por favor, intenta de nuevo."); // Manejo de errores
    }
  };

  const handleBeforeInput = (event) => {
    const char = event.data;
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/.test(char)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="header-register">
        <img src={LogoImage} alt="Descripción de la imagen" />
        <h1 id="title_register">Mis Luquitas</h1>
      </div>

      <div className="body_register">
        <h2>Registrarse</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <div className="input-container">
            <div className="left">
              <input
                type="text"
                placeholder="Nombre"
                {...register("name", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "El nombre solo puede contener letras",
                  },
                })}
                onBeforeInput={handleBeforeInput}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="right">
              <input
                type="text"
                placeholder="Apellido"
                {...register("lastname", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
                onBeforeInput={handleBeforeInput}
              />
              {errors.lastname && (
                <span className="error-message1">{errors.lastname.message}</span>
              )}
            </div>
          </div>

          {/* Campo de tipo de documento y número de documento */}
          <div className="input-container">
            <div className="left">
              <select {...register("documentType", { required: true })}>
                <option value="">Tipo de Documento...</option>
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="TI">Tarjeta de Identidad (TI)</option>
                <option value="RC">Registro Civil (RC)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="CI">Carné de Identidad (CI)</option>
                <option value="DNI">Documento Nacional de Identidad (DNI)</option>
              </select>
              {errors.documentType && (
                <span className="error-message">{errors.documentType.message}</span>
              )}
            </div>
            <div className="right">
              <input
                type="text"
                placeholder="Número de documento"
                {...register("document", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{6,10}$/,
                    message: "El número de documento debe tener entre 6 y 10 dígitos",
                  },
                })}
                onBeforeInput={(event) => {
                  const char = event.data;
                  if (!/^[0-9]$/.test(char)) {
                    event.preventDefault();
                  }
                }}
              />
              {errors.document && (
                <span className="error-message2">{errors.document.message}</span>
              )}
            </div>
          </div>

          {/* Campo de correo electrónico */}
          <div className="input-container">
            <div className="left">
              <input id="Contraseña"
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
                <span className="error-message">{errors.gmail.message}</span>
              )}
            </div>

            {/* Campo de país */}
            <div className="right">
              <select {...register("country", { required: true })}>
                <option value="">Seleccione un país...</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="error-message1">{errors.country.message}</span>
              )}
            </div>
          </div>

          {/* Campo de contraseña */}
          <div className="input-container">
            <div className="left">
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
                    message: "La contraseña debe incluir al menos un número, una letra mayúscula, una letra minúscula y un carácter especial",
                  },
                })}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>
            <div className="right">
              <input
                type="text"
                placeholder="Número de teléfono"
                {...register("phone", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{7,15}$/,
                    message: "El número de teléfono debe tener entre 7 y 15 dígitos",
                  },
                })}
                onBeforeInput={(event) => {
                  const char = event.data;
                  if (!/^[0-9]$/.test(char)) {
                    event.preventDefault();
                  }
                }}
              />
              {errors.phone && (
                <span className="error-message1">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="button-register">Registrar</button>
            <p className="text1">* Los campos son obligatorios</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
