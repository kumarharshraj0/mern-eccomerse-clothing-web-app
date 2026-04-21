import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const useSignin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      toast.success("Welcome back!");

      if (user.roles?.includes("admin")) {
        navigate("/admin/dashboard");
      } else if (user.roles?.includes("delivery")) {
        navigate("/delivery/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [email, password, login, navigate]);

  return { email, setEmail, password, setPassword, loading, handleSubmit };
};


