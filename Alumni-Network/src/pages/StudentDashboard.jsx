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
  Users,
  Mail,
  Globe,
  ExternalLink
} from "lucide-react";

const StudentDashboard = () => {
  const { user, jobs, events, posts, fetchFeed, students, fetchInstituteStudents, institute, fetchInstitute } = useContext(AppContext);

  useEffect(() => {
    fetchFeed();
    fetchInstituteStudents();
    fetchInstitute();
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
        <div className="absolute inset-0 bg-[#0f172a] z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] -ml-20 -mb-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-indigo-900/50 via-transparent to-transparent opacity-50" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="max-w-2xl py-12 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                <Sparkles size={14} /> Welcome Back
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-outfit tracking-tight">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{user?.full_name?.split(" ")[0] || "Scholar"}</span>!
              </h1>
              <p className="text-indigo-100/80 text-lg md:text-xl font-medium leading-relaxed mb-8">
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
              <div className="glass-card p-10 border border-white/20 bg-white/[0.07] backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap size={120} className="text-white" />
                </div>
                 <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-10">
                    <h3 className="text-2xl font-black text-white font-outfit leading-tight mb-2">
                      {institute?.name || user?.instituteId?.name || "Premium University"}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-10">
                    {institute?.email && (
                      <div className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.12] border border-white/30 truncate flex items-center justify-center text-indigo-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-300">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest leading-none mb-1">Student Email</p>
                          <p className="text-sm font-bold text-white tracking-tight">{institute.email}</p>
                        </div>
                      </div>
                    )}
                    {institute?.website && (
                      <div className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.12] border border-white/30 truncate flex items-center justify-center text-indigo-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-300">
                          <Globe size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest leading-none mb-1">Institute Website</p>
                          <a 
                            href={institute.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
                          >
                            Visit Portal <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Batch</p>
                      <p className="text-sm font-black text-white font-outfit">Class of {user?.passoutYear || "2024"}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                      <Sparkles size={20} />
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
            { label: "Community", value: students.length, icon: Users, color: "from-purple-500 to-pink-600", shadow: "shadow-purple-500/20" },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className={`p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-6 group hover:translate-y-[-4px] transition-all duration-300 ${stat.shadow}`}>
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon size={26} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{stat.label}</p>
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
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
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
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Alumnus</p>
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
            {/* Alumni Network Section */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">Network</h2>
                  <h3 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">Institute Members</h3>
                </div>
                <Link to="/directory" className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Directory <ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {students.slice(0, 4).map((member, i) => (
                  <motion.div 
                    key={member.id || i}
                    className="p-6 bg-white rounded-[2rem] shadow-lg border border-slate-50 text-center group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-4 group-hover:rotate-6 transition-transform shadow-lg">
                      {member.full_name?.charAt(0)}
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm mb-1 truncate">{member.full_name}</h5>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{member.branch}</p>
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
                      <p className="text-[11px] font-medium text-slate-500 truncate mt-1">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;