import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Data:", formData);
      alert("Registration successful!");
    }
  };
  return (
     <div className="min-h-screen bg-[#e3d6c5] relative overflow-hidden flex flex-col lg:flex-row font-sans">

    {/* Background blobs */}
    <div className="absolute top-[-10%] left-[5%] w-72 h-72 sm:w-96 sm:h-96 bg-[#d4c4b1] rounded-full opacity-50"></div>
    <div className="absolute bottom-[5%] left-[20%] w-40 h-40 sm:w-64 sm:h-64 bg-[#d4c4b1] rounded-full opacity-50 hidden sm:block"></div>

    {/* LEFT SIDE */}
    <div className="w-full lg:w-1/2 flex items-center justify-center z-10 px-6 py-10">

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />

          <Button type="submit" className="w-full">
            Sign In
          </Button>

        </form>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="w-full lg:w-1/2 relative flex items-center justify-center py-10 lg:py-0">

      <div className="absolute w-[140%] h-[140%] bg-[#4751b9] rounded-full top-[10%] lg:top-[-20%] lg:right-[-30%]"></div>

      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e09b2d] mb-4">
          Get Started
        </h2>

        <p className="text-[#a8aee0] mb-6 text-xs sm:text-sm font-semibold">
          Welcome!
        </p>

        <Link to="/registration" className="px-8 sm:px-10 py-2 border-2 border-[#e09b2d] text-[#e3d6c5] rounded-2xl hover:bg-[#e09b2d] hover:text-white transition text-sm sm:text-base">
          Sign Up
        </Link>
      </div>
    </div>

  </div>
  )
}

export default Login