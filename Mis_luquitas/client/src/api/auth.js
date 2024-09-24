import axios  from "./axios";
/*conexion backend - frontend*/

export const registerRequest = user => axios.post('/loguin/create',user)
export const loguinRequest = user => axios.post('/loguin/loguin',user)