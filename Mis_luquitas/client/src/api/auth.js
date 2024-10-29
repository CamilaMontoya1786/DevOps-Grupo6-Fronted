import axios  from "./axios";
/*conexion backend - frontend*/


export const registerRequest = user => axios.post('/login/createUser',user)
export const loguinRequest = async (user) => {
  try {
    const response = await axios.post('/login/login', user);
    console.log("Respuesta del backend:", response.data); // Agrega este log
    return response.data;
  } catch (error) {
    console.error("Error en loguinRequest:", error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};


//export const userProfileRequest = user => axios.post('/login/login',user) ???

