import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScaleLoader } from "react-spinners";

type SecloMedicine = {
  _id: string;
  name: string;
  brand: string;
  stock: string;
  price: string;
  medicineImage: string;
  expiryDate?: string;
};

const SecloMedicines = () => {
  const [seclomedicines, setSecloMedicines] = useState<SecloMedicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    fetch("https://pharma-door-backend.vercel.app/api/v1/medicine", {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.data.filter((item: SecloMedicine) => {
          const isSeclo = item.name?.toLowerCase().includes("seclo");

          let isNotExpired = true;
          if (item.expiryDate) {
            const expiry = new Date(item.expiryDate);
            expiry.setHours(0, 0, 0, 0);
            isNotExpired = expiry > today;
          }

          return isSeclo && isNotExpired;
        });

        setSecloMedicines(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Seclo Medicines
      </h1>

      {loading ? (
        <div className="flex justify-center ">
          <ScaleLoader color="#2cabab" height={35} />
        </div>
      ) : (
        <>
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {seclomedicines.map((medicine) => (
              <div
                key={medicine._id}
                className="bg-white border rounded-xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
              >
                <img
                  src={medicine.medicineImage}
                  alt={medicine.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 space-y-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {medicine.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <strong>Brand:</strong> {medicine.brand}
                  </p>
                  <p className="text-base font-bold text-green-600">
                    {medicine.price} Tk
                  </p>
                  <Link to={`/medicines/secloDetails/${medicine._id}`}>
                    <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {seclomedicines.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No valid (non-expired) Seclo medicines found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SecloMedicines;
