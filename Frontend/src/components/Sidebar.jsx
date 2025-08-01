// src/components/Sidebar.jsx
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { user } = useAuth();

  const links = {
    "super-admin": [{ label: "Super Dashboard", to: "/super-admin" }],
    admin: [{ label: "Admin Dashboard", to: "/admin" }],
    operator: [{ label: "Operator Dashboard", to: "/operator" }],
  };

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col p-4 shadow-lg">
      <div className="text-xl font-bold mb-6">Stock Master</div>
      <nav className="space-y-2">
        {(links[user?.role] || []).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block px-3 py-2 rounded hover:bg-slate-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
