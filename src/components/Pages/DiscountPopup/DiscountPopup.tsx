import { useEffect, useState } from "react";

const DiscountPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50">
      <div className="backdrop-blur-md bg-white/80 p-8 rounded-3xl shadow-2xl max-w-md w-[90%] text-center animate-bounce">
        <h2 className="text-3xl font-extrabold text-green-600 mb-4">
          🎉 Hurray! 20% Off!
        </h2>
        <p className="text-gray-800 text-lg mb-6">
          তারাতারি মেডিসিন কিনে নাও! সময় সীমিত।
        </p>
        <button
          onClick={() => setShow(false)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-base font-medium transition"
        >
          বুঝেছি
        </button>
      </div>
    </div>
  );
};

export default DiscountPopup;
