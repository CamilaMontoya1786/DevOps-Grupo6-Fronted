
import { useContext, createContext, useState } from "react";
import { registerRequest } from "../api/auth";

const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useauth must be use an provider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /*cuanod se hace una peticion , la apgina tiene que esperar hasta que el backend mande los datos (metodos asincronos)*/
  const signup = async (userData) => {
    const res = await registerRequest(userData);
    setUser(res.data);
  };

  return <AuthContext.Provider value={{
    signup,user
  }}>{children}</AuthContext.Provider>;
};
