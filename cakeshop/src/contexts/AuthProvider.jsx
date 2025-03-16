import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  createUser,
  login as loginUser,
  getUserByToken,
} from "../services/apiUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialze authentication state on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if(!token) return setIsLoading(false)

    const initializeAuth = async () => {
      console.log("token", token)
      if (token) {
        try {
          const result = await getUserByToken(token);
          if (result.success) {
            console.log("result", result);
            setUser(result.data.user);
            setJwt(token);
            setIsAuthenticated(true);
          } else {
            logout();
            navigate("/login");
          }
        } catch (error) {
          // console.error("Error:", error.message);
          logout();
          navigate("/login");
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Handle user registration
  const register = async (user) => {
    const result = await createUser(user);
    console.log(result)
    if (result.success) {
      console.log("jwt", result.data.token)
      localStorage.setItem("jwt", result.data.token);
      setUser(result.data.user);
      setJwt(result.data.token);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
    return result;
  };

  // Handle user login
  const login = async (user) => {
    const result = await loginUser(user);
    if (result.success) {
      localStorage.setItem("jwt", result.data.token);
      setUser(result.data.user);
      setJwt(result.data.token);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
    return result;
  };

  // Handle user logout
  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setJwt(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        jwt,
        setJwt,
        isLoading,
        setIsAuthenticated,
        setIsLoading,
        register,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
