import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, sessionUser, userLogout } from "../service/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await sessionUser();
        if (data?.admin) {
          setUser(data.admin);

          const isAuthPage =
            location.pathname === "/" || location.pathname === "/login";
          if (isAuthPage) {
            // Redirect based on role
            navigate(`/${data.admin.role}`, { replace: true });
          }
        } else {
          setUser(null);
          if (location.pathname !== "/login")
            navigate("/login", { replace: true });
        }
      } catch (err) {
        setUser(null);
        if (location.pathname !== "/login")
          navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkSession();
    // Only on initial load or pathname change
  }, [location.pathname, navigate]);

  const login = async (formData) => {
    try {
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
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  const logout = async () => {
    try {
      const res = await userLogout();
      if (res) {
        setUser(null);
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
