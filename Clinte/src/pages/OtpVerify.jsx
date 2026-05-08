import React, { useRef, useState } from "react";

const OtpVerify = ({ length = 4, onSubmit }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(otp.join(""));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative overflow-hidden">
      {/* Glow SVG Background */}
      <svg
        className="absolute w-72 opacity-40 blur-2xl animate-bounce"
        style={{ animationDuration: "4s" }}
        viewBox="0 0 200 200"
      >
        <path
          fill="#369eff"
          d="M39.9,-65.7C51.8,-58.6,62.3,-49.1,68.4,-37.2C74.5,-25.3,76.2,-12.6,74.7,-0.9C73.2,10.8,68.5,21.6,62.2,32.5C55.8,43.4,47.8,54.5,36.9,62.5C26,70.5,13,75.5,-0.9,77C-14.8,78.5,-29.6,76.5,-42.2,69.4C-54.8,62.3,-65.2,50.1,-70.7,36.1C-76.2,22.1,-76.8,6.3,-73.4,-8.4C-70,-23.1,-62.6,-36.7,-52,-45.8C-41.4,-54.9,-27.6,-59.6,-14.2,-64.6C-0.8,-69.7,12.1,-75.1,39.9,-65.7Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col items-center gap-6
        bg-white/5 border border-blue-700 backdrop-blur-xl
        rounded-2xl p-8 shadow-xl w-[320px]"
      >
        <p className="text-blue-700 font-bold text-lg">Enter your verification code</p>

        {/* Inputs */}
        <div className="flex gap-2">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 text-center text-black bg-transparent
               border border-blue-700 rounded-lg
              focus:border-black outline-none transition
              opacity-80 focus:opacity-100"
            />
          ))}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 border border-[#369eff] text-blue-700
          rounded-lg transition hover:bg-blue-700 hover:text-white cursor-pointer"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;