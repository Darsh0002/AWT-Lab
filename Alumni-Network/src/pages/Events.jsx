import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Filter,
  X,
  Target,
  Trophy,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["Professional", "Social", "Educational", "Networking"];

const Events = () => {
  const { events, fetchFeed } = useContext(AppContext);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Professional",
    expectedAttendees: "",
  });

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    toast.success("Event proposal submitted successfully! Wait for Admin Approval.");
    setShowProposalForm(false);
    setProposalForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "Professional",
      expectedAttendees: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const featuredEvents = events.slice(0, 2);
  const upcomingEvents = events.slice(2);

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
      <section className="relative pt-32 pb-48 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -ml-20 -mb-20" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
              <Sparkles size={14} className="animate-pulse" /> Community Gatherings
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 font-outfit tracking-tight">
              Reconnect & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Collaborate.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
              Your central hub for global alumni meets, industry panels, and professional workshops.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { label: "Planned Events", value: "10+", icon: Target },
                { label: "Active Alumni", value: "500+", icon: Users },
                { label: "Global Presence", value: "12+", icon: Globe },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <stat.icon size={24} className="text-indigo-400" />
                  <div className="text-left">
                    <p className="text-white font-black text-xl leading-none font-outfit">{stat.value}</p>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-24 relative z-20">
        {/* Featured Section */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-4xl font-black text-slate-900 font-outfit tracking-tight uppercase">Featured Events</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500"
                >
                  <div className="h-64 bg-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 to-slate-950 opacity-90 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <Trophy size={160} className="text-white" />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-2">
                        <Calendar size={12} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h4 className="text-3xl font-black text-white font-outfit tracking-tight uppercase leading-none">{event.title}</h4>
                    </div>
                  </div>
                  <div className="p-10">
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 line-clamp-2 italic">"{event.description}"</p>
                    <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Location</p>
                          <p className="text-xs font-bold truncate">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400">
                          <Users size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Host</p>
                          <p className="text-xs font-bold truncate">{event.organizer || "Alumni Office"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200 italic text-slate-400 font-medium">
                No events found.
              </div>
            )}
          </div>
        </div>

        {/* Organize Section */}
        <section className="relative p-12 md:p-24 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] text-center overflow-hidden shadow-2xl shadow-indigo-100">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Plus size={200} className="text-white" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 font-outfit uppercase tracking-tight">Host Your Own Event?</h2>
            <p className="text-indigo-100/70 text-lg font-medium leading-relaxed mb-12 italic">
              "Lead the conversation. Organize a regional chapter meetup, industry roundtable, or social mixer with our full resource support."
            </p>
            <button 
              onClick={() => setShowProposalForm(true)}
              className="px-12 py-5 bg-white text-indigo-600 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all hover:translate-y-[-2px] shadow-2xl shadow-indigo-950/20"
            >
              Submit Proposal
            </button>
          </div>
        </section>
      </div>

      {/* Modern Modal */}
      <AnimatePresence>
        {showProposalForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProposalForm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tight leading-none">Event Proposal</h3>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2">Connect your community</p>
                  </div>
                  <button onClick={() => setShowProposalForm(false)} className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleProposalSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Event Title</label>
                    <input 
                      name="title" 
                      value={proposalForm.title} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold placeholder:text-slate-300 transition-all" 
                      placeholder="e.g. AI Ethics Symposium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Vision & Description</label>
                    <textarea 
                      name="description" 
                      value={proposalForm.description} 
                      onChange={handleInputChange} 
                      required 
                      rows={3} 
                      className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold placeholder:text-slate-300 transition-all resize-none" 
                      placeholder="What is the objective of this event?"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Date</label>
                      <input name="date" type="date" value={proposalForm.date} onChange={handleInputChange} required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Category</label>
                      <select name="category" value={proposalForm.category} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold text-sm appearance-none">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Location / Virtual Link</label>
                    <input name="location" value={proposalForm.location} onChange={handleInputChange} required className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold text-sm" placeholder="Global HQ / Zoom Link" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4">
                    Send Proposal to Admin
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
