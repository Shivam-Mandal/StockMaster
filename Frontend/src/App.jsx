import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import UsersPage from "./pages/UsersPage";
import InventoryPage from "./pages/InventoryPage";
import FeaturesPage from "./pages/FeaturesPage";
import DashboardLayout from "./components/DashboardLayout";
import MessagePage from "./pages/Message";
import Login from "./pages/Login";
import Loader from "./components/Loader";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user)
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );

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
