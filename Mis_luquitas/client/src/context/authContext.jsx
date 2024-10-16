
import { useContext, createContext, useState } from "react";
import { registerRequest, loguinRequest } from "../api/auth"

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

  /*cuando se hace una peticion , la pagina tiene que esperar hasta que el backend mande los datos (metodos asincronos)*/
  const signup = async (userData) => {
    const res = await registerRequest(userData);
    setUser(res.data);
  };

  const signin = async (userData) => {
    const res = await loguinRequest(userData);
    setUser(res.data);
  };
  const updateUserProfile = async (userData) => {
    const res = await userProfileRequest(userData);
    setUser(res.data);
  };

  const updatePassword = async (userData) => {
    const res = await updatePasswordRequest(userData);
    setUser(res.data);
  };


  const help = async (userData) => {
    const res = await helpRequest(userData);
    setUser(res.data);
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        signin,
        updateUserProfile,
        updatePassword,
        help
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
}

