import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../privateRoute/AuthContext";
import { useState } from "react";

import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

const SecondNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";
  const isPharmacist = user?.role === "pharmacist";

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-teal-600 hover:text-teal-700"
              onClick={() => setMenuOpen(false)}
            >
              MedStore
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-md font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Dropdown>
              <MenuButton
                variant="plain"
                sx={{
                  px: 3,
                  py: 2,
                  fontWeight: "medium",
                  color: "text.primary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Medicines
              </MenuButton>
              <Menu variant="outlined" sx={{ minWidth: 160 }}>
                <MenuItem
                  onClick={() => {
                    navigate("/medicines/napa");
                    setMenuOpen(false);
                  }}
                >
                  Napa
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/medicines/seclo");
                    setMenuOpen(false);
                  }}
                >
                  Seclo
                </MenuItem>
              </Menu>
            </Dropdown>

            <Dropdown>
              <MenuButton
                variant="plain"
                sx={{
                  px: 3,
                  py: 2,
                  fontWeight: "medium",
                  color: "text.primary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Equipments
              </MenuButton>
              <Menu variant="outlined" sx={{ minWidth: 180 }}>
                <MenuItem
                  onClick={() => {
                    navigate("/equipments/stethoscope");
                    setMenuOpen(false);
                  }}
                >
                  Stethoscope
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/equipments/thermometer");
                    setMenuOpen(false);
                  }}
                >
                  Thermometer
                </MenuItem>
              </Menu>
            </Dropdown>

            <Link
              to="/products/all-products"
              className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-md font-medium"
              onClick={() => setMenuOpen(false)}
            >
              All Medicine
            </Link>

            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-md font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            {isPharmacist && (
              <Link
                to="/pharmacist-dashboard"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-md font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Pharmacist Dashboard
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-teal-100"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <div>
              <label className="block px-3 py-2 text-gray-700 font-medium">
                Medicines
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    navigate(`/medicines/${val}`);
                    setMenuOpen(false);
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Medicine
                </option>
                <option value="napa">Napa</option>
                <option value="seclo">Seclo</option>
              </select>
            </div>

            <div>
              <label className="block px-3 py-2 text-gray-700 font-medium">
                Equipments
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    navigate(`/equipments/${val}`);
                    setMenuOpen(false);
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Equipment
                </option>
                <option value="stethoscope">Stethoscope</option>
                <option value="thermometer">Thermometer</option>
              </select>
            </div>

            <Link
              to="/products/all-products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-teal-100"
              onClick={() => setMenuOpen(false)}
            >
              All Medicine
            </Link>

            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-teal-100"
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            {isPharmacist && (
              <Link
                to="/pharmacist-dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-teal-100"
                onClick={() => setMenuOpen(false)}
              >
                Pharmacist Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SecondNavbar;
