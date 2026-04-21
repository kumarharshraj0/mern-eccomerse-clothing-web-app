export default function AdminProductTile({
  product,
  handleDelete,
  setFormData,
  setOpenCreateProductsDialog,
}) {
  const onEditClick = () => {
    setFormData(product);
    setOpenCreateProductsDialog(true);
  };

  return (
    <div className="border rounded-md p-4 shadow-sm bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md"
      />

      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600">₹ {product.price}</p>

      <div className="flex justify-between mt-3">
        <button
          onClick={onEditClick}
          className="text-blue-600 text-sm hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product._id)}
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}


