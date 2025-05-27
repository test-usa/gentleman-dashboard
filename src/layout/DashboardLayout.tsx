import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/features/Sidebar/Sidebar";

import { Outlet } from "react-router-dom";
import { MdNotificationsNone, MdSearch } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#f0f0f0]"> {/* Make layout full viewport height */}
      <div className="max-w-xs bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header with fixed height */}
        <header className="bg-transparent px-6 py-4 flex justify-between items-center flex-shrink-0">
          <div className="max-w-sm w-full relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Researcher..."
              className="w-full pl-10 border-black bg-[#FFFFFF]" // add padding-left for icon space
            />
          </div>

          {/* Right: Notification, language selector, user profile */}
          <div className="flex items-center gap-4">
            {/* Notification icon */}
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <MdNotificationsNone className="w-6 h-6" />
            </Button>

            {/* Language dropdown (static) */}
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-sm">EN</span>
              <FaChevronDown className="w-3 h-3" />
            </div>

            {/* User profile */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-white font-medium text-sm">
                <img
                  src="/profile.jpg"
                  alt="Admin"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.textContent = "AD";
                  }}
                />
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Main content area, fill remaining height & scroll if needed */}
        <main className="flex-1 overflow-auto bg-transparent p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
