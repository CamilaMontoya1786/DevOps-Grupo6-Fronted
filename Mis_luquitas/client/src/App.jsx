import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./page/register";
import { AuthProvider } from "./context/authContext";
import Login from "./page/loguin";
import Restorepassword from "./page/restorepassword";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/loguin" element={<Login />} />

          <Route path="/restorepassword" element={<Restorepassword/>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
