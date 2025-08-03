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
} from "lucide-react";
import logo from "../assets/images/logo.png";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
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

  // ✅ Close dropdown when clicking outside
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
    <aside className="w-16 bg-white border-r h-screen flex flex-col justify-between">
      {/* Logo and Icons */}
      <div className="flex flex-col items-center py-4 space-y-4">
        <img src={logo} alt="Logo" className="h-8 w-8 rounded" />

        {filteredItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative p-2 rounded-md ${
                isActive
                  ? "bg-[#1AB2E6] text-white"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span className="absolute left-14 top-1/2 transform -translate-y-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Profile Button and Dropdown */}
      <div
        ref={profileRef}
        className="relative mb-4 flex flex-col items-center"
      >
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="cursor-pointer relative w-10 h-10 rounded-full overflow-hidden border hover:shadow-md"
        >
          <img
            src={user?.avatar || "https://i.pravatar.cc/100"}
            alt="User"
            className="w-full h-full object-cover"
          />
        </button>

        {profileOpen && (
          <div className="absolute left-14 bottom-0 translate-y-[-20%] bg-white border border-gray-200 rounded-lg shadow-xl w-64 z-20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center space-x-3 p-4 border-b">
              <img
                src={user?.avatar || "https://i.pravatar.cc/100"}
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name || "Sophia Munn"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "sophia@untitledui.com"}
                </p>
              </div>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>

            {/* Menu Items */}
            <ul className="text-sm text-gray-700">
              <li>
                <Link
                  to="/profile"
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                >
                  <div className="flex items-center cursor-pointer">
                    <UserCircle size={16} className="mr-2 text-gray-500" />
                    View profile
                  </div>
                  <span className="text-xs text-gray-400">⌘K P</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/settings"
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                >
                  <div className="flex items-center cursor-pointer">
                    <Settings size={16} className="mr-2 text-gray-500" />
                    Account settings
                  </div>
                  <span className="text-xs text-gray-400">⌘S</span>
                </Link>
              </li>
              <li>
                <button className=" cursor-pointer w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                  <div className="flex items-center cursor-pointer">
                    <span className="mr-2 text-gray-500">⚡</span>
                    Keyboard shortcuts
                  </div>
                  <span className="text-xs text-gray-400">?</span>
                </button>
              </li>
            </ul>

            {/* Divider */}
            <div className="border-t my-1" />

            {/* Bottom Items */}
            <ul className="text-sm text-gray-700">
              <li>
                <Link
                  to="/updates"
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                >
                  <div className="flex items-center cursor-pointer">
                    <Package size={16} className="mr-2 text-gray-500" />
                    Updates
                  </div>
                  <span className="text-xs text-gray-400">⌘A</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="cursor-pointer w-full flex items-center justify-between px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <div className="flex items-center ">
                    <LogOut size={16} className="mr-2" />
                    Log out
                  </div>
                  <span className="text-xs text-gray-400">⌘Q</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
