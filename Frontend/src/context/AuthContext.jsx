import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  loginUser,
  registerUser,
  sessionUser,
  userLogout,
} from "../service/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await sessionUser();
        if (data?.admin) {
          // If session exists
          setUser(data.admin);

          // If you're on a public page, send to role-based dashboard
          const publicPaths = ["/", "/login", "/register"];
          if (publicPaths.includes(location.pathname)) {
            navigate(`/${data.admin.role}`, { replace: true });
          }
        } else {
          // No session
          setUser(null);
          // Allow Landing + login + register
          const publicPaths = ["/", "/login", "/register"];
          if (!publicPaths.includes(location.pathname)) {
            navigate("/login", { replace: true });
          }
        }
      } catch (err) {
        setUser(null);
        const publicPaths = ["/", "/login", "/register"];
        if (!publicPaths.includes(location.pathname)) {
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [location.pathname, navigate]);

  /** LOGIN **/
  const login = async (formData) => {
    const res = await loginUser(formData);
    if (res) {
      const data = await sessionUser();
      if (data?.admin) {
        setUser(data.admin);
        navigate(`/${data.admin.role}`, { replace: true });
      } else {
        throw new Error("Failed to fetch user session");
      }
    } else {
      throw new Error("Login failed");
    }
  };

  /** REGISTER **/
  const register = async (formData) => {
    const res = await registerUser(formData);
    if (res) {
      const data = await sessionUser();
      if (data) {
        navigate(`/login`, { replace: true });
        alert("Registration successful! Please log in.");
      } else {
        throw new Error("Failed to fetch user session");
      }
    } else {
      throw new Error("Registration failed");
    }
  };

  /** LOGOUT **/
  const logout = async () => {
    await userLogout();
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
