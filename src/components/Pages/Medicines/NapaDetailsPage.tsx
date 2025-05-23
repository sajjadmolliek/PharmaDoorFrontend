import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SafetyAdvice from "../OtcMedicine/SafetyAdvice";
import AdditionalOffer from "../OtcMedicine/AdditionalOffer";
import brandImage from "../../../assets/brand1.png";

type NapaMedicine = {
  id: number;
  name: string;
  generic: string;
  strength: string;
  form: string;
  manufacturer: string;
  uses: string[];
  price: string;
  image: string;
  category: string;
};

const NapaDetailsPage = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState<NapaMedicine | null>(null);

  useEffect(() => {
    fetch("/napa-secloallmedicine.json")
      .then((res) => res.json())
      .then((data: NapaMedicine[]) => {
        const found = data.find((item) => item.id === Number(id));
        setMedicine(found || null);
      })
      .catch((err) => console.error("Failed to load details:", err));
  }, [id]);

  if (!medicine) {
    return (
      <div className="text-center mt-10 text-red-600">Loading or Not Found</div>
    );
  }

  return (
    <div className="mt-6 px-4">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-start max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-60 h-60 object-contain mb-4"
          />
          <div className="w-full">
            <SafetyAdvice />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md space-y-4">
          <div className="h-14 bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-md flex items-center px-4">
            <span className="text-white text-sm flex flex-wrap gap-2">
              ব্যবসার জন্য পাইকারি দামে পণ্য কিনতে চাইলে{" "}
              <Link to="/register">
                <button className="btn btn-secondary btn-sm">Register</button>
              </Link>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-red-500">{medicine.name}</h1>

          <p className="text-gray-700 font-bold flex items-center gap-2">
            <img src={brandImage} alt="Brand" className="w-6 h-6" />
            <span className="text-emerald-500">{medicine.manufacturer}</span>
          </p>

          <p className="text-gray-800 font-bold">
            Generic:{" "}
            <span className="text-emerald-500 font-semibold">
              {medicine.generic}
            </span>
          </p>

          <p className="text-gray-800 font-bold">
            Price:{" "}
            <span className="text-emerald-500 font-semibold">
              {medicine.price} TK
            </span>
          </p>

          <p className="font-bold">
            Category:{" "}
            <span className="text-emerald-500">{medicine.category}</span>
          </p>

          <p className="font-bold">
            Form: <span className="text-emerald-500">{medicine.form}</span>
          </p>

          <Link to="/cart">
            <button className="btn bg-[#0E7673] text-white w-full">
              Add-To-Cart
            </button>
          </Link>

          {/* Additional Offer */}
          <div>
            <p className="font-bold mb-1">Additional Offer</p>
            <AdditionalOffer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NapaDetailsPage;
