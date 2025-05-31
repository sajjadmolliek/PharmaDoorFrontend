import { Outlet } from "react-router-dom";
import PharmacistSidebar from "./PharmacistSidebar";
import PharmacistNavbar from "./PharmacistNavbar"; // Make sure the path is correct
import { Toaster } from "react-hot-toast";

const PharmasistMainLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <PharmacistSidebar />
      <div className="flex-1 flex flex-col">
        <PharmacistNavbar />
        <main className="flex-1 p-4 bg-white">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default PharmasistMainLayout;
