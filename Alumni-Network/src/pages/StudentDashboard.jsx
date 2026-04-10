import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MessageSquare,
  ArrowRight,
  GraduationCap,
  User,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  Search,
  Users
} from "lucide-react";

const StudentDashboard = () => {
  const { user, jobs, events, posts, fetchFeed } = useContext(AppContext);

  useEffect(() => {
    fetchFeed();
  }, []);

  const latestJobs = jobs.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-inter">
      {/* Premium Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -ml-20 -mb-20" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                <Sparkles size={14} /> Welcome Back
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-outfit tracking-tight">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{user?.full_name?.split(" ")[0] || "Scholar"}</span>! 👋
              </h1>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-8">
                Your network is thriving. Explore new job opportunities, upcoming alumni meets, and community discussions.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link to="/jobs" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-900/40 flex items-center gap-2 group">
                  Explore Jobs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/directory" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-md">
                  Find Alumni
                </Link>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md"
            >
              <div className="glass-card p-8 border border-white/10 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap size={120} className="text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-xl">
                      <User size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white font-outfit">{user?.full_name}</h4>
                      <p className="text-indigo-300 font-bold text-xs uppercase tracking-wider mt-0.5">{user?.role} Member</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {user?.instituteId?.name || "Premium University"}
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      Class of {user?.passoutYear || "2024"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { label: "Jobs", value: jobs.length, icon: Briefcase, color: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/20" },
            { label: "Events", value: events.length, icon: Calendar, color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
            { label: "Discussions", value: posts.length, icon: MessageSquare, color: "from-purple-500 to-pink-600", shadow: "shadow-purple-500/20" },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className={`p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-6 group hover:translate-y-[-4px] transition-all duration-300 ${stat.shadow}`}>
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon size={26} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">{stat.value}</h3>
                  <TrendingUp size={16} className="text-emerald-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Feed Section */}
          <div className="lg:col-span-2 space-y-10">
            {/* Jobs Section */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">Opportunities</h2>
                  <h3 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">Recent Job Postings</h3>
                </div>
                <Link to="/jobs" className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  View All Jobs <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-4">
                {latestJobs.map((job, i) => (
                  <motion.div 
                    key={job.id || i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="premium-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-2xl transition-all duration-300 border border-slate-100"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{job.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                          <span className="flex items-center gap-1.5"><MapPin size={12} className="text-indigo-400" /> {job.location}</span>
                          <span className="flex items-center gap-1.5"><Clock size={12} className="text-emerald-400" /> {job.type || "Full-time"}</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/jobs" className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-slate-200">
                      Apply Now <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Posts Section */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">Community</h2>
                  <h3 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">Latest Discussions</h3>
                </div>
                <Link to="/posts" className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Browse Feed <ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post, i) => (
                  <motion.div 
                    key={post.id || i}
                    className="p-8 bg-white rounded-[2.5rem] shadow-lg border border-slate-50 group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs">
                        {post.author?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm leading-none">{post.author?.name || "Community Member"}</h5>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Alumnus</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 italic">
                      "{post.content}"
                    </p>
                    <Link to="/posts" className="inline-flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest group/link">
                      Join Discussion <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-10">
            <section className="p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Calendar size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-outfit">Upcoming Events</h3>
              </div>
              <div className="space-y-6">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex gap-5 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-0.5">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-xl font-black leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                        {event.title}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-400 truncate mt-1">
                        <MapPin size={10} className="inline mr-1" /> {event.location}
                      </p>
                    </div>
                  </div>
                ))}
                {upcomingEvents.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-400 text-sm italic font-medium">No events scheduled yet.</p>
                  </div>
                )}
              </div>
              <Link to="/events" className="mt-10 w-full py-4 bg-slate-50 hover:bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2">
                Explore All Events <ArrowRight size={16} />
              </Link>
            </section>

            <section className="relative p-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] text-white overflow-hidden shadow-2xl shadow-indigo-200 group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4 font-outfit leading-tight tracking-tight uppercase">Mentorship Spotlight</h3>
                <p className="text-indigo-100/70 text-sm font-medium leading-relaxed mb-8">
                  Connect with industry veterans and accelerate your career path with our exclusive mentorship program.
                </p>
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-indigo-900/20">
                  Find a Mentor
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;