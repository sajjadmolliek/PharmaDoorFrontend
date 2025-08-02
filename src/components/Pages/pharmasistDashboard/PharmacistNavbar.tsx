/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../privateRoute/AuthContext";

interface Notification {
  id: number;
  icon: string;
  message: string;
}

const PharmacistNavbar = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const profileImage = user?.profileImage || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasSeenNotifications, setHasSeenNotifications] = useState(true);
  const notificationSoundRef = useRef<HTMLAudioElement | null>(null);
  const prevCount = useRef(0);

  useEffect(() => {
    notificationSoundRef.current = new Audio(
      "https://notificationsounds.com/storage/sounds/file-sounds-1150-pristine.mp3"
    );
  }, []);

  // Fetch kora hoysa notifications (expired + expiring soon)
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token || !userId) return;

        const res = await fetch(
          "https://pharma-door-backend.vercel.app/api/v1/medicine",
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch medicines");

        const json = await res.json();
        const medicines = json?.data || [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);
        next30Days.setHours(0, 0, 0, 0);

        const expiredMedicines = medicines.filter((medicine: any) => {
          const expiryDate = new Date(medicine.expiryDate);
          expiryDate.setHours(0, 0, 0, 0);
          return expiryDate <= today && medicine.createdBy?._id === userId;
        });

        const expiringSoonMedicines = medicines.filter((medicine: any) => {
          const expiryDate = new Date(medicine.expiryDate);
          expiryDate.setHours(0, 0, 0, 0);
          return (
            expiryDate > today &&
            expiryDate <= next30Days &&
            medicine.createdBy?._id === userId
          );
        });

        const newNotifications: Notification[] = [];

        if (expiredMedicines.length > 0) {
          newNotifications.push({
            id: 1,
            icon: "⚠️",
            message: `${expiredMedicines.length} medicine(s) you created have already expired. Please update or delete them.`,
          });
        }

        if (expiringSoonMedicines.length > 0) {
          newNotifications.push({
            id: 2,
            icon: "⏳",
            message: `${expiringSoonMedicines.length} medicine(s) will expire within the next 30 days.`,
          });
        }

        setNotifications(newNotifications);
        setHasSeenNotifications(newNotifications.length === 0);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, [userId]);

  useEffect(() => {
    if (notifications.length > prevCount.current) {
      notificationSoundRef.current?.play();
    }
    prevCount.current = notifications.length;
  }, [notifications]);

  return (
    <>
      <div className="bg-blue-600 shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="text-2xl font-bold text-white">Pharmacist Panel</div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setHasSeenNotifications(true);
              }}
              className="relative"
            >
              <Bell className="w-6 h-6 text-white" />
              {!hasSeenNotifications && notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <Link to="/pharmacist-dashboard/profile">
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            </Link>
            <span className="text-white font-medium hidden md:inline">
              Pharmacist
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-50">
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
