import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import brandImage from "../../../assets/brand1.png";
// import percentageImage from "../../../assets/percentage.png";

import AdditionalOffer from "./AdditionalOffer";
import SafetyAdvice from "./SafetyAdvice";

type Medicine = {
  id: number;
  name: string;
  brand: string;
  generic: string;
  category: string;
  dosage: string;
  form: string;
  price: string;
  image: string;
};

const AllMedicineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [medicine, setMedicine] = useState<Medicine | null>(null);

  useEffect(() => {
    fetch("/alloticemedicine.json")
      .then((res) => res.json())
      .then((data: Medicine[]) => {
        const found = data.find((med) => med.id === Number(id));
        setMedicine(found || null);
      });
  }, [id]);

  if (!medicine) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Medicine not found.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex flex-warm justify-evenly mx-auto">
        <div>
          <img
            src={medicine.image}
            alt={medicine.name}
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
            {medicine.name}
          </h1>
          <p className="text-gray-700 font-bold mb-4 flex mx-auto items-center gap-2">
            <img src={brandImage} alt="" />{" "}
            <span className="text-emerald-500">{medicine.brand}</span>
          </p>
          <p className="text-gray-800  font-bold mb-4">
            Genric:{" "}
            <span className="text-emerald-500 font-bold">
              {" "}
              {medicine.generic}
            </span>
          </p>
          <p className="text-gray-800  font-bold mb-4">
            Price:{" "}
            <span className="text-emerald-500 "> {medicine.price} TK</span>
          </p>

          <div className="mb-4">
            <p className="font-bold">
              Dosage:{" "}
              <span className="text-emerald-500">{medicine?.dosage}</span>
            </p>
          </div>
          <div className="mb-4"></div>
          <p className="font-bold mb-4">
            Form: <span className="text-emerald-500">{medicine?.form}</span>
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

export default AllMedicineDetails;
