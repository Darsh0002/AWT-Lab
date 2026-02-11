import React, { useState, useEffect } from "react";
import {
  Database,
  Mail,
  Calendar,
  Briefcase,
  BarChart3,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Menu,
  CreditCard,
  TrendingUp,
  User,
  Trophy,
  Users,
  Wallet,
  X,
  Star,
  Building2,
  Award,
  Network,
  Eye,
  EyeOff,
  CheckCircle,
  DollarSign,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AlumniPlatform() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  // Removed login/signup popup state

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animated counters
  useEffect(() => {
    const finalValues = [25000, 500, 98, 150000];
    const duration = 1000;
    const steps = 60;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      setCounters(
        finalValues.map((val) =>
          Math.min(Math.floor((val / steps) * frame), val)
        )
      );
      if (frame >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Network,
      title: "Smart Networking Hub",
      desc: "Uses AI-driven algorithms to suggest meaningful connections, fostering professional growth and collaboration among alumni.",
    },
    {
      icon: CreditCard,
      title: "Secure Donation Portal",
      desc: "A portal that ensures transparent and secure financial contributions from alumni to their alma mater.",
    },
    {
      icon: Briefcase,
      title: "AI Career Advisor",
      desc: "Analyzes professional profiles from platforms like LinkedIn, GitHub, and resumes to provide personalized career guidance and mentorship matching.",
    },
    {
      icon: TrendingUp,
      title: "JEN Hub (Job-matching, Employment Networking)",
      desc: "An intelligent job portal that connects alumni with career opportunities, allows for job postings, and facilitates professional networking.",
    },
    {
      icon: User,
      title: "CEM Model (Connect, Engage, and Mentor)",
      desc: "A model designed to facilitate meaningful interactions among alumni, which enhances knowledge sharing and professional growth within the community.",
    },
    {
      icon: Users,
      title: "Alumni Start-up Incubator",
      desc: "A feature that supports and incubates start-ups founded by alumni, fostering entrepreneurship within the community.",
    }
  ];

  const stats = [
    { value: counters[0], suffix: "+", label: "Alumni Professionals" },
    { value: counters[1], suffix: "+", label: "Partner Institutions" },
    { value: counters[2], suffix: "%", label: "Industry Coverage" },
    { value: counters[3], suffix: "+", label: "Career Connections" },
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Dean of Industry Relations, IIT Delhi",
      text: "AlumniSetu helped us increase industry partnerships by 300%. Our alumni network now spans Fortune 500 companies globally.",
      rating: 5,
      company: "IIT Delhi",
    },
    {
      name: "Rajesh Kumar",
      role: "Senior VP, Tech Mahindra",
      text: "The platform made it effortless to connect with fellow alumni and mentor current students. A game-changer for professional networking.",
      rating: 5,
      company: "IIM Bangalore Alumnus",
    },
    {
      name: "Prof. Anjali Menon",
      role: "Director, Placement Cell, BITS Pilani",
      text: "Our placement rates improved by 40% thanks to the strong alumni network and industry connections facilitated by this platform.",
      rating: 5,
      company: "BITS Pilani",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    if (loginType === "student") {
      console.log("Student login:", loginData);
      alert("Student login successful! Redirecting...");
    } else if (loginType === "alumni") {
      console.log("Alumni login:", loginData);
      alert("Alumni login successful! Redirecting...");
    } else if (loginType === "institute") {
      console.log("Institute login:", loginData);
      alert("Institute login successful! Redirecting...");
    }

    // Reset
    setShowLogin(false);
    setLoginData({
      email: "",
      password: "",
      instituteName: "",
      contactPerson: "",
      phone: "",
    });
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCollegeRegister = (e) => {
    e.preventDefault();
    // Handle college registration logic
    console.log("College registration:", loginData);
    alert("OTP Sent to your email! Please verify to complete registration.");
    setShowCollegeLogin(false);
    setLoginData({
      email: "",
      password: "",
      instituteName: "",
      contactPerson: "",
      phone: "",
    });
  };

  // Note: The handleStudentLogin function is unused in the original code, but we'll leave it for completeness.
  const handleStudentLogin = (e) => {
    e.preventDefault();
    // Handle student login logic
    console.log("Student login:", loginData);
    alert("Login successful! Redirecting to dashboard...");
    setShowStudentLogin(false);
    setLoginData({
      email: "",
      password: "",
      instituteName: "",
      contactPerson: "",
      phone: "",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-40 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="relative z-10 w-full flex justify-center">
          <div className="bg-white/90 rounded-3xl shadow-2xl px-6 py-6 mt-20 max-w-5xl w-full text-center border border-blue-100 backdrop-blur-md mx-4 my-8">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-9 h-9 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Stay Connected with Your
              <span className="bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 bg-clip-text text-transparent block">
                Alumni Community
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 mb-4 max-w-2xl mx-auto">
              Build lifelong connections, discover opportunities, and strengthen your bond with your alma mater through a modern alumni engagement platform.
            </p>
            <p className="text-base text-slate-500 max-w-xl mx-auto mb-8">
              Join thousands of students, graduates, and institutions fostering career growth, mentorship, and real-world collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                to="/register-institute"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold text-base shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                disabled
              >
                Register Your Institution
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold text-base shadow hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group border border-indigo-100"
                disabled
              >
                Login
              </Link>
            </div>
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 mt-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-1">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-slate-600 text-xs md:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Enterprise-Grade{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Alumni Solutions
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced tools designed for institutions that demand excellence in
              alumni engagement and data intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
                Why Leading Institutions Choose{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AlumNet
                </span>
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mr-6">
                    <Shield className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      Enhanced Career Opportunities
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      AlumNet’s AI-driven networking hub connects alumni with
                      job opportunities, peers, and mentors. This can boost job
                      prospects by 20–30%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mr-6">
                    <Zap className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      Increased Alumni Engagement
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Features like the CEM Model and gamification increase
                      participation by 30–50%, fostering mentorship and
                      knowledge sharing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mr-6">
                    <Globe className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      Improved Fundraising & University Funding
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      A blockchain-secured donation portal ensures transparency
                      and trust. This can increase alumni donations by 15–25%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mr-6">
                    <Star className="w-7 h-7 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      Educational & Entrepreneurial Support
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      AlumNet gives students real-world insights, lifelong
                      learning opportunities, and access to an alumni start-up
                      incubator and scholarships.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <h4 className="text-2xl font-bold text-slate-800 mb-6">
                  Platform Performance
                </h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-700 font-medium">
                      Alumni Engagement
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 h-3 bg-slate-200 rounded-full mr-3">
                        <div className="w-28 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-green-600">
                        30–50% Increase
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-700 font-medium">
                      Job Prospects
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 h-3 bg-slate-200 rounded-full mr-3">
                        <div className="w-30 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-blue-600">
                        20–30% Increase
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-700 font-medium">
                      Alumni Donations
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 h-3 bg-slate-200 rounded-full mr-3">
                        <div className="w-24 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-purple-600">
                        15–25% Increase
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-700 font-medium">
                      Student Career Readiness
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 h-3 bg-slate-200 rounded-full mr-3">
                        <div className="w-31 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-emerald-600">
                        40% Increase
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="flex items-center text-blue-700">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-semibold">
                      This is a summary of the potential impact on our target
                      audience.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <SuccessStories /> */}

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Success Stories from{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Leading Institutions
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how leading universities and colleges are transforming
              their alumni relations with our platform.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-10 transition-all duration-700 ease-in-out">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {Array.from({
                    length: testimonials[activeTestimonial].rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-yellow-400 mr-1"
                    />
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>

              <blockquote className="text-2xl text-slate-700 mb-8 leading-relaxed font-medium">
                "{testimonials[activeTestimonial].text}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-lg">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-slate-600">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    i === activeTestimonial
                      ? "bg-blue-600 scale-125"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-16 text-center">
            <p className="text-slate-500 mb-8 text-lg">
              Trusted by institutions worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="flex items-center justify-center space-x-2">
                <Building2 className="w-8 h-8 text-slate-400" />
                <span className="font-bold text-slate-600">IIT Network</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <GraduationCap className="w-8 h-8 text-slate-400" />
                <span className="font-bold text-slate-600">IIM Alliance</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-8 h-8 text-slate-400" />
                <span className="font-bold text-slate-600">
                  Top Universities
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Globe className="w-8 h-8 text-slate-400" />
                <span className="font-bold text-slate-600">
                  Global Partners
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-2000"></div>

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Alumni Relations?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-200 mb-6 max-w-4xl mx-auto">
            <span className="font-bold text-blue-300">500+ institutions</span>{" "}
            already using{" "}
            <span className="font-bold text-blue-300 ">AlumNet</span> to build
            stronger alumni networks.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link
              to="/register-institute"
              onClick={() => setShowCollegeLogin(true)}
              className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            >
              Register Institute Today
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Enhanced Engagement</h3>
              <p className="text-slate-300 text-sm">
                Increase alumni participation with AI-driven networking and
                gamification.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Improved Fundraising</h3>
              <p className="text-slate-300 text-sm">
                Increase alumni donations with a transparent, blockchain-secured
                portal.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Stronger Connections</h3>
              <p className="text-slate-300 text-sm">
                Mentorship programs can lead to a 60% increase in student career
                readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Company info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-white">AlumNet</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed max-w-md">
                Empowering educational institutions to build thriving alumni
                communities through intelligent networking, data analytics, and
                meaningful engagement.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-blue-400" />
                  <span>contact@alumnet.com</span>
                </div>
                <div className="flex items-center text-sm">
                  <Globe className="w-4 h-4 mr-3 text-blue-400" />
                  <span>WorldWide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-slate-800 flex justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <p className="text-slate-400 text-sm">
                  &copy; 2025 AlumNet. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
