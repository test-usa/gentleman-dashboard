import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Analytics from "@/pages/Analytics";
import Setting from "@/pages/Setting";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="utilisateurs" element={<Analytics />} />
        <Route path="history" element={<Setting />} />
        <Route path="request" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
