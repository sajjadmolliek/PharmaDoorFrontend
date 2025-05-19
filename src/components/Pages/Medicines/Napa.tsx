import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const NapaMedicines = () => {
  const [napamedicines, setNapaMedicines] = useState<NapaMedicine[]>([]);

  useEffect(() => {
    fetch("/napa-secloallmedicine.json")
      .then((res) => res.json())
      .then((data) => {
        const napaData = data.filter((item: NapaMedicine) =>
          item.category.toLowerCase().includes("napa")
        );
        setNapaMedicines(napaData);
      })
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Napa Medicines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {napamedicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-white border rounded-xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
          >
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3 space-y-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {medicine.name}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Generic:</strong> {medicine.generic}
              </p>
              <p className="text-base font-bold text-green-600">
                {medicine.price} Tk
              </p>
              <Link to={`/medicines/napaDetails/${medicine.id}`}>
                <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NapaMedicines;
