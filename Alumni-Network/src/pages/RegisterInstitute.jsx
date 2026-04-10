import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  University,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register-institute",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Institute registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: "instituteName", label: "Institute Name", icon: University, type: "text" },
    { name: "email", label: "Email Address", icon: Mail, type: "email" },
    { name: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { name: "website", label: "Official Website", icon: Globe, type: "url" },
    { name: "city", label: "City", icon: MapPin, type: "text" },
    { name: "state", label: "State", icon: MapPin, type: "text" },
    { name: "password", label: "Password", icon: Lock, type: "password" },
    { name: "confirmPassword", label: "Confirm Password", icon: Lock, type: "password" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-inter">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-[1.5rem] shadow-xl shadow-indigo-100 mb-6"
          >
            <University className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 font-outfit tracking-tight">
            Register Your Institution
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto italic">
            Empower your graduates and strengthen your community with AlumNet.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {inputFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{field.label}</label>
                  <div className="relative group">
                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              ))}
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-6 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Enter full physical address"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Complete Registration
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              Already registered?{" "}
              <Link to="/login" className="text-indigo-600 font-bold hover:underline">
                Admin Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterInstitute;
