import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative bg-white shadow px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold text-gray-800"></h1>

      <div className="relative ml-auto">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white border z-50">
            <div className="px-5 py-3 text-sm text-gray-800">
              <p className="mb-3">
                <strong>Name:</strong> {user?.name}
              </p>
              <p className="mb-2">
                <strong>Role:</strong> {user?.role}
              </p>
            </div>
            <hr className="border-gray-200" />
            <button
              onClick={logout}
              className="w-full text-left px-5 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
