
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
    try {
        const res = await loguinRequest(userData);
        
        // Retornar el userToken directamente
        if (res.message === 'Login exitoso') {
            setUser(res); // Guarda el usuario en el estado
            return { userToken: res.userToken }; // Retorna solo el userToken
        } else {
            throw new Error(res.message || 'Datos de usuario no válidos');
        }
    } catch (error) {
        console.error("Error en signin:", error);
        throw new Error(error.message || "Error en el inicio de sesión"); // Lanza un error si hay un problema
    }
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
  
  const logout = () => {
    localStorage.removeItem("user"); // Elimina el usuario del almacenamiento
    setUser(null); // Limpia el contexto
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        signin,
        updateUserProfile,
        updatePassword,
        help,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
}


