/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";

const UserMenu = ({
  user,
  handleLogout,
}: {
  user: any;
  handleLogout: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <Link to="/login">
        <button className="btn btn-success btn-sm text-xs">Login</button>
      </Link>
    );
  }

  if (user.role !== "user") {
    // role user না হলে শুধু logout button দেখাবে
    return (
      <button onClick={handleLogout} className="btn btn-error btn-sm text-xs">
        Logout
      </button>
    );
  }

  // role 'user' হলে avatar এবং ড্রপডাউন
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-circle btn-ghost avatar"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 rounded-full overflow-hidden border-2 border-green-500">
          <img
            src={user.avatar || "https://i.pravatar.cc/150?img=3"} // ডিফল্ট avatar
            alt="User Avatar"
          />
        </div>
      </button>

      {isOpen && (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-2 w-52 p-2 shadow-lg absolute right-0"
        >
          <li>
            <Link
              to="/profile"
              className="justify-between"
              onClick={() => setIsOpen(false)}
            >
              Profile <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setIsOpen(false)}>
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
