import { Routes, Route, Navigate } from "react-router-dom";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Loading...</div>; // ✅ Wait until token check finishes

  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} />
      <Route
        path="/super-admin"
        element={user ? <SuperAdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={user ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/operator"
        element={user ? <OperatorDashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
}

export default App;
