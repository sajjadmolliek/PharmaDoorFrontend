import { Link, useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

type Medicine = {
  _id: string;
  name: string;
  price: string;
  medicineType: string;
  description: string;
  medicineImage: string;
};
type OutletContextType = {
  searchText: string;
};
const OtcMedicineDetails = () => {
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const medicineType = queryParams.get("type");
  const { searchText } = useOutletContext<OutletContextType>();
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/medicine")
      .then((res) => res.json())
      .then((response) => {
        const allMedicines: Medicine[] = response.data;
        const filtered = allMedicines.filter(
          (med) => med.medicineType === medicineType
        );
        setFilteredMedicines(filtered);
      })
      .catch((err) => {
        console.error("Error fetching medicine:", err);
      });
  }, [medicineType]);
  const serachFilter = filteredMedicines.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="px-4 mt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-green-600">
        Showing results for: {medicineType}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serachFilter.map((med) => (
          <div
            key={med._id}
            className="bg-white rounded-xl shadow-xl p-4 flex flex-col justify-between"
          >
            <img
              src={med.medicineImage}
              alt={med.name}
              className="h-40 w-full object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">name: {med.name}</h2>
            <h2 className="text-lg font-semibold mb-2">price: {med.price}</h2>
            <p className="text-sm text-gray-600 mb-4">{med.description}</p>

            <Link to={`/medicine-details/${med._id}`}>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtcMedicineDetails;
