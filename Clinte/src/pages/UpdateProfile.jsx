import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFile(image);

    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    if (file) formData.append("avatar", file);

    try {
      const res = await fetch("http://localhost:8000/update-profile", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      toast.success("Profile updated successfully");

      if (onClose) onClose();
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6 space-y-5 relative">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <h1 className="text-xl font-bold text-center">
        Update Profile
      </h1>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={preview || "https://via.placeholder.com/120"}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;