// DashboardTabs.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
/*
    * InlineNavTabs component renders a set of navigation tabs.
    * It accepts an array of tab objects and the currently active tab.
    * const tabs = [
        { label: "Dashboard", path: "/operator/dashboard" },
        { label: "Auto Mapping", path: "/operator/auto-mapping" },
        { label: "Data Connections", path: "/operator/data-connections" },
        { label: "Settings", path: "/operator/settings" },
    ]; This is an example of how to use the component.

    <div>
      <DashboardTabs tabs={tabs} activeTab="Dashboard" />
    </div>
*/

export default function InlineNavTabs({ tabs, activeTab }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="my-6 ml-3">
    
      <div className="flex space-x-6 border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => navigate(tab.path)}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${  
              location.pathname === tab.path
                ? "text-[#1AB2E6] border-[#1AB2E6]"
                : "border-transparent text-gray-500 hover:text-[#1AB2E6] hover:border-[#1AB2E6]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
