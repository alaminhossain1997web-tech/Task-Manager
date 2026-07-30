import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../Services/api";

const UpdateProfile = ({ onClose }) => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const closePage = () => {
    if (onClose) {
      onClose();
      return;
    }

    navigate("/");
  };

  const handleFileChange = (event) => {
    const image = event.target.files?.[0] || null;
    setFile(image);
    setPreview(image ? URL.createObjectURL(image) : null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    if (file) {
      formData.append("avatar", file);
    }

    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      closePage();
    } catch (error) {
      toast.error(error?.data?.message || "Update failed. Please try again.");
    }
  };

  const imageSource = preview || profile?.avatar;
  const profileInitial = profile?.fullName?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6 space-y-5 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={closePage}
          disabled={isLoading}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl disabled:cursor-not-allowed"
          aria-label="Close profile update form"
        >
          ×
        </button>

        <h1 className="text-xl font-bold text-center">
          Update Profile
        </h1>

        {/* Image */}
        <div className="flex justify-center">
          {imageSource ? (
            <img
              src={imageSource}
              alt="avatar preview"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-semibold border">
              {profileInitial || "U"}
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            disabled={isLoading}
            className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
