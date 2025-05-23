import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import brandImage from "../../../assets/brand1.png";
import SafetyAdvice from "../OtcMedicine/SafetyAdvice";
import AdditionalOffer from "../OtcMedicine/AdditionalOffer";

type MedicalProduct = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  stock_quantity: number;
  rating: number;
  color: string;
  image: string;
};

const StethoscopeDetails = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState<MedicalProduct | null>(null);

  useEffect(() => {
    fetch("/equipment.json")
      .then((res) => res.json())
      .then((data: MedicalProduct[]) => {
        const found = data.find((item) => item.id === Number(id));
        setEquipment(found || null);
      })
      .catch((err) => console.error("Failed to load details:", err));
  }, [id]);

  if (!equipment) {
    return (
      <div className="text-center mt-10 text-red-600">Loading or Not Found</div>
    );
  }

  return (
    <div className="mt-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Image and SafetyAdvice */}
        <div className="flex flex-col items-center">
          <img
            src={equipment.image}
            alt={equipment.name}
            className="w-60 h-60 object-contain mb-4"
          />
          <SafetyAdvice />
        </div>

        {/* Equipment Details */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 text-white p-3 rounded-md mb-4 text-center">
            <p className="flex flex-col sm:flex-row items-center justify-center gap-2">
              ব্যবসার জন্য পাইকারি দামে পণ্য কিনতে চাইলে
              <Link to="/register">
                <button className="btn btn-secondary ml-2">Register</button>
              </Link>
            </p>
          </div>

          <h1 className="text-2xl font-bold text-red-500 mb-2">
            {equipment.name}
          </h1>

          <p className="text-gray-700 font-bold mb-2 flex items-center gap-2">
            <img src={brandImage} alt="Brand" className="w-5 h-5" />
            <span className="text-emerald-500">{equipment.brand}</span>
          </p>

          <p className="text-gray-800 font-bold mb-2">
            Stock Quantity:{" "}
            <span className="text-emerald-500">{equipment.stock_quantity}</span>
          </p>

          <p className="text-gray-800 font-bold mb-2">
            Price:{" "}
            <span className="text-emerald-500">{equipment.price} TK</span>
          </p>

          <p className="text-gray-800 font-bold mb-2">
            Category:{" "}
            <span className="text-emerald-500">{equipment.category}</span>
          </p>

          <p className="text-gray-800 font-bold mb-4">
            Colour: <span className="text-emerald-500">{equipment.color}</span>
          </p>

          <Link to="/cart">
            <button className="btn bg-[#0E7673] text-white w-full">
              Add-To-Cart
            </button>
          </Link>

          {/* Additional Offer */}
          <div className="mt-4">
            <p className="font-bold mb-2">Additional Offer</p>
            <AdditionalOffer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StethoscopeDetails;
