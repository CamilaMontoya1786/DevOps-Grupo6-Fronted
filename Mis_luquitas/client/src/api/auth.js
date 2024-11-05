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

export const getMovimientos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateMovimiento = async (movimiento) => {
  const response = await axios.put(`${API_URL}/${movimiento.id}`, movimiento);
  return response.data;
};

export const deleteMovimiento = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};



