import axios from "axios";
/* importamos axios para enviar metods (post , get )
creamos una contante para tener la URL del backend*/


const instace = axios.create({
 baseURL : 'https://devops-backend-grupo6.onrender.com'

})

export default instace