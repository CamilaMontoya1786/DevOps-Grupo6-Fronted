import React, { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form"; 
import { useAuth } from "../context/authContext"; 
import LogoImage from "../imagine/logo.png"; 
import styles from "../styles/register.module.css"; 
import axios from "axios"; 

function Register() {
  const [data, setData] = useState([]); 
  const [userList, setUserList] = useState([]); 
  const [showHelperMessage, setShowHelperMessage] = useState(false); 
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" }); 
  const { signup } = useAuth(); 
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/identification/identifications")
      .then((response) => {
        setData(response.data); 
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error); 
      });
      console.log(setData)
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/country/countries");
        setUserList(response.data); 
      } catch (error) {
        console.error("Error al obtener los datos:", error); 
      }
    };
    fetchUserData(); 
  }, []);

  const onSubmit = async (value) => {
    console.log("Submitting:", value); 
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
      <div className={styles.register_page}>
        <div className={styles.header_register}>
          <img src={LogoImage} alt="Descripción de la imagen" />
          <h1 className={styles.title_register}>Mis Luquitas</h1>
        </div>

        <div className={styles.body_register}>
          <h2>Registrarse</h2>
          <hr />

          {errorMessage && <span className={styles.error_message}>{errorMessage}</span>} {/* Muestra mensaje de error global */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputPadre}>
              <div className={styles.inputContainer}>
                <input
                  name="userName"
                  type="text"
                  placeholder="Nombre"
                  {...register("userName", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                      message: "El nombre solo puede contener letras",
                    },
                  })}
                  onBeforeInput={handleBeforeInput}
                />
                {errors.userName && (
                  <span className={styles.error_message}>{errors.userName.message}</span>
                )}

                <input
                  type="text"
                  placeholder="Apellido"
                  {...register("userLastName", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                      message: "Solo se permiten letras",
                    },
                  })}
                  onBeforeInput={handleBeforeInput}
                />
                {errors.userLastName && (
                  <span className={styles.error_message}>{errors.userLastName.message}</span>
                )}

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  {...register("email", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Formato de correo electrónico inválido",
                    },
                  })}
                />
                {errors.email && (
                  <span className={styles.error_message}>{errors.email.message}</span>
                )}

                <input
                  type="password"
                  placeholder="Contraseña"
                  onFocus={() => setShowHelperMessage(true)}
                  onBlur={() => setShowHelperMessage(false)}
                  {...register("password", {
                    required: "Este campo es obligatorio",
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
                {showHelperMessage && (
                  <span className={styles.helper_message}>
                    La contraseña debe incluir al menos un número, una letra mayúscula, una letra minúscula y un carácter especial
                  </span>
                )}
                {errors.password && (
                  <span className={styles.error_message}>{errors.password.message}</span>
                )}
              </div>

              <div className={styles.input_container}>
                <select {...register("typeId", { required: "Este campo es obligatorio" })}>
                  <option value="">Seleccione un tipo de documento...</option>
                  {data.map((identity) => (
                    <option key={identity.typeId} value={identity.typeId}>
                      {identity.idDescription} 
                    </option>
                  ))}
                </select>
                {errors.typeId && (
                  <span className={styles.error_message}>{errors.typeId.message}</span>
                )}

                <input
                  type="text"
                  placeholder="Número de documento"
                  {...register("idNumber", {
                    required: "Este campo es obligatorio",
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
                  <span className={styles.error_message}>{errors.idNumber.message}</span>
                )}

                <select {...register("countryId", { required: "Este campo es obligatorio" })}>
                  <option value="">Seleccione un país...</option>
                  {userList.map((country) => (
                    <option key={country.countryId} value={country.countryId}>
                      {country.countryName}
                    </option>
                  ))}
                </select>
                {errors.countryId && (
                  <span className={styles.error_message}>{errors.countryId.message}</span>
                )}

                <input
                  type="text"
                  placeholder="Número de teléfono"
                  {...register("phone", {
                    required: "Este campo es obligatorio",
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
                  <span className={styles.error_message}>{errors.phone.message}</span>
                )}
              </div>
            </div>
            <hr />
            <div className={styles.button_container}>
              <button type="submit" className={styles.button_register}>
                Registrar
              </button>

              <p className={styles.text1}> Todos los campos son obligatorios</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register; 
