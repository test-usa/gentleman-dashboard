
import Sidebar from "@/features/Sidebar/Sidebar";

import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  return (
    <div className="flex h-screen "> {/* Make layout full viewport height */}
      <div className="max-w-xs bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header with fixed height */}
     

        {/* Main content area, fill remaining height & scroll if needed */}
        <main className="flex-1 overflow-x-auto bg-[#f0f0f0] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
