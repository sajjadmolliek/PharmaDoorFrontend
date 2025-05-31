import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../privateRoute/AuthContext";
import { useState } from "react";

const PharmacistNavbar = () => {
  const { user } = useAuth();
  const profileImage = user?.profileImage || "";

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample notifications — in real apps, this would come from API or context
  const notifications = [
    { id: 1, icon: "💊", message: "New prescription received" },
    { id: 2, icon: "📦", message: "Order #123 ready for delivery" },
    { id: 3, icon: "📢", message: "System maintenance at 10PM" },
  ];

  return (
    <>
      {/* Navbar */}
      <div className=" text-blue-600 bg-blue-600 shadow-md p-4 flex items-center justify-between text-whit">
        {/* Logo or Title */}
        <div className="text-2xl font-bold text-white">Pharmacist Panel</div>

        {/* Right Section: Notification & Profile */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <div className="relative">
            <button
              className="relative cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Bell className="w-6 h-12 text-white mt-2" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <Link to="/pdashboard/pharmacist-dashboard/profile">
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
              />
            </Link>
            <span className="text-blue-600 font-medium hidden md:inline">
              Pharmacist
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-40 flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-blue-600">
                Notifications
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
            </div>
            {notifications.length > 0 ? (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.map((note) => (
                  <li
                    key={note.id}
                    className="bg-gray-100 px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
                  >
                    <span>{note.icon}</span>
                    <span>{note.message}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 text-sm">
                No notifications
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PharmacistNavbar;
