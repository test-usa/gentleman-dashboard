import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/features/Sidebar/Sidebar";


import { Outlet } from "react-router-dom";
import {  MdNotificationsNone } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

const DashboardLayout = () => {
 

  return (
    <div className="flex">
      <div className="max-w-xs">
        <Sidebar />
      </div>
      <div className="flex-1">
        <header className="bg-transparent px-6 py-4 flex justify-between items-center">
          {/* Left: Search bar */}
          <div className="max-w-sm w-full">
            <Input
              type="text"
              placeholder="Search"
              className="w-full border-black bg-[#FFFFFF]"
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
                {/* Replace the image src or leave initials */}
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

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
