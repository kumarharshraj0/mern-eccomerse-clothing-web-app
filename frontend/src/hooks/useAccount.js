import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const useAccount = () => {
  const { user, loading, logout, uploadProfilePicture, deleteProfilePicture } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleUpload = async () => {
    if (!selectedImage) return;
    setIsUploading(true);
    try {
      await uploadProfilePicture(selectedImage);
      setSelectedImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Remove profile portrait?")) {
      await deleteProfilePicture();
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password", { state: { email: user.email } });
  };

  const profileImage = preview || user?.profileImage || "/default-avatar.png";

  return {
    user, loading, logout, selectedImage, setSelectedImage, profileImage,
    isUploading, handleUpload, handleDelete, handleChangePassword, navigate
  };
};


