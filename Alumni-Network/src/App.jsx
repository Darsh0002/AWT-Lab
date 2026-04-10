import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import RegisterInstitute from "./pages/RegisterInstitute";
import Posts from "./pages/Posts";
import Jobs from "./pages/Jobs";
import Events from "./pages/Events";



import AlumniDirectory from "./pages/AlumniDirectory";

import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register-institute"
          element={<RegisterInstitute />}
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student/Alumni Protected Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <Navbar />
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared Protected Routes (Accessible by both roles) */}
        <Route
          path="/alumni-directory"
          element={
            <ProtectedRoute>
              <Navbar />
              <AlumniDirectory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Navbar />
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Navbar />
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Navbar />
              <Events />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for 404 */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-center">
              <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">
                Error - 404
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Oops! The page you’re looking for doesn’t exist.
              </p>
              <a
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Back to Home
              </a>
            </div>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};
export default App;

// export default App;