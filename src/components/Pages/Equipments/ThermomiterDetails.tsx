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

const ThermomiterDetails = () => {
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
    <div className="mt-6 px-4">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start max-w-6xl mx-auto">
        {/* Image + Safety Advice */}
        <div className="flex flex-col items-center w-full lg:w-1/2">
          <img
            src={equipment.image}
            alt={equipment.name}
            className="w-64 h-64 object-contain mb-4"
          />
          <SafetyAdvice />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 bg-white shadow-md p-4 rounded-md space-y-4">
          <div className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 h-auto py-2 px-3 rounded text-white text-sm flex flex-wrap items-center justify-between gap-2">
            <span>ব্যবসার জন্য পাইকারি দামে পণ্য কিনতে চাইলে</span>
            <Link to="/register">
              <button className="btn btn-secondary text-xs">Register</button>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-red-500">{equipment.name}</h1>

          <p className="text-gray-700 font-bold flex items-center gap-2">
            <img src={brandImage} alt="Brand" className="w-5 h-5" />
            <span className="text-emerald-500">{equipment.brand}</span>
          </p>

          <p className="text-gray-800 font-bold">
            Stock Quantity:
            <span className="text-emerald-500 ml-2">
              {equipment.stock_quantity}
            </span>
          </p>

          <p className="text-gray-800 font-bold">
            Price:
            <span className="text-emerald-500 ml-2">{equipment.price} TK</span>
          </p>

          <p className="text-gray-800 font-bold">
            Category:
            <span className="text-emerald-500 ml-2">{equipment.category}</span>
          </p>

          <p className="text-gray-800 font-bold">
            Colour:
            <span className="text-emerald-500 ml-2">{equipment.color}</span>
          </p>

          <Link to="/cart">
            <button className="btn bg-[#0E7673] text-white w-full">
              Add To Cart
            </button>
          </Link>

          {/* Extra */}
          <div>
            <p className="font-bold mb-1">Additional Offer</p>
            <AdditionalOffer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermomiterDetails;
