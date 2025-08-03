import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#EDF6F7] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
