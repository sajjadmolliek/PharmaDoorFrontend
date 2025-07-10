/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "../privateRoute/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const PharmacistProfile = () => {
  const { user, updateUser } = useAuth();
  const _id = user?._id;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );
      const imageUrl = response.data.data.display_url;
      setProfileImage(imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/${_id}`,
        {
          name,
          email,
          profileImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      console.log(response);
      if (response.data) {
        toast.success(" Profile updated successfully!");

        updateUser(response.data.user);
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Something went wrong while updating.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div>
        <p className="text-red-600  mb-2 text-center text-sm">
          ⚠️ After updating your profile, you will be logged out automatically
          security purpase. Please log in again to see your updated details.
        </p>
      </div>
      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Pharmacist Profile
        </h1>

        <div className="space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={profileImage || "https://i.pravatar.cc/150"}
              alt="Pharmacist"
              className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-md"
            />
          </div>

          {/* File input to upload */}
          <div className="mb-6">
            <label
              htmlFor="profileImage"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Upload Profile Image
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadingImage}
              className="
      block w-full
      text-sm text-gray-600
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-600 file:text-white
      hover:file:bg-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-500
      cursor-pointer
      transition
      shadow-md
    "
            />
            {uploadingImage && (
              <p className="mt-2 text-sm text-blue-600 font-medium animate-pulse">
                Uploading...
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none text-gray-700"
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none text-gray-700"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none text-gray-700"
            />
          </div>

          {/* Update Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacistProfile;
