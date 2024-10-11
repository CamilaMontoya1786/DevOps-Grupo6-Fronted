import axios  from "./axios";
/*conexion backend - frontend*/


export const registerRequest = user => axios.post('/login/createUser',user)
export const loguinRequest = user => axios.post('/login/login',user)
//export const userProfileRequest = user => axios.post('/login/login',user) ???

