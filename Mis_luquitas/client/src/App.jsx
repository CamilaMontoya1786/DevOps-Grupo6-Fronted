import "./App.css"; // Esto se puede quitar si no hay estilos globales
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Register from "./page/register";
import { AuthProvider } from "./context/authContext";
import Login from "./page/loguin";
import Restorepassword from "./page/restorepassword";
import Navbar from "./components/Navbar";
import Home from "./page/Home";

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
  const hideNavbar = ["/register", "/loguin", "/restorepassword"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/loguin" element={<Login />} />
        <Route path="/restorepassword" element={<Restorepassword />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;