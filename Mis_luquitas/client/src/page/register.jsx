import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import LogoImage from "../imagine/logo.png";
import "../styles/register.css";
import axios from 'axios';

function Register() {
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { signup } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3000/identification/identifications')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/country/countries');
        setUserList(response.data); 
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchUserData();
  }, []);

  const onSubmit = async (value) => {
    console.log("Submitting:", value); // Verificar que se envían los datos
    try {
      await signup(value);
      console.log("Registro exitoso");
    } catch (error) {
      console.error("Error al registrarse:", error);
      setErrorMessage("Error al registrarse. Por favor, intenta de nuevo.");
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
                name="userName"
                type="text"
                placeholder="Nombre"
                {...register("userName", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "El nombre solo puede contener letras",
                  },
                })}
                onBeforeInput={handleBeforeInput}
              />
              {errors.userName && (
                <span className="error-message">{errors.userName.message}</span>
              )}
            </div>

            <div className="right">
              <input
                type="text"
                placeholder="Apellido"
                {...register("userLastName", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
                onBeforeInput={handleBeforeInput}
              />
              {errors.userLastName && (
                <span className="error-message1">{errors.userLastName.message}</span>
              )}
            </div>
          </div>

          {/* Campo de tipo de documento y número de documento */}
          <div className="input-container">
            <div className="left">
              <select {...register("typeId", { required: true })}>
                <option value="">Seleccione un tipo de documento...</option>
                {data.map((identity) => (
                  <option key={identity.typeId} value={identity.typeId}>
                    {identity.idDescription}
                  </option>
                ))}
              </select>
              {errors.typeId && (
                <span className="error-message">{errors.typeId.message}</span>
              )}
            </div>
            <div className="right">
              <input
                type="text"
                placeholder="Número de documento"
                {...register("idNumber", {
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
              {errors.idNumber && (
                <span className="error-message2">{errors.idNumber.message}</span>
              )}
            </div>
          </div>

          {/* Campo de correo electrónico */}
          <div className="input-container">
            <div className="left">
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
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            {/* Campo de país */}
            <div className="right">
            <select {...register("countryId", { required: true })}>
    <option value="">Seleccione un país...</option>
    {userList.map((country) => (
      <option key={country.countryId} value={country.countryId}>
        {`${country.countryId}. ${country.countryName}`} {/* Muestra el ID y el nombre del país aquí */}
      </option>
    ))}
  </select>
              {errors.countryId && (
                <span className="error-message1">{errors.countryId.message}</span>
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
