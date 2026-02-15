import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  { label: "Institute Admin", value: "admin" },
  { label: "Student/Alumni", value: "student" },
];

export default function LoginPage() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("alumnet-user", JSON.stringify(data.user));

      alert("Login successful");

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-0 m-0">
      <div className="flex flex-col md:flex-row w-full max-w-3xl mt-12 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-lg border border-blue-200">
        {/* Left: Illustration and Welcome Text */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 p-4 md:p-6">
          <img
            src="./login-image.jpg"
            alt="Students"
            className="max-w-[120px] md:max-w-[160px] w-full mb-4 object-contain drop-shadow-xl rounded-2xl border border-blue-200"
          />
          <h2 className="text-2xl font-extrabold text-blue-700 mb-1 tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-indigo-700 text-center max-w-xs text-base font-medium mb-2">
            Connect with your alumni network and unlock new opportunities.
          </p>
          <div className="flex gap-2 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-100"></span>
            <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-200"></span>
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="md:w-1/2 flex flex-col justify-center p-4 md:p-6 bg-white/90">
          <div className="max-w-xs w-full mx-auto">
            <h1 className="text-xl md:text-2xl font-extrabold mb-4 text-center text-indigo-700 tracking-tight">
              Login to your account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block font-semibold mb-2 text-blue-700">
                  Select Role
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-blue-50 text-blue-700 font-medium"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-blue-700">
                  Email address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-blue-50 text-blue-700 font-medium"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-blue-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-blue-50 text-blue-700 font-medium"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="flex items-center justify-between mb-2">
                <a
                  href="#"
                  className="text-indigo-600 font-semibold text-sm hover:underline"
                >
                  Forgot your password?
                </a>
              </div> */}
              <button
                type="submit"
                className="w-full py-2 font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-base"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
