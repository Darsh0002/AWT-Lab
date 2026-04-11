import React, { useState, useMemo, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Zap, 
  ChevronRight, 
  Plus, 
  Building2, 
  CheckCircle2,
  X,
  DollarSign,
  User as UserIcon
} from "lucide-react";

// =================================================================================================
// --- REUSABLE UI COMPONENTS ---
// =================================================================================================
const JobCard = ({ job, isBestMatch = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`premium-card group relative ${isBestMatch ? "border-indigo-500 ring-4 ring-indigo-500/10" : ""}`}
  >
    {isBestMatch && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-xl shadow-indigo-100 uppercase z-10">
        AI Recommended
      </div>
    )}
    
    <div className="p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden">
          <img
            src={job.companyLogo || `https://placehold.co/100x100/4F46E5/FFFFFF?text=${job.company?.substring(0, 2).toUpperCase() || "JB"}`}
            alt={`${job.company} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg mb-2 ${
            job.type === "Full-time" ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
          }`}>
            {job.type || "Full-time"}
          </span>
          <h3 className="text-xl font-bold text-slate-900 truncate font-outfit">{job.title}</h3>
          <p className="text-sm font-semibold text-slate-500 truncate">{job.company}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
        {job.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-slate-50">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
          <MapPin className="w-3.5 h-3.5" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          {new Date(job.createdAt || Date.now()).toLocaleDateString()}
        </div>
        {job.salary && (
          <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600">
            <DollarSign className="w-3.5 h-3.5" />
            {job.salary}
          </div>
        )}
        {job.posterName && (
          <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600">
            <UserIcon className="w-3.5 h-3.5" />
            Posted by {job.posterName}
          </div>
        )}
      </div>

      <a 
        href={job.applyLink || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn-premium btn-primary w-full text-sm group"
      >
        Apply Now
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </motion.div>
);

const PostJobModal = ({ setShowModal }) => {
  const { createJob } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description: "",
    salary: "",
    applyLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate required fields
    if (!jobDetails.title || !jobDetails.company || !jobDetails.description) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const res = await createJob(jobDetails);
    
    if (res.success) {
      toast.success("Job posted successfully!");
      setShowModal(false);
    } else {
      toast.error(res.error || "Failed to post job.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={() => setShowModal(false)} 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">Post New Opportunity</h2>
              <p className="text-slate-500 font-medium">Connect talent with the right career path.</p>
            </div>
            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 ml-1">Job Title</label>
                <input type="text" name="title" value={jobDetails.title} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium" placeholder="e.g. Senior Product Designer" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 ml-1">Company Name</label>
                <input type="text" name="company" value={jobDetails.company} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium" placeholder="e.g. Google" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 ml-1">Location</label>
                <select name="location" value={jobDetails.location} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium">
                  <option>Remote</option>
                  <option>New York, NY</option>
                  <option>San Francisco, CA</option>
                  <option>Austin, TX</option>
                  <option>London, UK</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 ml-1">Job Type</label>
                <select name="type" value={jobDetails.type} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium">
                  <option>Full-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                  <option>Part-time</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 ml-1">Salary Range</label>
                <input type="text" name="salary" value={jobDetails.salary} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium" placeholder="e.g. $80k - $120k" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 ml-1">Application URL</label>
                <input type="url" name="applyLink" value={jobDetails.applyLink} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium" placeholder="https://..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">Job Description</label>
              <textarea name="description" value={jobDetails.description} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium" placeholder="Describe the role and requirements..." />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full btn-premium btn-primary py-4 text-lg mt-4 flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Opening"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// =================================================================================================
// --- MAIN COMPONENT ---
// =================================================================================================
export default function Jobs() {
  const { jobs, fetchFeed } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "All Locations",
    type: "All Types",
    department: "All Departments",
  });
  const [userProfile, setUserProfile] = useState({ skills: "", title: "", location: "" });
  const [isMatching, setIsMatching] = useState(false);
  const [bestJobMatch, setBestJobMatch] = useState(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFindJobMatch = (e) => {
    e.preventDefault();
    if (!userProfile.skills && !userProfile.title) {
      toast.error("Please provide some skills or a job title.");
      return;
    }
    setIsMatching(true);
    setBestJobMatch(null);

    setTimeout(() => {
      let topJob = null;
      let maxScore = -1;
      const profileSkills = userProfile.skills.toLowerCase().split(",").map(s => s.trim()).filter(Boolean);
      const profileTitle = userProfile.title.toLowerCase();

      jobs.forEach((job) => {
        let score = 0;
        const jobText = `${job.title} ${job.description}`.toLowerCase();
        profileSkills.forEach(skill => { if (jobText.includes(skill)) score += 15; });
        if (job.title.toLowerCase().includes(profileTitle)) score += 20;
        const profileLoc = userProfile.location.toLowerCase();
        if (profileLoc && job.location.toLowerCase().includes(profileLoc)) score += 10;
        if (profileLoc === "remote" && job.location.toLowerCase() === "remote") score += 15;

        if (score > maxScore) { maxScore = score; topJob = job; }
      });

      setBestJobMatch(topJob);
      setIsMatching(false);
      if (topJob) toast.success("We found a great match for you!");
      else toast.error("No direct matches found, try broadening your profile.");
    }, 2000);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = searchTerm.toLowerCase() === "" || job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = filters.location === "All Locations" || job.location === filters.location;
      const matchesType = filters.type === "All Types" || job.type === filters.type;
      const matchesDepartment = filters.department === "All Departments" || job.department === filters.department;
      return matchesSearch && matchesLocation && matchesType && matchesDepartment;
    });
  }, [searchTerm, filters, jobs]);

  const uniqueValues = (key) => [
    "All " + key.charAt(0).toUpperCase() + key.slice(1) + "s",
    ...new Set(jobs.map(j => j[key])),
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-inter">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,#4f46e5_0%,transparent_50%)]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Career Opportunities</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-outfit tracking-tighter">
            Alumni <span className="text-indigo-400">Job Board</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed italic mb-10">
            Discover exclusive roles posted by your fellow graduates. Leverage the power of your network.
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto group"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
            Post an Opening
          </button>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* AI Matcher Section */}
        <section className="-mt-12 mb-16 relative z-30">
          <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                  <Zap className="w-6 h-6 text-amber-300 fill-amber-300" />
                </div>
                <h2 className="text-3xl font-black font-outfit tracking-tight">AI Talent Matcher</h2>
              </div>
              <p className="text-indigo-100 font-medium mb-10 text-center md:text-left">
                Let our intelligent system scan your profile against hundreds of openings to find the perfect professional fit.
              </p>

              <AnimatePresence mode="wait">
                {bestJobMatch ? (
                  <motion.div key="match" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                    <div className="w-full max-w-md">
                      <JobCard job={bestJobMatch} isBestMatch={true} />
                    </div>
                    <button
                      onClick={() => { setBestJobMatch(null); setUserProfile({ skills: "", title: "", location: "" }); }}
                      className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold border border-white/20 transition-all"
                    >
                      Try Another Profile
                    </button>
                  </motion.div>
                ) : isMatching ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6" />
                    <p className="text-xl font-bold animate-pulse">Analyzing opportunities...</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleFindJobMatch} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-200 ml-1">Your Expertise</label>
                        <input type="text" name="skills" value={userProfile.skills} onChange={handleProfileChange} placeholder="e.g. React, UX Design, SQL" className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl focus:ring-4 focus:ring-white/5 outline-none transition-all placeholder:text-indigo-300/50 font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-200 ml-1">Desired Role</label>
                        <input type="text" name="title" value={userProfile.title} onChange={handleProfileChange} placeholder="e.g. Product Manager" className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl focus:ring-4 focus:ring-white/5 outline-none transition-all placeholder:text-indigo-300/50 font-medium" />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-5 bg-white text-indigo-600 font-black text-lg rounded-2xl shadow-xl hover:bg-slate-50 transition-all active:scale-[0.98]">
                      Run Intelligence Match
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="glass-card mb-12 p-3 rounded-[2rem] overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex-[2] relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600" />
              <input type="text" placeholder="Search by title or company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-white/50 border border-transparent rounded-2xl focus:bg-white outline-none transition-all font-semibold" />
            </div>
            <div className="flex-1 flex gap-2">
              <select name="location" onChange={handleFilterChange} className="w-full px-4 py-4 bg-white/50 border border-transparent rounded-2xl outline-none font-bold text-slate-600 text-sm appearance-none cursor-pointer hover:bg-white transition-all">
                {uniqueValues("location").map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <select name="type" onChange={handleFilterChange} className="w-full px-4 py-4 bg-white/50 border border-transparent rounded-2xl outline-none font-bold text-slate-600 text-sm appearance-none cursor-pointer hover:bg-white transition-all">
                {uniqueValues("type").map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <main className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-32 text-center bg-white rounded-[2.5rem] border border-slate-100">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 font-outfit">No opportunities found</h3>
                  <p className="text-slate-500 font-medium">Try matching with different terms or categories.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showModal && <PostJobModal setShowModal={setShowModal} setJobs={() => fetchFeed()} />}
      </AnimatePresence>
    </div>
  );
}
