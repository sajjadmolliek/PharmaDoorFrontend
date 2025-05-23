import { type ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiBox,
  FiList,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useAuth } from "../privateRoute/AuthContext";

interface AdminSidebarProps {
  children?: ReactNode;
}

const PharmacistSidebar = ({ children }: AdminSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 z-50 p-6 transition-all duration-300`}
      >
        <h2 className="text-2xl font-semibold mb-8 text-center">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <SidebarLink to="/" icon={<FiHome />} label="Home" />
          <SidebarLink
            to="/Pdashboard/pharmacist-dashboard"
            icon={<FiGrid />}
            label="Dashboard"
          />
          <SidebarLink
            to="/Pdashboard/pharmacist-dashboard/products"
            icon={<FiBox />}
            label="Product"
          />
          <SidebarLink
            to="/Pdashboard/pharmacist-dashboard/create-product"
            icon={<FiList />}
            label="All Products"
          />
          <SidebarLink
            icon={<FiLogOut />}
            label="Logout"
            onClick={handleLogout}
          />
        </nav>
      </div>

      {/* Toggle button for mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="text-white bg-gray-800 p-2 rounded-md shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 lg:ml-64 p-6 w-full">{children}</div>
    </div>
  );
};

interface SidebarLinkProps {
  to?: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon, label, onClick }: SidebarLinkProps) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-md hover:bg-gray-700 transition"
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </button>
    );
  }

  return (
    <Link
      to={to || "#"}
      className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-700 transition"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default PharmacistSidebar;
