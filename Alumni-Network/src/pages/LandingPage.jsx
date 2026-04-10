import React, { useState, useEffect } from "react";
import {
  Briefcase,
  ArrowRight,
  TrendingUp,
  User,
  Star,
  Building2,
  Award,
  Network,
  Shield,
  Zap,
  GraduationCap,
  Users,
  Trophy,
  Sparkles,
  ChevronRight,
  Globe,
  Rocket
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiff: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("alumnet-user");
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        navigate(user.role === "admin" ? "/admin-dashboard" : "/student-dashboard");
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { icon: Network, title: "Smart Networking", desc: "Our AI-driven matching engine connects you with alumni sharing your career path and interests.", color: "indigo" },
    { icon: Briefcase, title: "Career Growth", desc: "Access the exclusive JEN Hub for premium job board postings and career advisory services.", color: "blue" },
    { icon: Rocket, title: "Startup Circle", desc: "Supporting ventures with our focused alumni incubator program and venture network.", color: "violet" },
    { icon: GraduationCap, title: "Mentorship Lab", desc: "Bridge the gap between campus and industry through structured mentorship tracks.", color: "cyan" },
    { icon: Globe, title: "Global Reach", desc: "A boundary-less network of professionals spanning 150+ countries and all major sectors.", color: "emerald" },
    { icon: Shield, title: "Verified Network", desc: "A secure, closed-loop ecosystem verified through official institutional databases.", color: "rose" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-[#f8fafc] font-inter selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-cyan-400 z-[1000] origin-left" style={{ scaleX }} />
      
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Advanced Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-[10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[150px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-0 -right-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_70%)]" />
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10 shadow-2xl"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-ping shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            <span className="text-xs font-black text-indigo-300 uppercase tracking-[0.25em]">Elevating Connections Globally</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black text-white mb-10 leading-[1.05] tracking-tight font-outfit"
          >
            Empower Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient whitespace-nowrap">
              Alumni Ecosystem
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto mb-14 leading-relaxed font-medium"
          >
            Join a premium network designed for the world's most ambitious professionals. Bridge the gap between alma mater and industry with AlumNet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link
              to="/register-institute"
              className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] hover:bg-indigo-700 transition-all hover:-translate-y-2 flex items-center justify-center group uppercase tracking-widest"
            >
              Start Your Journey
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-12 py-5 bg-white/5 text-white rounded-[2rem] font-black text-lg border border-white/10 backdrop-blur-2xl hover:bg-white/10 transition-all hover:-translate-y-2 flex items-center justify-center uppercase tracking-widest"
            >
              Member Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust & Metrics Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Professionals", value: "25k+", icon: Users },
              { label: "Premium Institutions", value: "500+", icon: Building2 },
              { label: "Network Coverage", value: "98%", icon: Globe },
              { label: "Job Placements", value: "15k+", icon: Briefcase },
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i} 
                className="text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <stat.icon size={24} />
                  </div>
                </div>
                <div className="text-4xl font-black text-slate-900 mb-2 font-outfit tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-6 underline underline-offset-8 decoration-2 decoration-indigo-200">The Power of Network</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 font-outfit tracking-tight">Enterprise Infrastructure, <br /> Community Heart.</h3>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Every feature is engineered to foster high-value interactions and sustainable institutional growth.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                variants={itemVariants}
                key={i}
                className="premium-card p-10 group bg-white rounded-[2.5rem] border border-slate-100 hover:border-indigo-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:rotate-6 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-500 shadow-sm group-hover:shadow-indigo-200">
                  <feature.icon className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 font-outfit uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium mb-8 line-clamp-3 italic">
                  "{feature.desc}"
                </p>
                <div className="pt-6 border-t border-slate-50">
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                    Learn More <ChevronRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Video / Showcase Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.1)_0,transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-8 border-l-2 border-indigo-500 pl-4">Institutional Growth</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-10 font-outfit tracking-tight leading-[1.1]">
                Revolutionizing <br /> Higher Education <br /> Partnerships.
              </h3>
              <div className="space-y-8">
                {[
                  { title: "Increase Endowments", desc: "Leverage stronger alumni bonds to drive institutional support and development goals." },
                  { title: "Boost Employability", desc: "Bridge your curriculum with industry requirements through real-time feedback loops from graduates." },
                  { title: "Global Accreditation", desc: "Enhance your global status by showcasing a high-performing international alumni network." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
                      <Zap className="text-indigo-400 group-hover:text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white mb-2 font-outfit">{item.title}</h4>
                      <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-video rounded-[3rem] overflow-hidden bg-slate-900 border border-white/10 shadow-3xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/50 cursor-pointer hover:scale-110 transition-transform">
                  <Sparkles size={32} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Live Platform Preview</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden bg-slate-900 border border-white/5 shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.2)_0,transparent_70%)]" />
            <div className="relative z-10">
              <Sparkles className="text-indigo-500 mx-auto mb-10 w-16 h-16" />
              <h2 className="text-4xl md:text-7xl font-black text-white mb-12 font-outfit leading-tight tracking-tight uppercase">
                Ready for the <br /> <span className="text-indigo-400">Next Frontier?</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <Link
                  to="/register-institute"
                  className="w-full sm:w-auto px-16 py-6 bg-white text-slate-950 font-black text-xl rounded-[2rem] hover:bg-slate-100 transition-all hover:-translate-y-2 uppercase tracking-widest shadow-2xl"
                >
                  Join Global Network
                </Link>
              </div>
              <p className="mt-12 text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Trusted by 500+ Top Tier Universities</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sleek Footer */}
      <footer className="bg-white pt-32 pb-16 border-t border-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-20 mb-32">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black text-slate-950 font-outfit tracking-tighter uppercase">Alum<span className="text-indigo-600">Net</span></span>
              </div>
              <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md italic">
                "Architecting the infrastructure for the next generation of professional communities."
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-950 mb-10 uppercase tracking-[0.4em]">Ecosystem</h4>
              <ul className="space-y-6 text-slate-400 font-bold text-sm tracking-tight uppercase">
                <li><Link to="/alumni-directory" className="hover:text-indigo-600 transition-colors">Directory</Link></li>
                <li><Link to="/jobs" className="hover:text-indigo-600 transition-colors">Job Portal</Link></li>
                <li><Link to="/events" className="hover:text-indigo-600 transition-colors">Innovate Hub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-950 mb-10 uppercase tracking-[0.4em]">Enterprise</h4>
              <ul className="space-y-6 text-slate-400 font-bold text-sm tracking-tight uppercase">
                <li><button className="hover:text-indigo-600 transition-colors outline-none border-none bg-transparent">Security</button></li>
                <li><button className="hover:text-indigo-600 transition-colors outline-none border-none bg-transparent">Compliance</button></li>
                <li><button className="hover:text-indigo-600 transition-colors outline-none border-none bg-transparent">Contact Sale</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
              &copy; 2026 AlumNet Global. All Rights Reserved.
            </p>
            <div className="flex gap-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-indigo-600 cursor-pointer">Privacy</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-indigo-600 cursor-pointer">Terms</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-indigo-600 cursor-pointer">Security</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
