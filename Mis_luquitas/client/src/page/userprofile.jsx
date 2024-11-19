import  { useState, useEffect, useRef } from "react";
import {  useForm } from "react-hook-form";
import profile from "../styles/userprofile.module.css";
import axios from "axios";
import defaultProfileImage from "../imagine/usuario.png"; // Importa la imagen predeterminada
import Swal from "sweetalert2";

function UserProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState();
  const fileInputRef = useRef(null); // Referencia al input de archivo
 
  const [profileImage, setProfileImage] = useState(defaultProfileImage); // Inicia con la imagen predeterminada
  const [preview, setPreview] = useState(defaultProfileImage);

 

  useEffect(() => {
    const fetchCountries = async () => {
      try {
       
        const response = await axios.get("https://devops-backend-grupo6.onrender.com/country/countries"
        );
        setUserList(response.data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://devops-backend-grupo6.onrender.com/login/getUserProfile/" + token
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };

    fetchUserData();
    fetchCountries();

    axios
      .get("https://devops-backend-grupo6.onrender.com/identification/identifications")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);
  
  useEffect(() => {
    if (user) {
      setValue("userName", user.userName);
      setValue("userLastName", user.userLastName);
      setValue("idNumber", user.idNumber);
      setValue("email", user.email);
      setValue("countryId", user.countryId);
      setValue("phone", user.phone);
      setValue("typeId", user.typeId);
      setPreview(user.photoUser ? user.photoUser : defaultProfileImage);
    }
  }, [user]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("typeId", data.typeId);
    formData.append("email", data.email);
    formData.append("countryId", data.countryId);
    formData.append("phone", data.phone);
    formData.append("userName", data.userName);
    formData.append("userLastName", data.userLastName);
    formData.append("idNumber", data.idNumber);
    if (profileImage) {
      formData.append("photo", profileImage);
    }

    axios.post("https://devops-backend-grupo6.onrender.com/login/updateUser", formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Actualizando perfil:", data);
    try {
      Swal.fire({
        icon: "success",
        title: "Perfecto!",
        text: "Perfil actualizado con éxito",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Error al actualizar el perfil. Por favor, intenta de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Manejar la carga de la imagen desde el frontend
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Disparar el input de archivo cuando se hace clic en la imagen
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={profile["body-profile"]}>
     
      {/* Icono importado */}
      <div>
        <label
          htmlFor="profileImage"
          className={profile["profile-image-label"]}
        >
          {/* Muestra la imagen predeterminada o la nueva cargada */}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange} // Cambia la imagen cuando se selecciona una nueva
            className={profile["profile-image-input"]} // Usa la clase para ocultar el input
            ref={fileInputRef} // Referencia al input
            style={{ display: "none" }} // Oculta el input
          />
        </label>
        <img
          src={preview}
          alt="Imagen de perfil"
          className={profile["profile-image-preview"]}
          onClick={handleImageClick} // Maneja el clic en la imagen
          style={{ cursor: "pointer" }} // Añade un estilo de cursor para indicar que es clicable
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
              value={user?.userName ?? ""}
              disabled // Campo deshabilitado
            />

          </div>

          <div className={profile.left}>
            <input
              name="userLastName"
              type="text"
              placeholder="Apellido"
              value={user?.userLastName ?? ""}
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
            <input type="text" placeholder="Teléfono" {...register("phone")} />
          </div>
        </div>


        {/* Botón para actualizar perfil */}
        <div>
          <button
            onClick={() => {}}
            type="submit"
            className={profile["button-profile"]}
          >
            Actualizar Perfil
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
