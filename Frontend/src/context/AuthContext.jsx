// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading flag
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          Cookies.remove("token");
          setUser(null);
          if (location.pathname !== "/login") navigate("/login");
        } else {
          setUser(decoded);
          if (location.pathname === "/" || location.pathname === "/login") {
            if (decoded.role === "super-admin") navigate("/super-admin");
            else if (decoded.role === "admin") navigate("/admin");
            else if (decoded.role === "operator") navigate("/operator");
          }
        }
      } catch (err) {
        Cookies.remove("token");
        setUser(null);
        navigate("/login");
      }
    } else {
      if (location.pathname !== "/login") navigate("/login");
    }
    setLoading(false); // ✅ Done checking token
  }, [location.pathname]);

  const login = async (formData) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    const token = data.token;

    if (!token) throw new Error("No token received");
    Cookies.set("token", token, { secure: true });

    const decoded = jwtDecode(token);
    setUser(decoded);

    console.log("User logged in:", decoded);

    // ✅ Redirect based on role
    if (decoded.role === "super-admin") navigate("/super-admin");
    else if (decoded.role === "admin") navigate("/admin");
    else if (decoded.role === "operator") navigate("/operator");
  };

  const logout = () => {
    Cookies.remove("token");
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
