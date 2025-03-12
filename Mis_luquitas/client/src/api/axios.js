import axios from "axios";
/* importamos axios para enviar metods (post , get )
creamos una contante para tener la URL del backend*/


const instace = axios.create({
 baseURL : 'http://localhost:3000'

})

export default instace