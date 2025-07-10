import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

type AllMedicine = {
  _id: string;
  name: string;
  brand: string;
  stock: string;
  price: number;
  medicineImage: string;
  expiryDate?: string;
};

const ITEMS_PER_PAGE = 6;

type OutletContextType = {
  searchText: string;
};

const AllProducts = () => {
  const { searchText } = useOutletContext<OutletContextType>();

  const [allProducts, setAllProducts] = useState<AllMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/medicine")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const validMedicines = data.data.filter((item: AllMedicine) => {
          if (!item.expiryDate) return true;
          const expiryDate = new Date(item.expiryDate);
          expiryDate.setHours(0, 0, 0, 0);
          return expiryDate >= today;
        });

        setAllProducts(validMedicines);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch medicines:", err);
        setLoading(false);
      });
  }, []);

  // Filter by searchText (case-insensitive)
  const filteredProducts = allProducts.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <ScaleLoader color="#2cabab" height={12} />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        All Medicines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No available medicines found.
          </p>
        ) : (
          paginatedProducts.map((medicine) => (
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
                <Link to={`/products/${medicine._id}`}>
                  <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-700 text-white"
                : "bg-white text-blue-500 border border-blue-500"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
