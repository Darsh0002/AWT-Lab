import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            <>
              {/* <Navbar />  */}
              <LandingPage />
            </>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <>
              <AdminDashboard />
            </>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <>
              <Navbar />
              <StudentDashboard />
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
        {/*<Route*/}
        {/*  path="/alumni-directory"*/}
        {/*  element={*/}
        {/*    <>*/}
        {/*      <Navbar />*/}
        {/*      <AlumniDirectory />*/}
        {/*    </>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path="/register-institute"*/}
        {/*  element={*/}
        {/*    <>*/}
        {/*      <Navbar />*/}
        {/*      <RegisterInstitute />*/}
        {/*    </>*/}
        {/*  }*/}
        {/*/> */}

        {/* New pages */}
        {/* 
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