import React, { useState, useEffect, useRef } from "react";
import { get, useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import profile from "../styles/userprofile.module.css";
import axios from "axios";
import icon from "../imagine/hogar.png";
import icon2 from "../imagine/salir-alt.png";
import defaultProfileImage from "../imagine/usuario.png"; // Importa la imagen predeterminada
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { user1, logout } = useAuth();
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState();
  const [profileImage, setProfileImage] = useState(defaultProfileImage); // Inicia con la imagen predeterminada
  const fileInputRef = useRef(null); // Referencia al input de archivo. 
  const [showHelperMessage, setShowHelperMessage] = useState(false); 
  
  const navigate = useNavigate();
  

  const handleClick = () => {
    navigate("/Home"); // Navega a /Home
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/country/countries"
        );
        setUserList(response.data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem ("token");
        const response = await axios.get(
          "http://localhost:3000/login/getUserProfile/"+ token
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };
    
    fetchUserData();

    fetchCountries();

    axios
      .get("http://localhost:3000/identification/identifications")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });

    if (user) {
      setValue("userName", user.userName);
      setValue("userLastName", user.userLastName);
      setValue("idNumber", user.idNumber);
      setValue("email", user.email);
      setValue("countryId", user.countryId);
      setValue("phone", user.phone);
      setValue("typeId", user.typeId);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    console.log("Actualizando perfil:", data);
    try {
      console.log("Perfil actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setErrorMessage(
        "Error al actualizar el perfil. Por favor, intenta de nuevo."
      );
    }
  };

  // Manejar la carga de la imagen desde el frontend
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Actualiza la imagen con la seleccionada
    }
  };

  // Disparar el input de archivo cuando se hace clic en la imagen
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className={profile["body-profile"]}>
        <button
          type="button"
          className={profile["back-button"]}
          onClick={handleClick}
        >
          Regresar
        </button>
        <img
          className={profile["icon-house"]}
          src={icon}
          alt="Icono de regresar"
        />{" "}
        {/* Icono importado */}
        <button
          type="button"
          className={profile["logout-button"]}
          onClick={logout}
        >
          Cerrar sesión
        </button>
        <img
          className={profile["icon-close"]}
          src={icon2}
          alt="Icono de cerrar sesión"
        />{" "}
        {/* Icono importado */}
        <div>
          <label
            htmlFor="profileImage"
            className={profile["profile-image-label"]}
          >
            {/* Muestra la imagen predeterminada o la nueva cargada */}
            <img
              src={profileImage}
              alt="Imagen de perfil"
              className={profile["profile-image-preview"]}
              onClick={handleImageClick} // Maneja el clic en la imagen
              style={{ cursor: "pointer" }} // Añade un estilo de cursor para indicar que es clicable
            />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange} // Cambia la imagen cuando se selecciona una nueva
            className={profile["profile-image-input"]} // Usa la clase para ocultar el input
            ref={fileInputRef} // Referencia al input
            style={{ display: "none" }} // Oculta el input
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={profile.container}>
          <h2>Perfil de Usuario</h2>

          {/* Contenedor principal para todos los inputs */}
          <div className={profile["input-container"]}>
            {/* Nombre y Apellido */}
            <div className={profile.left}>
              <input
                name="userName"
                type="text"
                placeholder="Nombre"
               value={user?.userName ?? ''}
                disabled // Campo deshabilitado
              />
            </div>

            <div className={profile.left}>
              <input
                name="userLastName"
                type="text"
                placeholder="Apellido"
                value={user?.userLastName ?? ''}
                disabled // Campo deshabilitado
              />
            </div>

            {/* Tipo de documento y número de documento */}
            <div className={profile.right}>
              <select {...register("typeId")}>
                <option value="">Seleccione un tipo de documento...</option>
                {data.map((identity) => (
                  <option key={identity.typeId} value={identity.typeId}>
                    {identity.idDescription}
                  </option>
                ))}
              </select>
            </div>

            <div className={profile.right}>
              <input
                type="text"
                placeholder="Número de documento"
                {...register("idNumber")}
                disabled // Campo deshabilitado
              />
            </div>

            {/* Correo electrónico y país */}
            <div className={profile.left}>
              <input
                type="email"
                placeholder="Correo electrónico"
                {...register("email")}
              />
            </div>

            <div className={profile.right}>
              <select {...register("countryId")}>
                <option value="">Seleccione un país...</option>
                {userList.map((country) => (
                  <option key={country.countryId} value={country.countryId}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Teléfono */}
            <div className={profile.right}>
              <input
                type="text"
                placeholder="Teléfono"
                {...register("phone")}
              />
            </div>

            {/* Contraseña */}
            <div className={profile.left}>
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
                onFocus={() => setShowHelperMessage(true)} // Muestra el mensaje al hacer clic
                onBlur={() => setShowHelperMessage(false)} // Oculta el mensaje al salir del campo
              />
              {showHelperMessage && (
                <span className={profile.message}>
                  La contraseña debe incluir al menos un número, una letra
                  mayúscula, una letra minúscula y un carácter especial
                </span>
              )}
              {errors.password && (
                <span className={`${profile["error-message"]}`}>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          {/* Botón para actualizar perfil */}
          <div>
            <button type="submit" className={profile["button-profile"]}>
              Actualizar Perfil
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
