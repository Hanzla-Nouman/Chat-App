import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.status !== 200) {
        console.error("Logout failed:", data); // Log response data for debugging
        throw new Error(data.message || "Logout failed");
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      console.error("Logout error:", error); // Log the specific error here
      toast.error(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
