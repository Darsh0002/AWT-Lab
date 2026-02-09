import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlumniPlatform from "./pages/AlumniPlatform";
import LoginPage from "./pages/LoginPage.jsx";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            <>
              {/* <Navbar /> */}
              <AlumniPlatform />
            </>
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/alumni-directory"
          element={
            <>
              <Navbar />
              <AlumniDirectory />
            </>
          }
        />
        <Route
          path="/register-institute"
          element={
            <>
              <Navbar />
              <RegisterInstitute />
            </>
          }
        /> */}

        {/* New pages */}
        {/* <Route
          path="/mentorship"
          element={
            <>
              <Navbar />
              <Mentorship />
            </>
          }
        />
        <Route
          path="/jobs"
          element={
            <>
              <Navbar />
              <Jobs />
            </>
          }
        />
        <Route
          path="/scholarships"
          element={
            <>
              <Navbar />
              <Scholarships />
            </>
          }
        />
        <Route
          path="/posts"
          element={
            <>
              <Navbar />
              <Posts />
            </>
          }
        />
        <Route
          path="/donate"
          element={
            <>
              <Navbar />
              <Donate />
            </>
          }
        />
        <Route
          path="/events"
          element={
            <>
              <Navbar />
              <Events />
            </>
          }
        /> */}

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
    </Router>
  );
};
export default App;

// export default App;