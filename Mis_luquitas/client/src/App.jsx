import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./page/register";
import { AuthProvider } from "./context/authContext";
import Login from "./page/loguin";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/loguin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
