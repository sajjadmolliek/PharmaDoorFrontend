import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const ThermomiterPage = () => {
  const [medicalProducts, setMedicalProducts] = useState<MedicalProduct[]>([]);

  useEffect(() => {
    fetch("/equipment.json")
      .then((res) => res.json())
      .then((data) => {
        const allMedicatProduct = data.filter((item: MedicalProduct) =>
          item.category.toLowerCase().includes("thermometer")
        );
        setMedicalProducts(allMedicatProduct);
      });
  }, []);
  return (
    <div>
      <div className="px-4 py-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Thermomiter Equipments
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {medicalProducts.map((equipment) => (
            <div
              key={equipment.id}
              className="bg-white border rounded-xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {equipment.name}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>Generic:</strong> {equipment.brand}
                </p>
                <p className="text-base font-bold text-green-600">
                  {equipment.price} Tk
                </p>
                <Link to={`/equipments/${equipment.id}`}>
                  <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThermomiterPage;
