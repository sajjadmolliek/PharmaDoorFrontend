/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
interface OfferMedicine {
  _id: string;
  name: string;
  brand: string;
  generic: string;
  category: string;
  dosage: string;
  form: string;
  price: string;
  offerPercent: number;
  medicineImage: string;
  stock_quantity: number;
}

type OutletContextType = {
  searchText: string;
};
const OfferSection = () => {
  const [medicineoffers, setMedicineOffers] = useState<OfferMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchText } = useOutletContext<OutletContextType>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;
  const fetchOfferMedicine = async () => {
    setLoading(true);

    try {
      const response = await axios("http://localhost:5000/api/v1/offer");

      setMedicineOffers(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfferMedicine();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#2cabab" height={12} />
      </div>
    );
  }
  if (!medicineoffers.length) {
    return <div>No Offer Medicine</div>;
  }
  const filterOfferProduct = medicineoffers.filter((offers) =>
    offers.name.toLowerCase().includes(searchText.toLowerCase())
  );
  //pagination
  const totalItems = filterOfferProduct.length;
  const totalPage = Math.ceil(totalItems / itemPerPage);
  //slice the current page
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = filterOfferProduct.slice(
    startIndex,
    startIndex + itemPerPage
  );
  const gotToPage = (page: any) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
    window.scroll({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <section className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-center  mb-10">
            Special Offers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((product) => {
              const offerPrice =
                parseFloat(product.price) -
                (parseFloat(product.price) * product.offerPercent) / 100;

              return (
                <div
                  key={product._id}
                  className="relative bg-white rounded-xl shadow hover:shadow-lg transition p-4"
                >
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {product.offerPercent}% OFF
                  </div>

                  <img
                    src={product.medicineImage}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />

                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Brand: {product.brand} | {product.form} | {product.dosage}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Stock: {product.stock_quantity}
                  </p>

                  <div className="mb-4">
                    <span className="text-lg font-bold text-primary">
                      ৳{offerPrice.toFixed(2)}
                    </span>{" "}
                    <span className="text-sm line-through text-gray-400 ml-2">
                      ৳{parseFloat(product.price).toFixed(2)}
                    </span>
                  </div>

                  <a
                    href={`/medicines/specialoffer/${product._id}`}
                    className="inline-block text-sm bg-blue-600 text-white  px-4 py-2 rounded hover:bg-primary-dark transition"
                  >
                    View Details
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button
            onClick={() => gotToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPage)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => gotToPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => gotToPage(currentPage + 1)}
            disabled={currentPage === totalPage}
            className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default OfferSection;
