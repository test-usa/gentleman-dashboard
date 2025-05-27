import { useSidebarStore } from "@/store/useSidebarStore";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoBarChartSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { TbLayoutDashboardFilled } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "4rem" },
  };

  const menuItems = [
    { to: "/", icon: <IoHome className="w-5 h-5" />, text: "Tableau de bord" },
    { to: "/utilisateurs", icon: <IoBarChartSharp className="w-5 h-5" />, text: "Utilisateurs" },
    { to: "/history", icon: <IoMdSettings className="w-5 h-5" />, text: "History" },
    { to: "/request", icon: <IoMdSettings className="w-5 h-5" />, text: "Request" },
  ];

  return (
    <motion.aside
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`bg-[#111827] text-white border-r min-h-screen p-4 overflow-hidden flex flex-col ${
        !isOpen ? "px-10 items-center" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">
          {isOpen ? (
            "Admin Panel"
          ) : (
            <TbLayoutDashboardFilled className="w-7 h-7" />
          )}
        </h2>
        <Button className="ms-1" variant="ghost" size="sm" onClick={toggle}>
          {isOpen ? <FaLongArrowAltLeft /> : <FaLongArrowAltRight />}
        </Button>
      </div>

      <nav className="flex-1 mt-12">
        <TooltipProvider delayDuration={100}>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <motion.li
                key={item.to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!isOpen ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `w-10 h-10 flex items-center justify-center p-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-[#F9AA43] text-black"
                              : "hover:bg-[#F9AA43] hover:text-black"
                          }`
                        }
                      >
                        {item.icon}
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      {item.text}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-start p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#F9AA43] text-black"
                          : "hover:bg-[#F9AA43] hover:text-black"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="ml-2 font-medium">{item.text}</span>
                  </NavLink>
                )}
              </motion.li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
