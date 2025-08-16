import React from "react";  
import InlineNavTabs from "../components/InlineNavTabs";
import { Outlet } from "react-router-dom";

const tabs = [
    { label: "Manage Operators", path: "/operator/manage" },
    { label: "Dashboard", path: "/operator/dashboard" },  
    { label: "Auto Mapping", path: "/operator/auto-mapping" },
    { label: "Data Connections", path: "/operator/data-connections" },
    { label: "Settings", path: "/operator/settings" },
];

export default function Operator() {
  return (
    <div>
      <InlineNavTabs tabs={tabs} />
        <Outlet />
    </div>
  );
}