<<<<<<< HEAD
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './page/register'


function App() {

  return(
    
    <>
    
      <BrowserRouter>

        <Routes>

          <Route path='/register' element={<Register></Register>}></Route>

         </Routes>

      </BrowserRouter> 

   
    </>



  )
  
}

export default App
=======
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./page/register";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register></Register>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
>>>>>>> feauture_register_createRegister
