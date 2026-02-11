import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Building2 } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  // Detect scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Alumni Directory", path: "/alumni-directory" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "Jobs", path: "/jobs" },
    { name: "Posts", path: "/posts" },
    { name: "Donate", path: "/donate" },
    { name: "Events", path: "/events" },
  ];

  const desktopColor = scrolled ? "text-slate-700" : "text-slate-700";

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 
          ${scrolled ? "bg-white/95 shadow-xl" : "bg-white/95"}
          backdrop-blur-md py-1.5 md:py-2`}
      >
        <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 md:space-x-3"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg">
                <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              </div>
              <span className="text-sm md:text-base font-bold text-slate-800">
                AlumNet
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 hover:text-blue-600 text-slate-700`}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setShowLogin(true)}
                className="px-2.5 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-sm font-medium hover:scale-105 transform transition bg-slate-300 text-slate-800"
              >
                Login
              </Link>
              <Link
                to="/register-institute"
                onClick={() => setShowCollegeLogin(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-sm font-medium hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition"
              >
                Register Institute
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${desktopColor}`} />
              ) : (
                <Menu className={`w-6 h-6 ${desktopColor}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-slide-down bg-white">
          <div className="pt-24 px-6">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-medium text-slate-700 hover:text-blue-600"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="text-lg md:text-xl font-medium text-white text-left px-6 py-3 md:px-8 md:py-4 rounded-xl w-fit bg-gray-500 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register-institute"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium w-fit hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition text-base md:text-lg"
              >
                Register Institute
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
