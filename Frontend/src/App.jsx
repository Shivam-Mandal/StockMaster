import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import UsersPage from "./pages/UsersPage";
import InventoryPage from "./pages/InventoryPage";
import FeaturesPage from "./pages/FeaturesPage";
import DashboardLayout from "./components/DashboardLayout";
import MessagePage from "./pages/Message";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="super-admin" element={<SuperAdminDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="operator" element={<OperatorDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="messages" element={<MessagePage />} />
        <Route path="*" element={<Navigate to={`/${user.role}`} />} />
      </Route>
    </Routes>
  );
}

export default App;
