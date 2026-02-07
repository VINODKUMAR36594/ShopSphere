import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
`import { toast } from "react-toastify";
`
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete the product?")) {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete product");
    }
  }
};


  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Product Management
      </h2>

      {/* ================= TABLE VIEW (md+) ================= */}
      <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm md:text-base text-left text-gray-500">
          <thead className="bg-gray-100 text-xs md:text-sm uppercase text-gray-700">
            <tr>
              <th className="py-2 md:py-3 px-2 md:px-4">Name</th>
              <th className="py-2 md:py-3 px-2 md:px-4">Price</th>
              <th className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">
                SKU
              </th>
              <th className="py-2 md:py-3 px-2 md:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-2 md:p-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="p-2 md:p-4">${product.price}</td>
                  <td className="p-2 md:p-4 hidden md:table-cell">
                    {product.sku}
                  </td>
                  <td className="p-2 md:p-4 space-x-2">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="inline-block bg-yellow-500 text-white px-2 md:px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-block bg-red-500 text-white px-2 md:px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CARD VIEW (sm) ================= */}
      <div className="sm:hidden space-y-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg p-3 shadow-sm">
              <h3 className="font-semibold text-base">{product.name}</h3>
              <p className="text-gray-600 text-sm">Price: ${product.price}</p>
              <p className="text-gray-600 text-sm">SKU: {product.sku}</p>

              <div className="mt-3 flex gap-2">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="flex-1 text-center bg-yellow-500 text-white py-1.5 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 bg-red-500 text-white py-1.5 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;