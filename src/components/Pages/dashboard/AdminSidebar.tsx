import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface AdminSidebarProps {
  children?: ReactNode;
}

const AdminSidebar = ({ children }: AdminSidebarProps) => {
  return (
    <div className="w-48 h-screen bg-gray-800 text-gray-100 flex flex-col p-5">
      <Link to="/">
        <button className="text-left px-4 py-3 rounded-md hover:bg-gray-700 transition-colors mb-3">
          Home
        </button>
      </Link>
      <Link to="admin-dashboard">
        <button className="text-left px-4 py-3 rounded-md hover:bg-gray-700 transition-colors mb-3">
          Dashboard
        </button>
      </Link>
      <Link to="admin-dashboard/products">
        <button className="text-left px-4 py-3 rounded-md hover:bg-gray-700 transition-colors mb-3">
          Product
        </button>
      </Link>
      <button className="text-left px-4 py-3 rounded-md hover:bg-gray-700 transition-colors">
        All Products
      </button>
      <button className="text-left px-4 py-3 rounded-md hover:bg-gray-700 transition-colors">
        Logout
      </button>

      {/* Render children if any */}
      {children}
    </div>
  );
};

export default AdminSidebar;
