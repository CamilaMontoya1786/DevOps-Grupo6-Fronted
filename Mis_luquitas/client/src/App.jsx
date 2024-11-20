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
import Expenses from "./page/expenses";
import Income from "./page/income";
import MovementHistory from "./page/movementHistory";
import Reports from "./page/reports";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainRoutes />{" "}
      </BrowserRouter>
    </AuthProvider>
  );
}

function MainRoutes() {
  const location = useLocation();

  const hideNavbar = [
    "/",
    "/register",
    "/login",
    "/restorepassword",
    "/changePassword",
    "/expenses",
    "/income",
  ].some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/")
  );

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
        <Route
          path="/changePassword/:tokenEmail/:email"
          element={<Changepassword />}
        />
        <Route path="/help" element={<Help />} />
        <Route path="/movements" element={<Movements />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
        <Route path="/movementHistory" element={<MovementHistory />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </>
  );
}

export default App;
