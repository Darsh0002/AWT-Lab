import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, GraduationCap, Briefcase, Linkedin, MessageSquare, ChevronDown, X, Loader2, User } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Avatar = ({ name }) => {
  const initials = name
    ?.split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "??";
  const colors = [
    "from-indigo-600 to-violet-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-orange-500",
    "from-blue-600 to-indigo-600",
  ];
  const clr = colors[name?.length % colors.length || 0];
  return (
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${clr} flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-100/50 transform group-hover:rotate-6 transition-all duration-500`}>
      {initials}
    </div>
  );
};

const AlumniCard = ({ alumnus, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="premium-card group hover:border-indigo-500/50"
  >
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <Avatar name={alumnus.full_name} />
        <div className="text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-600 border border-indigo-100">
            Class of {alumnus.passoutYear}
          </span>
        </div>
      </div>

      <div className="space-y-1 mb-4">
        <h3 className="text-xl font-bold text-slate-900 font-outfit truncate">{alumnus.full_name}</h3>
        <p className="text-sm font-semibold text-indigo-600 truncate">{alumnus.job || "Alumnus"}</p>
        <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <Briefcase className="w-3 h-3" />
          {alumnus.company || "TBD"}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 py-4 border-y border-slate-50 mb-6">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
          {alumnus.branch || "General"}
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
          <User className="w-3.5 h-3.5 text-slate-400" />
          {alumnus.course || "Degree"}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => toast.success(`Request sent to ${alumnus.full_name}`)}
          className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Connect
        </button>
        {alumnus.linkedinuri && (
          <a 
            href={alumnus.linkedinuri} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/alumni", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlumni(response.data.alumni || []);
    } catch (error) {
      console.error("Error fetching alumni:", error);
      toast.error("Failed to load alumni directory");
    } finally {
      setLoading(false);
    }
  };

  // Extract filter options dynamically
  const graduationYears = [...new Set(alumni.map(a => a.passoutYear))].filter(Boolean).sort((a, b) => b - a);
  const companies = [...new Set(alumni.map(a => a.company))].filter(Boolean).sort();
  const branches = [...new Set(alumni.map(a => a.branch))].filter(Boolean).sort();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return alumni.filter((a) => {
      const matchYear = year ? a.passoutYear?.toString() === year : true;
      const matchCompany = company ? a.company === company : true;
      const matchBranch = branch ? a.branch === branch : true;
      const matchQuery = !q || [a.full_name, a.company, a.job, a.branch, a.course].some(s => s?.toLowerCase().includes(q));
      return matchYear && matchCompany && matchBranch && matchQuery;
    });
  }, [alumni, query, year, company, branch]);

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Header */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#4f46e5_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#818cf8_0%,transparent_50%)]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Institute Network</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-outfit tracking-tighter">
            Alumni <span className="text-indigo-400">Directory</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
            Connect with professionals from your institute. Find mentors, collaborators, and industry experts.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 mb-16 relative z-30">
        <div className="glass-card p-4 rounded-[2rem] shadow-2xl">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/50 border border-indigo-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-semibold text-slate-900 placeholder:text-slate-400"
                placeholder="Search name, company, position..."
              />
            </div>
            
            <button 
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className={`px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isFilterVisible ? "bg-indigo-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"}`}
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterVisible ? "rotate-180" : ""}`} />
            </button>
            
            {(year || company || branch) && (
              <button 
                onClick={() => { setYear(""); setCompany(""); setBranch(""); }}
                className="px-6 py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-all"
              >
                <X className="w-5 h-5" />
                Clear
              </button>
            )}
          </div>

          <AnimatePresence>
            {isFilterVisible && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4"
              >
                <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-indigo-50">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Graduation Year</label>
                    <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none">
                      <option value="">All Years</option>
                      {graduationYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company</label>
                    <select value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none">
                      <option value="">All Companies</option>
                      {companies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Branch</label>
                    <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none">
                      <option value="">All Branches</option>
                      {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-32 min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="text-slate-500 font-bold animate-pulse">Syncing with Institute Network...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((alumnus, idx) => (
                <AlumniCard key={alumnus._id || idx} index={idx} alumnus={alumnus} />
              ))}
            </div>

            {filtered.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-outfit">No Alumni Found</h3>
                <p className="text-slate-500 font-medium">Try adjusting your filters or search term.</p>
              </motion.div>
            )}
          </>
        )}
      </main>

      {/* Footer Stats */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Total Members", value: alumni.length },
              { label: "Graduating Years", value: graduationYears.length },
              { label: "Active Companies", value: companies.length },
              { label: "Network Growth", value: "+12%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-indigo-600 mb-2 font-outfit">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlumniDirectory;
