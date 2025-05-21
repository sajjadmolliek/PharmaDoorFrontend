/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ProtectedRoute.tsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Pages/privateRoute/AuthContext";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useAuth();
  const location = useLocation();

  console.log("Checking protected route. User:", user);
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
