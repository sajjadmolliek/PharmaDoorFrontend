import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminMainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminMainLayout;
