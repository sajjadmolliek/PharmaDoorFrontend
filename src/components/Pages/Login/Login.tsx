/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import hdVedio from "../../../assets/medicine.mp4";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../privateRoute/AuthContext";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  email: string;
  status?: "pending" | "approved" | "rejected";
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const response = await axios.post(
        "https://pharma-door-backend.vercel.app/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Full login response:", response.data);

      const accessToken = response.data?.data?.accessToken;

      if (!accessToken) {
        throw new Error("No access token received");
      }

      const decoded = jwtDecode<DecodedToken>(accessToken);

      const role = decoded.role;
      const status = decoded.status;
      console.log(decoded);
      console.log(status);

      if (role === "pharmacist" && status !== "approved") {
        toast.error(
          "Your account is not approved yet. Please wait for admin approval."
        );
        return;
      }

      login(accessToken);
      toast.success("Login successful");

      // Navigate after login
      if (from && from !== "/login") {
        navigate(from, { replace: true });
      } else {
        // Role-based fallback navigation
        if (role === "admin") {
          navigate("/dashboard/admin-dashboard", { replace: true });
        } else if (role === "pharmacist") {
          navigate("/dashboard/pharmacist", { replace: true });
        } else if (role === "user") {
          navigate("/", { replace: true });
        } else {
          toast.error("Unknown user role");
        }
      }
    } catch (error: any) {
      toast.error("Invalid email or password");
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-0"
      >
        <source src={hdVedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-opacity-40 z-10"></div>

      <div className="relative z-20 bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-green-700">
              Register
            </Link>
          </p>
          <p className="text-center text-sm">
            Don't have a Pharmacist account?{" "}
            <Link
              to="/phermacist-register"
              className="font-bold text-green-700"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
