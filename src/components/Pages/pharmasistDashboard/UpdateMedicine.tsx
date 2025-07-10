/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

const UpdateMedicine = () => {
  const { _id } = useParams(); // Ensure route is /medicine/:id
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const nevigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    stock: 0,
    medicineImage: "",
    manufactureDate: "",
    expiryDate: "",
  });

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await axios.get(
          `https://pharma-door-backend.vercel.app/api/v1/medicine/${_id}`
        );
        const data = res.data?.data;
        setFormData({
          name: data.name,
          brand: data.brand,
          price: data.price,
          stock: data.stock,
          medicineImage: data.medicineImage,
          manufactureDate: data.manufactureDate.slice(0, 10),
          expiryDate: data.expiryDate.slice(0, 10),
        });
      } catch (err) {
        toast.error("Failed to load medicine data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "medicineImage" && files) {
      const file = files[0];
      setImageFile(file);
      setFormData((prev) => ({
        ...prev,
        medicineImage: URL.createObjectURL(file), // for preview only
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" || name === "stock" ? Number(value) : value,
      }));
    }
  };

  const uploadImageToImgbb = async (image: File): Promise<string | null> => {
    const body = new FormData();
    body.set("image", image);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        body
      );
      console.log(response);
      return response.data.data.url;
    } catch (error) {
      toast.error("Image upload failed!");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) return toast.error("Unauthorized! Login again.");

    try {
      let uploadedImageUrl = formData.medicineImage;

      // If a new image file was selected, upload it
      if (imageFile) {
        const uploaded = await uploadImageToImgbb(imageFile);
        if (!uploaded) return;
        uploadedImageUrl = uploaded;
      }

      const updatedData = {
        ...formData,
        medicineImage: uploadedImageUrl,
      };

      await axios.patch(
        `https://pharma-door-backend.vercel.app/api/v1/medicine/${_id}`,
        updatedData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Medicine updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update medicine.");
    }
    nevigate("/pharmacist-dashboard/all-medicine");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Update Medicine</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "brand"].map((field) => (
          <div key={field}>
            <label className="block capitalize">{field}:</label>
            <input
              type="text"
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="border px-3 py-2 w-full rounded"
              required
            />
          </div>
        ))}

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label>Manufacture Date:</label>
          <input
            type="date"
            name="manufactureDate"
            value={formData.manufactureDate}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label>Expiry Date:</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block">Medicine Image:</label>
          <input
            type="file"
            name="medicineImage"
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
          {formData.medicineImage && (
            <img
              src={formData.medicineImage}
              alt="preview"
              className="mt-2 w-40 h-40 object-cover border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMedicine;
