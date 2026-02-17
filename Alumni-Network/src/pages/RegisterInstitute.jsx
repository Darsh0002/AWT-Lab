import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaCity,
  FaFlag,
  FaHashtag,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterInstitute = () => {
  const [formData, setFormData] = useState({
    instituteName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    website: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register-institute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      setSuccess(true);

      alert(
        `Institute registered successfully!\n\nAdmin Email: ${data.adminLogin.email}\nTemporary Password: ${data.adminLogin.temporaryPassword}\n\nPlease save these credentials.`,
      );

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full mx-auto"
      >
        <div className="flex flex-col items-center mt-5 mb-6">
          <div className="bg-blue-600 rounded-full p-3 shadow-lg mb-2">
            {/* SVG logo */}
            <img
              src="/favicon-alumnet.svg"
              alt="Alumni Logo"
              className="w-12 h-12"
            />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
            Register Your Institute
          </h2>
          <p className="mt-2 text-lg text-gray-700 text-center max-w-xl">
            Join our alumni network platform and connect with your graduates
          </p>
        </div>

        <div className="bg-white bg-opacity-90 py-10 px-8 shadow-2xl rounded-2xl border border-blue-200 sm:px-12 transition-all duration-300">
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 text-green-700 bg-green-100 border border-green-300 rounded-lg px-4 py-2 text-center font-semibold"
            >
              Institute registered successfully!
            </motion.div>
          )}
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-7 gap-x-6 sm:grid-cols-2">
              {/* Institute Name */}
              <div className="relative">
                <label
                  htmlFor="instituteName"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  Institute Name
                </label>
                <div className="flex items-center">
                  <FaUniversity className="absolute ml-3 text-blue-400 text-lg" />
                  <input
                    type="text"
                    name="instituteName"
                    id="instituteName"
                    value={formData.instituteName}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  Email
                </label>
                <div className="flex items-center">
                  <FaEnvelope className="absolute ml-3 text-blue-400 text-lg" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="flex items-center">
                  <FaPhone className="absolute ml-3 text-blue-400 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="relative">
                <label
                  htmlFor="website"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  Website
                </label>
                <div className="flex items-center">
                  <FaGlobe className="absolute ml-3 text-blue-400 text-lg" />
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="sm:col-span-2 relative">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  Address
                </label>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="absolute ml-3 text-blue-400 text-lg" />
                  <textarea
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>

              {/* City */}
              <div className="relative">
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  City
                </label>
                <div className="flex items-center">
                  <FaCity className="absolute ml-3 text-blue-400 text-lg" />
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>

              {/* State */}
              <div className="relative">
                <label
                  htmlFor="state"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  State
                </label>
                <div className="flex items-center">
                  <FaFlag className="absolute ml-3 text-blue-400 text-lg" />
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  Password
                </label>
                <div className="flex items-center">
                  <FaLock className="absolute ml-3 text-blue-400 text-lg" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-blue-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="flex items-center">
                  <FaLock className="absolute ml-3 text-blue-400 text-lg" />
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-3 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-blue-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
              >
                Register Institute
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterInstitute;
