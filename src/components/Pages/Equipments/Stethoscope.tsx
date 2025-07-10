import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScaleLoader } from "react-spinners";

type MedicalProduct = {
  _id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  stock_quantity: number;
  rating: number;
  color: string;

  medicineImage: string;
};
type OutletContextType = {
  searchText: string;
};
const StethoscopePage = () => {
  const { searchText } = useOutletContext<OutletContextType>();
  const [medicalProducts, setMedicalProducts] = useState<MedicalProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    fetch("https://pharma-door-backend.vercel.app/api/v1/equipment")
      .then((res) => res.json())
      .then((data) => {
        const allMedicatProduct = data.data.filter((item: MedicalProduct) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setMedicalProducts(allMedicatProduct);
        setLoading(false);
      });
  }, [searchText]);

  if (loading) {
    return (
      <div className="flex justify-center ">
        <ScaleLoader color="#2cabab" height={35} />
      </div>
    );
  }
  return (
    <div>
      <div className="px-4 py-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Napa equipments
        </h1>
        <div
          data-aos="zoom-out-left"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {medicalProducts.map((equipment) => (
            <div
              key={equipment._id}
              className="bg-white border rounded-xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <img
                src={equipment.medicineImage}
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
                <Link to={`/equipments/${equipment._id}`}>
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

export default StethoscopePage;
