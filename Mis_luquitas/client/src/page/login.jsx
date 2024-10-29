import React, { useState } from "react"; // Importa React y el hook useState
import { useForm } from "react-hook-form"; // Importa el hook useForm para manejar formularios
import { useAuth } from "../context/authContext"; // Importa el contexto de autenticación
import LogoImage from "../imagine/logo.png"; // Importa la imagen del logo
import styles from "../styles/loguin.module.css"; // Importa los estilos para el componente
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // Inicializa el hook useForm para manejar la validación del formulario
  const {
    register, // Método para registrar los inputs en el formulario
    handleSubmit, // Método para manejar el envío del formulario
    formState: { errors }, // Estado de los errores en el formulario
  } = useForm({ mode: "onBlur" }); // Establece el modo de validación a "onBlur"

  const { signin,user} = useAuth(); // Extrae la función de inicio de sesión del contexto de autenticación

  // Estado para almacenar mensajes de error
  const [setErrorMessage] = useState("");


  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (value) => {
    try {
      
      await signin(value); // Llama a la función de inicio de sesión con los datos del formulario
     
      
      const token = user.userToken;
      localStorage.setItem('token', token);
      console.log(token.userName)
      navigate('/home');
    } catch (error) {
      // Manejo de errores en caso de que el inicio de sesión falle
      setErrorMessage("Ups, los datos no son correctos. Vuelve a intentar");
    }
  };
 
  return (
    <div className={styles.login_page}> {/* Contenedor principal de la página de inicio de sesión  hola*/}
      <div className={styles.header_Loguin}> {/* Encabezado de la página */}
        <img src={LogoImage} alt="Descripción de la imagen" /> {/* Logo de la aplicación */}
        <h1 className={styles.title_register}>Mis Luquitas</h1> {/* Título de la aplicación */}
      </div>

      <div className={styles.login_container}> {/* Contenedor del formulario de inicio de sesión */}
        <h2>Iniciar sesión</h2> {/* Título del formulario */}
        <hr></hr> {/* Línea divisoria */}

        <form className={styles.Login_form} onSubmit={handleSubmit(onSubmit)}> {/* Formulario que maneja el envío */}
          <div className={styles.inputContainer}> {/* Contenedor de los inputs */}
            <input
              type="email" // Tipo de input para el correo electrónico
              placeholder="Correo electrónico" // Texto de ayuda
              {...register("email", { // Registra el campo de correo
                required: true, // Campo requerido
                pattern: { // Validación del patrón de correo electrónico
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo electrónico inválido", // Mensaje de error
                },
              })}
            />
            {errors.email && ( // Muestra mensaje de error si hay un error en el correo
              <span className={styles.error_message_login}>
                {errors.email.message}
              </span>
            )}

            <input
              type="password" // Tipo de input para la contraseña
              placeholder="Contraseña" // Texto de ayuda
              {...register("password", { // Registra el campo de contraseña
                required: true, // Campo requerido
                minLength: { // Validación para la longitud mínima
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres", // Mensaje de error
                },
                pattern: { // Validación del patrón de la contraseña
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message: "La contraseña debe incluir al menos un número, una letra mayúscula, una letra minúscula y un carácter especial", // Mensaje de error
                },
              })}
            />
            {errors.password && ( // Muestra mensaje de error si hay un error en la contraseña
              <span className={styles.error_message_login}>
                {errors.password.message}
              </span>
            )}
          </div>
          <hr></hr> {/* Línea divisoria */}
          <button className={styles.button} type="submit"> {/* Botón para enviar el formulario */}
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login; // Exporta el componente Login
