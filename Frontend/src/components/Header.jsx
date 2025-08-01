// src/components/Header.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu } from "lucide-react"; // or use inline SVG if not using Lucide

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative bg-slate-100 dark:bg-slate-800 shadow px-4 py-3 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
        Stock Master
      </h1>

      {/* Hamburger Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-slate-700 dark:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-slate-900 border dark:border-slate-700 z-50">
            <div className="px-4 py-3 text-sm text-slate-800 dark:text-white">
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Role:</strong> {user?.role}
              </p>
            </div>
            <hr className="border-slate-200 dark:border-slate-700" />
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800"
            >
              🔓 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
