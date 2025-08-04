import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, sessionUser, userLogout } from "../service/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await sessionUser();
        setUser(data.admin);
        // Redirect based on role
        if (location.pathname === "/" || location.pathname === "/login") {
          if (data.admin.role === "super-admin") navigate("/super-admin");
          else if (data.admin.role === "admin") navigate("/admin");
          else if (data.admin.role === "operator") navigate("/operator");
        }
      } catch (err) {
        setUser(null);
        if (location.pathname !== "/login") navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [location.pathname]);

  const login = async (formData) => {
    const res = await loginUser(formData);

    if (!res) {
      throw new Error("Login failed");
    } else {
      const data = await sessionUser();
      if (!data) {
        throw new Error("Failed to fetch user session");
      } else {
        if (!data.ok) throw new Error("Failed to fetch user session");
        console.log("User data:", data.admin);
        setUser(data.admin);

        if (data.admin.role === "super-admin") navigate("/super-admin");
        else if (data.admin.role === "admin") navigate("/admin");
        else if (data.admin.role === "operator") navigate("/operator");
      }
    }
  };

  const logout = async () => {
    const res = await userLogout();
    if (res) {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
