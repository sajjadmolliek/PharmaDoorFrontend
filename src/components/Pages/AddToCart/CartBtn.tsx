import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartButton = () => {
  const [cartCount, setCartCount] = useState(0);

  // Initial load and listen to storage changes (even from other tabs)
  useEffect(() => {
    const updateCountFromStorage = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCountFromStorage();

    window.addEventListener("storage", updateCountFromStorage); // for other tabs
    window.addEventListener("cartUpdated", updateCountFromStorage); // for same tab

    return () => {
      window.removeEventListener("storage", updateCountFromStorage);
      window.removeEventListener("cartUpdated", updateCountFromStorage);
    };
  }, []);

  return (
    <li className="relative list-none">
      <Link to="/medicines/add-to-cart" className="inline-block p-1">
        <ShoppingCart className="text-[#469498]" size={22} />
        {cartCount > 0 && (
          <span className="absolute top-[-6px] left-[18px] bg-white text-black text-center w-[18px] h-[18px] flex items-center justify-center text-xs rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </li>
  );
};

export default CartButton;
