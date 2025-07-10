/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CalculateSummary from "./CalculateSummery";

const AddToCart = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const medicine = location.state?.medicine;
    if (medicine) {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [...existingCart, medicine];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(existingCart);
    }
  }, [location.state]);

  const handleDelete = (indexToDelete: number) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToDelete);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Your Cart ({cartItems.length} items)
      </h1>
      <div className="flex flex-wrap justify-evenly">
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-md bg-white flex items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.medicineImage}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                  <p className="text-sm font-bold text-green-600">
                    Price: {item.price} TK
                  </p>
                </div>
              </div>

              {/* ✅ Delete button */}
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div>
          <CalculateSummary />
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
