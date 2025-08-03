import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/session", {
          method: "GET",
          credentials: "include", // Send cookies!
        });

        if (!res.ok) throw new Error("Session check failed");

        const data = await res.json();
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
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Login failed");

    // Session cookie is now set; fetch user info
    const sessionRes = await fetch("http://localhost:5000/api/admin/session", {
      credentials: "include",
    });

    const data = await sessionRes.json();
    console.log("User data:", data.admin);
    setUser(data.admin);

    if (data.admin.role === "super-admin") navigate("/super-admin");
    else if (data.admin.role === "admin") navigate("/admin");
    else if (data.admin.role === "operator") navigate("/operator");
  };

  const logout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
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
