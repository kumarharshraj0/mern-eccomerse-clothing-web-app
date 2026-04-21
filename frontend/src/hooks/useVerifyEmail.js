import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "@/lib/api";

export const useVerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("Initializing cryptographics verification...");

  const verifyToken = useCallback(async (tokenValue) => {
    try {
      const response = await API.post("/auth/verify-email", { token: tokenValue });
      setStatus("success");
      setMessage(response.data.message);
    } catch (error) {
      setStatus("error");
      setMessage(
        error.response?.data?.message ||
        "Electronic signature verification failed. The provided token may be expired or invalid."
      );
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyToken(token);
    } else {
      setStatus("error");
      setMessage("Unidentified verification token. Please initiate a new request from your entry point.");
    }
  }, [token, verifyToken]);

  return { status, message, navigate };
};


