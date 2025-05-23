import { Outlet } from "react-router-dom";
import PharmacistSidebar from "./PharmacistSidebar";

const PharmasistMainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <PharmacistSidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PharmasistMainLayout;
