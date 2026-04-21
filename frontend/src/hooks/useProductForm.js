import { useState } from "react";
import { toast } from "react-hot-toast";

export const useProductForm = (editingProduct, products, getProducts, updateProduct, createProduct, setSheetOpen) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    sizes: "",
    colors: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setImageFiles(files);
    setImagePreviews(files.map(f => URL.createObjectURL(f)));
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", price: "", stock: "", category: "", brand: "", sizes: "", colors: "" });
    setImageFiles([]);
    setImagePreviews([]);
  };

  const setEditData = (p) => {
    setFormData({
      title: p.title,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
      brand: p.brand,
      sizes: p.sizes?.join(",") || "",
      colors: p.colors?.join(",") || "",
    });
    setImageFiles([]);
    setImagePreviews(p.images?.map(img => img.url) || []);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.stock) {
      toast.error("Critical fields missing: Title, Price, Stock");
      return;
    }

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
        colors: formData.colors.split(",").map(c => c.trim()).filter(Boolean),
      };

      if (imageFiles.length > 0) {
        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
          });
        productData.images = await Promise.all(imageFiles.map(f => toBase64(f)));
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        toast.success("Asset configuration synchronized");
      } else {
        await createProduct(productData);
        toast.success("New asset initialized in registry");
      }

      await getProducts();
      resetForm();
      setSheetOpen(false);
    } catch (err) {
      toast.error("Synchronization failure");
    }
  };

  return {
    formData,
    imagePreviews,
    handleChange,
    handleImageUpload,
    handleSubmit,
    resetForm,
    setEditData
  };
};


