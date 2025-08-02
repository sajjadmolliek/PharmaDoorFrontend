/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../privateRoute/AuthContext";
import { CloudUpload } from "lucide-react";

type FormValues = {
  name: string;
  brand: string;
  price: number;
  stock: number;
  medicineType: string;
  manufactureDate: string;
  expiryDate: string;
  medicineImage: FileList;
};

const CreateMedicine = () => {
  const { user } = useAuth();
  const _id = user?._id;
  const name = user?.name;
  const email = user?.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const imageFile = data.medicineImage[0];
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );
        imageUrl = res.data?.data?.url;
      }

      const payload = {
        name: data.name,
        brand: data.brand,
        price: Number(data.price),
        stock: Number(data.stock),
        medicineType: data.medicineType,
        manufactureDate: new Date(data.manufactureDate),
        expiryDate: new Date(data.expiryDate),
        medicineImage: imageUrl,
        createdBy: { _id: String(_id), name, email },
      };

      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:5000/api/v1/medicine",
        payload,
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log(response);
      if (response) {
        toast.success("Medicine created successfully!");
        reset();
        navigate("/pharmacist-dashboard/all-medicine");
      }
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
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded"
            placeholder="Enter medicine name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="block font-medium">Brand</label>
          <input
            type="text"
            {...register("brand", { required: "Brand is required" })}
            className="w-full border p-2 rounded"
            placeholder="Enter brand name"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className="w-full border p-2 rounded"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            {...register("stock", {
              required: "Stock is required",
              min: { value: 0, message: "Stock must be positive" },
            })}
            className="w-full border p-2 rounded"
            placeholder="Enter stock quantity"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Medicine Type</label>
          <select
            {...register("medicineType", {
              required: "Medicine type is required",
            })}
            className="w-full border p-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Select Medicine Type
            </option>
            <option value="Fever">Fever</option>
            <option value="Headache">Headache</option>
            <option value="Diarrhea">Diarrhea</option>
            <option value="Eczema">Eczema</option>
            <option value="Pregnancy">Pregnancy</option>
          </select>

          {errors.medicineType && (
            <p className="text-red-500 text-sm">
              {errors.medicineType.message}
            </p>
          )}
        </div>

        {/* Manufacture Date */}
        <div>
          <label className="block font-medium">Manufacture Date</label>
          <input
            type="date"
            {...register("manufactureDate", {
              required: "Manufacture date is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.manufactureDate && (
            <p className="text-red-500 text-sm">
              {errors.manufactureDate.message}
            </p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block font-medium">Expiry Date</label>
          <input
            type="date"
            {...register("expiryDate", {
              required: "Expiry date is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>
          )}
        </div>

        {/* Medicine Image */}

        <div>
          <label className="block font-medium mb-1">Medicine Image</label>
          <div className="relative w-full">
            <input
              type="file"
              accept="image/*"
              {...register("medicineImage", {
                required: "Image is required",
              })}
              className="w-full h-10 pl-10 pr-2 py-1 text-white bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-md focus:outline-none"
            />
            <CloudUpload className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
          {errors.medicineImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.medicineImage.message}
            </p>
          )}
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
