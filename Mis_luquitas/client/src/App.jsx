
import "./App.css"; // Esto se puede quitar si no hay estilos globales
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Register from "./page/register";
import { AuthProvider } from "./context/authContext";
import Login from "./page/login";
import Restorepassword from "./page/restorepassword";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import UserProfile from "./page/userprofile";
import Changepassword from "./page/changePassword";
import Help from "./page/help";
import Movements from "./page/movements";
import Expenses from "./page/Expenses";
import Income from "./page/Income";
import MovementHistory from "./page/movementHistory";
import Income from "./page/income";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainRoutes /> {/* Movemos la lógica de las rutas a un componente separado */}
      </BrowserRouter>
    </AuthProvider>
  );
}

function MainRoutes() {
  const location = useLocation();
  const hideNavbar = ["/","/register", "/login", "/restorepassword", "/userprofile", "/changePassword", "/expenses", "/income"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/restorepassword" element={<Restorepassword />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/changePassword" element={<Changepassword />} />
        <Route path="/help" element={<Help/>} />
        <Route path="/movements" element={<Movements />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
        <Route path="/movementHistory" element={<MovementHistory/>} />
        
      </Routes>
    </>
  );
}

export default App;

