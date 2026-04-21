import { createContext, useContext, useEffect, useState, useCallback } from "react";
import API from "../lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  /* ---------------------------------------------------
     FETCH CURRENT USER
  ---------------------------------------------------- */
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.error("Fetch user failed:", err);
      if (err.response?.status === 401) {
        await refreshToken();
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------------------------------------------------
     REFRESH TOKEN
  ---------------------------------------------------- */
  const refreshToken = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) {
      logout();
      return;
    }

    try {
      const res = await API.post("/auth/refresh-token", {
        refreshToken: storedRefreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      await fetchUser();
    } catch (err) {
      console.error("Refresh token failed:", err);
      logout();
    }
  }, [fetchUser]);

  /* ---------------------------------------------------
     API REQUEST WRAPPER (AUTO REFRESH)
  ---------------------------------------------------- */
  const apiRequest = useCallback(async (callback) => {
    try {
      return await callback();
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          await refreshToken();
          // After refresh, retry the callback
          return await callback();
        } catch (refreshError) {
          throw refreshError;
        }
      }
      throw error;
    }
  }, [refreshToken]);

  /* ---------------------------------------------------
     SIGNUP
  ---------------------------------------------------- */
  const signup = async (formData) => {
    try {
      const res = await API.post("/auth/signup", formData);
      toast.success("Signup successful 🎉");
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      toast.error(msg);
      throw err;
    }
  };

  /* ---------------------------------------------------
     LOGIN
  ---------------------------------------------------- */
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const { accessToken, refreshToken: newRefreshToken, user: userData } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      setUser(userData);

      toast.success("Login successful ✅");
      return userData;
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
      toast.error(msg);
      throw err;
    }
  };

  /* ---------------------------------------------------
     LOGOUT
  ---------------------------------------------------- */
  const logout = async () => {
    try {
      await API.post("/auth/logout", {});
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  /* ---------------------------------------------------
     PROFILE PICTURE
  ---------------------------------------------------- */
  const uploadProfilePicture = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await apiRequest(() =>
          API.post("/auth/upload-profile", { image: reader.result })
        );
        setUser(res.data.user);
        toast.success("Profile picture updated 🖼️");
      } catch {
        toast.error("Upload failed");
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteProfilePicture = async () => {
    try {
      const res = await apiRequest(() => API.delete("/auth/delete-profile-picture"));
      setUser(res.data.user);
      toast.success("Profile picture removed ❌");
    } catch {
      toast.error("Failed to delete picture");
    }
  };

  /* ---------------------------------------------------
     PASSWORD ACTIONS
  ---------------------------------------------------- */
  const forgotPassword = async (email) => {
    const res = await API.post("/auth/forgot-password", { email });
    toast.success("OTP sent to your email 📧");
    return res.data;
  };

  const resetPassword = async (data) => {
    const res = await API.post("/auth/reset-password", data);
    toast.success("Password reset successful 🔑");
    return res.data;
  };

  const changePassword = async (data) => {
    const res = await apiRequest(() => API.post("/auth/change-password", data));
    toast.success("Password changed successfully 🔐");
    return res.data;
  };

  /* ---------------------------------------------------
     INITIAL LOAD
  ---------------------------------------------------- */
  useEffect(() => {
    fetchUser();
  }, []);

  /* ---------------------------------------------------
     PROVIDER
  ---------------------------------------------------- */
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        uploadProfilePicture,
        deleteProfilePicture,
        forgotPassword,
        resetPassword,
        changePassword,
        apiRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);










