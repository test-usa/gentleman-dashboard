import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import Request from "@/pages/Request";
import Home from "@/pages/Home";
import Utilisateurs from "@/pages/Utilisateurs";
import History from "@/pages/History";
import Error from "@/Error/Error";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="utilisateurs" element={<Utilisateurs />} />
        <Route path="history" element={<History />} />
        <Route path="request" element={<Request />} />
        <Route path="*" element={<Error />} /> {/* Catch-all route */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
