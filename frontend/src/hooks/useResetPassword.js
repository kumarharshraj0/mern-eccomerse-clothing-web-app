import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const useResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Security keys do not match");
    }

    try {
      setLoading(true);
      await resetPassword({
        email: form.email,
        otp: form.otp,
        password: form.password,
      });

      toast.success("Security credentials updated successfully");
      navigate("/signin");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset sequence failed");
    } finally {
      setLoading(false);
    }
  }, [form, resetPassword, navigate]);

  return { form, loading, handleChange, handleSubmit };
};


