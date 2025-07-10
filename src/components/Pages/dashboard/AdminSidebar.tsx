import { type ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiGrid, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { AiFillMedicineBox } from "react-icons/ai";
import { Verified } from "lucide-react";
import { useAuth } from "../privateRoute/AuthContext";

interface AdminSidebarProps {
  children?: ReactNode;
}

const AdminSidebar = ({ children }: AdminSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarLinks = [
    { to: "/", icon: <FiHome />, label: "Home", exact: true },
    { to: "/admin-dashboard", icon: <FiGrid />, label: "Dashboard" },
    {
      to: "/admin-dashboard/all-users",
      icon: <FiUser />,
      label: "All Users",
    },
    {
      to: "/admin-dashboard/all-pharmacist",
      icon: <AiFillMedicineBox />,
      label: "Total Pharmacist",
    },
    {
      to: "/admin-dashboard/all-document",
      icon: <Verified className="text-indigo-500" />,
      label: "Document Verification",
    },
    // {
    //   to: "/admin-dashboard/products",
    //   icon: <FiBox />,
    //   label: "Product",
    // },
    // {
    //   to: "/admin-dashboard/create-product",
    //   icon: <FiList />,
    //   label: "All Products",
    // },
  ];

  return (
    <div className="flex">
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block fixed top-0 left-0 h-screen w-64 z-50 bg-gradient-to-bl from-violet-500 to-fuchsia-500 text-white p-6 transition-all duration-300`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.label}
              to={link.to}
              icon={link.icon}
              label={link.label}
              exact={link.exact}
            />
          ))}
          <SidebarLink
            icon={<FiLogOut />}
            label="Logout"
            onClick={handleLogout}
          />
        </nav>
      </aside>

      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="text-white bg-gray-800 p-2 rounded-md shadow-md"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      <main className="flex-1 lg:ml-64 p-6 w-full">{children}</main>
    </div>
  );
};

interface SidebarLinkProps {
  to?: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  exact?: boolean;
}

const SidebarLink = ({
  to,
  icon,
  label,
  onClick,
  exact = false,
}: SidebarLinkProps) => {
  const location = useLocation();
  const isActive =
    to && (exact ? location.pathname === to : location.pathname.startsWith(to));

  const baseClasses =
    "flex items-center gap-3 px-4 py-3 rounded-md transition text-sm font-medium";
  const activeClasses = "bg-white text-violet-600 font-semibold shadow";
  const inactiveClasses = "hover:bg-violet-600 hover:bg-opacity-30";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${inactiveClasses} w-full text-left text-white`}
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </button>
    );
  }

  return (
    <Link
      to={to || "#"}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default AdminSidebar;
