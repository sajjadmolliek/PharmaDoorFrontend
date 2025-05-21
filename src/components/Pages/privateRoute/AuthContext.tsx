/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface DecodedToken {
  role: string;
  email: string;
  exp?: number;
}

interface AuthContextType {
  user: DecodedToken | null;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  //  (if accessToken is missing or expired)
  useEffect(() => {
    const existingToken = localStorage.getItem("accessToken");

    if (existingToken) {
      const decoded = jwtDecode<DecodedToken>(existingToken);

      const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
      if (isExpired) {
        // If expired, try to refresh
        refreshToken();
      } else {
        setUser(decoded);
        setAccessToken(existingToken);
      }
    } else {
      refreshToken();
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    const decoded = jwtDecode<DecodedToken>(token);
    setUser(decoded);
    setAccessToken(token);
  };
  const logout = async () => {
    try {
      // Call backend to clear refresh token cookie
      await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {},
        { withCredentials: true }
      );
      const newToken = res.data?.data?.accessToken;
      if (newToken) {
        login(newToken); // Automatically sets new token
      }
    } catch (err) {
      console.error("Refresh token failed:", err);
      logout(); // log out if refresh failed
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
