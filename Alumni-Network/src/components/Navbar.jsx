import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, Building2, User as UserIcon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const userData = localStorage.getItem("alumnet-user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("alumnet-user");
      window.location.href = "/login";
    }
  };

  const navItems = [
    { name: "Directory", path: "/directory" },
    { name: "Jobs", path: "/jobs" },
    { name: "Posts", path: "/posts" },
    { name: "Events", path: "/events" },
  ];

  if (user) {
    const dashboardPath = user.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
    if (!navItems.find(item => item.path === dashboardPath)) {
      navItems.unshift({ name: "Dashboard", path: dashboardPath });
    }
  }

  return (
    <>
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 font-inter ${
          scrolled 
            ? "py-3 bg-white/70 backdrop-blur-xl border-b border-indigo-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center space-x-3"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-500 group-hover:rotate-12">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className={`text-2xl font-bold tracking-tight font-outfit transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-slate-900 md:text-white"}`}>
                AlumNet
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2 capitalize">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative group ${
                    location.pathname === item.path 
                      ? scrolled ? "text-indigo-600 bg-indigo-50/50" : "text-indigo-600 md:text-white bg-white/10" 
                      : scrolled ? "text-slate-600 hover:text-indigo-600 hover:bg-slate-50" : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-xl -z-10 ${scrolled ? "bg-indigo-50/50" : "bg-white/10"}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}

              <div className="h-4 w-px bg-slate-200/50 mx-4" />

              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 group"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-xs font-bold">Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                      scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
                    }`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register-institute"
                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-all text-slate-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] lg:hidden"
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute top-0 inset-x-0 pt-24 pb-12 px-6 bg-white rounded-b-[2rem] shadow-2xl">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.path}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-4 text-lg font-bold transition-all ${
                        location.pathname === item.path ? "text-indigo-600" : "text-slate-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="h-px bg-slate-100 my-4" />
                
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50 text-red-600 font-bold"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/login"
                      className="w-full py-4 rounded-2xl text-center font-bold text-slate-700 bg-slate-100"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register-institute"
                      className="w-full py-4 rounded-2xl text-center font-bold text-white bg-indigo-600 shadow-xl shadow-indigo-100"
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
