import axios  from "./axios";
/*conexion backend - frontend*/

export const registerRequest = user => axios.post('/loguin/create',user)