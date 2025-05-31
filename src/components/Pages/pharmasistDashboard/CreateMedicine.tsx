/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../privateRoute/AuthContext";

type FormValues = {
  name: string;
  brand: string;
  price: number;
  stock: number;
  manufactureDate: string;
  expiryDate: string;
};

const CreateMedicine = () => {
  const { user } = useAuth();
  const _id = user?._id;
  const name = user?.name;
  const email = user?.email;
  console.log(_id, name, email);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        createdBy: { _id, name, email }, // add user id here
      };
      // Optional: validate expiry date here too if needed
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:5000/api/v1/medicine", // <-- Update with your actual backend API
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response);
      if (response) {
        toast.success("Medicine created successfully!");
        reset();
      }

      navigate("/Pdashboard/pharmacist-dashboard/products");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create medicine"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add New Medicine
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter medicine name"
          />
        </div>

        <div>
          <label className="block font-medium">Brand</label>
          <input
            type="text"
            {...register("brand", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter brand name"
          />
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            {...register("stock", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter stock quantity"
          />
        </div>

        <div>
          <label className="block font-medium">Manufacture Date</label>
          <input
            type="date"
            {...register("manufactureDate", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Expiry Date</label>
          <input
            type="date"
            {...register("expiryDate", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMedicine;
