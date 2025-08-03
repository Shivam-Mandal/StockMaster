import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
  UserCircle,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import logo from "../assets/images/logo.png";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const profileRef = useRef();

  const sidebarItems = [
    {
      label: "Dashboard",
      to: `/${user?.role}`,
      icon: LayoutDashboard,
      roles: ["super-admin", "admin", "operator", "staff"],
    },
    {
      label: "Users",
      to: "/users",
      icon: Users,
      roles: ["super-admin", "admin"],
    },
    {
      label: "Inventory",
      to: "/inventory",
      icon: Package,
      roles: ["super-admin", "admin", "operator"],
    },
    {
      label: "Features",
      to: "/features",
      icon: Settings,
      roles: ["super-admin", "admin", "operator"],
    },
    {
      label: "Messages",
      to: "/messages",
      icon: Mail,
      roles: ["super-admin", "admin", "operator", "staff"],
    },
  ];

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside
      className={`transition-all duration-300 bg-white border-r h-screen flex flex-col justify-between ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Top: Logo + toggle */}
      <div className="flex flex-col pt-4 relative border-b">
        {/* Logo row */}
        <div className="flex items-center px-4 mb-4 space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded" />
          {isSidebarOpen && (
            <span className="text-lg font-semibold text-gray-700">
              Stock Master
            </span>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute cursor-pointer -right-3 top-4 bg-white border rounded-full p-1 shadow-sm hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <ArrowLeft size={18} className="text-gray-700" />
          ) : (
            <ArrowRight size={18} className="text-gray-700" />
          )}
        </button>

        {/* Menu items */}
        <nav className="flex flex-col space-y-1 px-2 pb-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-3 p-2 rounded-md transition-all ${
                  isActive
                    ? "bg-[#1AB2E6] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                } ${isSidebarOpen ? "px-4" : "justify-center"}`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Profile */}
      <div
        ref={profileRef}
        className={`border-t p-2 flex items-center ${
          isSidebarOpen ? "justify-between" : "justify-center"
        }`}
      >
        {/* Profile picture */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            src={user?.avatar || "https://i.pravatar.cc/100"}
            alt="User"
            className="h-8 w-8 rounded-full object-cover border"
          />
          {isSidebarOpen && (
            <div className="text-sm">
              <p className="font-medium text-gray-800 truncate max-w-[120px]">
                {user?.name || "User Name"}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[120px]">
                {user?.email || "email@example.com"}
              </p>
            </div>
          )}
        </div>

        {/* Dropdown menu */}
        {profileOpen && (
          <div
            className={`absolute bottom-16 ${
              isSidebarOpen ? "left-20" : "left-16"
            } bg-white border border-gray-200 rounded-lg shadow-xl w-64 z-20`}
          >
            {/* Header: Avatar + name/email */}
            <div className="flex items-center space-x-3 p-4 border-b">
              <img
                src={user?.avatar || "https://i.pravatar.cc/100"}
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.name || "User Name"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "email@example.com"}
                </p>
              </div>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>

            {/* Menu Items */}
            <ul className="text-sm text-gray-700">
              <li>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <UserCircle size={16} className="mr-2 text-gray-500" />
                  View profile
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/settings"
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <Settings size={16} className="mr-2 text-gray-500" />
                  Account settings
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
