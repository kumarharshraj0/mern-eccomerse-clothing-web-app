import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const useForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await forgotPassword(email);
      toast.success("Security OTP dispatched to your inbox");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Transmission failed");
    } finally {
      setLoading(false);
    }
  }, [email, forgotPassword, navigate]);

  return { email, setEmail, loading, handleSubmit, navigate };
};


