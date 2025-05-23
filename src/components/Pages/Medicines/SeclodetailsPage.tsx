import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdditionalOffer from "../OtcMedicine/AdditionalOffer";
import SafetyAdvice from "../OtcMedicine/SafetyAdvice";
import brandImage from "../../../assets/brand1.png";

type SecloMedicine = {
  id: number;
  name: string;
  generic: string;
  strength: string;
  form: string;
  manufacturer: string;
  uses: string[];
  price: string;
  category: string;
  image: string;
};

const SeclodetailsPage = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState<SecloMedicine | null>(null);

  useEffect(() => {
    fetch("/napa-secloallmedicine.json")
      .then((res) => res.json())
      .then((data: SecloMedicine[]) => {
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
    <div className="mt-4 px-4">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start max-w-6xl mx-auto">
        {/* Left Side: Image + Safety Advice */}
        <div className="w-full md:w-1/3">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full max-w-xs h-60 mx-auto object-contain mb-4"
          />
          <div>
            <SafetyAdvice />
          </div>
        </div>

        {/* Right Side: Medicine Info */}
        <div className="w-full md:w-2/3 bg-white rounded-md shadow-md p-4">
          <div className="h-auto bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-md mb-4">
            <span className="flex flex-col sm:flex-row py-2 px-4 items-center gap-2 text-white text-center sm:text-left">
              ব্যবসার জন্য পাইকারি দামে পণ্য কিনতে চাইলে{" "}
              <Link to="/register">
                <button className="btn btn-secondary">Register</button>
              </Link>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-red-500 mb-2">
            {medicine.name}
          </h1>

          <p className="text-gray-700 font-bold flex items-center gap-2 mb-2">
            <img src={brandImage} alt="brand" className="w-5 h-5" />
            <span className="text-emerald-500">{medicine.manufacturer}</span>
          </p>

          <p className="text-gray-800 font-bold mb-2">
            Generic:{" "}
            <span className="text-emerald-500">{medicine.generic}</span>
          </p>

          <p className="text-gray-800 font-bold mb-2">
            Price: <span className="text-emerald-500">{medicine.price} TK</span>
          </p>

          <p className="text-gray-800 font-bold mb-2">
            Category:{" "}
            <span className="text-emerald-500">{medicine.category}</span>
          </p>

          <p className="text-gray-800 font-bold mb-4">
            Form: <span className="text-emerald-500">{medicine.form}</span>
          </p>

          <Link to="/cart">
            <button className="btn bg-[#0E7673] text-white w-full mb-4">
              Add-To-Cart
            </button>
          </Link>

          <div className="mt-2">
            <p className="font-bold mb-2">Additional Offer</p>
            <AdditionalOffer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeclodetailsPage;
