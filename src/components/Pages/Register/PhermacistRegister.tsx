/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import bgVideo from "../../../assets/Science Laboratory 4K Stock Video.mp4";
import toast from "react-hot-toast";

const imgbbApiKey = import.meta.env.IMMAGEBB_API_KEY;

const PharmacistRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    storeName: "",
    phone: "",
    email: "",
    postCode: "",
    nid: "",
    password: "",
  });

  const [nidImage, setNidImage] = useState<File | null>(null);
  const [drugLicenseImage, setDrugLicenseImage] = useState<File | null>(null);
  const [tradeLicenseImage, setTradeLicenseImage] = useState<File | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file);
    }
  };

  const uploadImageToImgbb = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData
    );
    return res.data.data.url;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("formData before submit:", formData);

    try {
      const nidImageUrl = nidImage ? await uploadImageToImgbb(nidImage) : "";
      const drugLicenseImageUrl = drugLicenseImage
        ? await uploadImageToImgbb(drugLicenseImage)
        : "";
      const tradeLicenseImageUrl = tradeLicenseImage
        ? await uploadImageToImgbb(tradeLicenseImage)
        : "";

      const payload = {
        password: formData.password,
        pharmacist: {
          ...formData,
          nidImage: nidImageUrl,
          drugLicenseImage: drugLicenseImageUrl,
          tradeLicenseImage: tradeLicenseImageUrl,
        },
      };

      console.log("payload before submit:", payload);

      await axios.post(
        "http://localhost:5000/api/v1/users/create-phermasist",
        payload
      );
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 max-w-xl w-full mx-auto p-6 bg-white/90 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Pharmacist Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={formData.address}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="storeName"
            placeholder="Store Name"
            onChange={handleChange}
            value={formData.storeName}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phone}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="postCode"
            placeholder="Post Code"
            onChange={handleChange}
            value={formData.postCode}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="nid"
            placeholder="NID Number"
            onChange={handleChange}
            value={formData.nid}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full border p-2 rounded"
            required
          />

          <div>
            <label className="block mb-1">Upload NID Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setNidImage)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Upload Drug License</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setDrugLicenseImage)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Upload Trade License</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setTradeLicenseImage)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have a Pharmacist account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PharmacistRegister;
