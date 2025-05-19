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
  const [equipment, setequipment] = useState<MedicalProduct | null>(null);

  useEffect(() => {
    fetch("/equipment.json")
      .then((res) => res.json())
      .then((data: MedicalProduct[]) => {
        const found = data.find((item) => item.id === Number(id));
        setequipment(found || null);
      })
      .catch((err) => console.error("Failed to load details:", err));
  }, [id]);

  if (!equipment) {
    return (
      <div className="text-center mt-10 text-red-600">Loading or Not Found</div>
    );
  }
  return (
    <div className="mt-4">
      <div className="flex flex-warm justify-evenly mx-auto">
        <div>
          <img
            src={equipment.image}
            alt={equipment.name}
            className="w-60 h-60 mx-auto object-contain mb-4"
          />

          <div>
            <SafetyAdvice />
          </div>
        </div>
        {/* data */}
        <div className=" bg-white gap-4">
          <div className="h-14 bg-linear-to-bl from-violet-500 to-fuchsia-500">
            <span className="flex flex-wrap py-2 px-2 mx-auto items-center gap-4 text-white">
              ব্যবসার জন্য পাইকারি দামে পণ্য কিনতে চাইলে{" "}
              <Link to="/register">
                <button className="btn btn-secondary">Register</button>
              </Link>
            </span>
          </div>
          <h1 className="text-2xl font-bold mt-2 mb-2 text-red-500">
            {equipment.name}
          </h1>
          <p className="text-gray-700 font-bold mb-4 flex mx-auto items-center gap-2">
            <img src={brandImage} alt="" />{" "}
            <span className="text-emerald-500">{equipment.brand}</span>
          </p>
          <p className="text-gray-800  font-bold mb-4">
            Stock_Quantity:{" "}
            <span className="text-emerald-500 font-bold">
              {" "}
              {equipment.stock_quantity}
            </span>
          </p>
          <p className="text-gray-800  font-bold mb-4">
            Price:{" "}
            <span className="text-emerald-500 "> {equipment.price} TK</span>
          </p>

          <div className="mb-4">
            <p className="font-bold">
              category:{" "}
              <span className="text-emerald-500">{equipment?.category}</span>
            </p>
          </div>
          <div className="mb-4"></div>
          <p className="font-bold mb-4">
            Colour: <span className="text-emerald-500">{equipment.color}</span>
          </p>

          <div className="mt-auto ">
            <Link to="/cart">
              <button className="btn bg-[#0E7673] text-white w-full">
                Add-To-Cart
              </button>
            </Link>
          </div>
          {/* extra data  */}
          <div className="mt-2">
            <div>
              <p className="font-bold mb-2">Additional Offer</p>
              <AdditionalOffer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermomiterDetails;
