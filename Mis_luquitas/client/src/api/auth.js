import axios from "./axios";

// Conexión backend - frontend

export const registerRequest = (user) => axios.post('/login/createUser', user);

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
  const { id, type } = movimiento;
  const endpoint = type === "income" ? "/income" : "/expense";
  const response = await axios.put(`${API_URL}${endpoint}/${id}`, movimiento);
  return response.data;
};

export const deleteMovimiento = async (id, type) => {
  const endpoint = type === "income" ? "/income" : "/expense";
  await axios.delete(`${API_URL}${endpoint}/${id}`);
};

export const getCategorias = async () => {
  try {
    const response = await axios.get('/api/categorias');  // Asegúrate de que esta URL sea la correcta
    return response.data;  // Devuelve los datos de las categorías
  } catch (error) {
    console.error("Error al obtener las categorías", error);
    throw error; // Lanza el error para manejarlo en el componente si es necesario
  }
};

// Modificación de getFormasPago para usar axios
export const getFormasPago = async () => {
  try {
    const response = await axios.get('/api/formas_pago');  // URL de las formas de pago
    return response.data;  // Asumimos que 'data' es un array de formas de pago
  } catch (error) {
    console.error("Error al obtener las formas de pago", error);
    throw error;  // Lanza el error para manejarlo en el componente si es necesario
  }
};

// Función para obtener los movimientos filtrados
export const fetchMovimientosConFiltro = async (search, dateFilter) => {
  try {
    // Construir los parámetros de consulta (query params)
    const params = {};

    if (search) {
      params.search = search;  // Si hay búsqueda, agregar al filtro
    }
    if (dateFilter) {
      params.dateFilter = dateFilter;  // Si hay filtro por fecha, agregar
    }

    // Hacer la petición GET con los parámetros de consulta
    const response = await axios.get(`${BASE_URL}/movimientos`, { params });

    // Retornar los datos filtrados recibidos del backend
    return response.data;
  } catch (error) {
    console.error('Error al obtener los movimientos filtrados:', error);
    throw error;  // Lanza el error para que lo maneje el componente
  }
};