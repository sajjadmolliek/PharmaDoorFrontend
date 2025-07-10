import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";

const UpdateExpireMedicines = () => {
  const { _id } = useParams();
  const [expiryDate, setExpireDate] = useState("");
  const [loading, setLoading] = useState(true);
  const nevigate = useNavigate();
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/medicine/${_id}`
        );
        setExpireDate(res.data?.data?.expireDate || "");
      } catch (err) {
        console.error("Failed to fetch medicine:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Access token not found. Please login first.");
        return;
      }
      const res = await axios.patch(
        `http://localhost:5000/api/v1/medicine/${_id}`,
        { expiryDate },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      toast.success("Expire date updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update expire date.");
    }
    nevigate("/pharmacist-dashboard/expire-medicines");
  };

  if (loading)
    return (
      <p>
        {" "}
        <ScaleLoader color="#2cabab" height={12} />
      </p>
    );

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold mb-4">Update Expire Date</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="expireDate" className="block mb-1 font-medium">
            Expire Date:
          </label>
          <input
            type="date"
            id="expireDate"
            value={expiryDate}
            onChange={(e) => setExpireDate(e.target.value)}
            className="border px-4 py-2 w-full rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateExpireMedicines;
