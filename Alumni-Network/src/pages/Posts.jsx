import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  Award,
  Users,
  Image as ImageIcon,
  FileText,
  Calendar,
  X,
  Send,
  Sparkles,
  MapPin,
  Clock
} from "lucide-react";

// Premium Profile Card
const ProfileCard = ({ user }) => (
  <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden group">
    <div className="h-28 bg-gradient-to-br from-indigo-500 to-indigo-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>
    </div>
    <div className="p-8 pt-0 text-center relative">
      <div className="w-24 h-24 rounded-[2rem] bg-indigo-50 border-4 border-white mx-auto -mt-12 flex items-center justify-center text-indigo-600 shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
        {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <Users size={32} />}
      </div>
      <h3 className="text-xl font-black mt-4 text-slate-900 font-outfit uppercase tracking-tight">{user?.full_name || "Community Member"}</h3>
      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1 mb-6">{user?.role || "Scholar"}</p>
      
      <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Network</p>
          <p className="text-lg font-black text-slate-900 font-outfit">1.2k</p>
        </div>
        <div>
          <p className="text-[10px) font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Rank</p>
          <p className="text-lg font-black text-slate-900 font-outfit">Top 5%</p>
        </div>
      </div>
    </div>
  </div>
);

// Post Card Component
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || Math.floor(Math.random() * 50));

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 p-8 mb-8 group hover:shadow-2xl transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-black text-xs uppercase group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-500">
            {post.author?.name?.charAt(0) || "A"}
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 font-outfit tracking-tight leading-none uppercase">{post.author?.name || "Anonymous Member"}</h4>
            <div className="flex items-center gap-2 mt-1.5 font-bold text-slate-400 text-[10px] tracking-widest uppercase">
              <span>Alumnus</span>
              <span className="w-1 h-1 rounded-full bg-slate-200" />
              <span>{new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
        <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic">
        "{post.content}"
      </p>

      {post.image && (
        <div className="mb-8 rounded-[2rem] overflow-hidden border border-slate-100 shadow-md">
          <img src={post.image} className="w-full h-auto" />
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${liked ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
            {likeCount}
          </button>
          <button className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-all font-black text-[10px] uppercase tracking-widest">
            <MessageSquare size={16} />
            {post.comments || 0}
          </button>
        </div>
        <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
          <Share2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

// Main Feed Management
export default function Posts() {
  const { posts, user, fetchFeed } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    // Mock successful post creation
    setPostContent("");
    setShowModal(false);
    fetchFeed();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-24 font-inter">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Static Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block space-y-8">
            <div className="sticky top-28">
              <ProfileCard user={user} />
              
              <div className="mt-8 p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 font-outfit uppercase tracking-tight">Trending</h4>
                </div>
                <div className="space-y-5">
                  {[
                    { tag: "#CareerMilestones", growth: "+12%" },
                    { tag: "#ResumeAudit", growth: "+8%" },
                    { tag: "#GlobalMeetup", growth: "+21%" },
                  ].map((topic, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-pointer">
                      <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{topic.tag}</span>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">{topic.growth}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Social Feed */}
          <main className="lg:col-span-2 space-y-10">
            {/* Create Post Action */}
            <div 
              onClick={() => setShowModal(true)}
              className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center gap-6 group cursor-pointer hover:border-indigo-100 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-105">
                <Plus size={24} />
              </div>
              <span className="text-slate-400 font-bold text-lg uppercase tracking-tight flex-grow">Start a conversation...</span>
              <div className="flex gap-2">
                <div className="p-3 rounded-xl hover:bg-slate-50 text-indigo-400"><ImageIcon size={20} /></div>
                <div className="p-3 rounded-xl hover:bg-slate-50 text-indigo-400"><Calendar size={20} /></div>
              </div>
            </div>

            {/* Content Feed */}
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post._id || post.id} post={post} />
              ))
            ) : (
              <div className="bg-white rounded-[2rem] p-24 text-center border-2 border-dashed border-slate-100">
                <Sparkles size={64} className="text-slate-100 mx-auto mb-8" />
                <p className="text-slate-400 text-lg italic font-medium">The community feed is waiting for your story.</p>
              </div>
            )}
          </main>

          {/* Activity Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block space-y-8">
            <div className="sticky top-28">
              <div className="p-8 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Award size={120} />
                </div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-black mb-4 font-outfit uppercase tracking-tight leading-none">Ambassador Spotlight</h4>
                  <p className="text-indigo-200/60 text-xs font-medium leading-relaxed mb-8 mb-8 italic">"Mentoring graduates was the most rewarding phase of my career."</p>
                  <button className="w-full py-4 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                    Nominate Member
                  </button>
                </div>
              </div>

              <div className="mt-8 p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Network Reach</h4>
                <div className="space-y-6">
                  {[
                    { label: "India", count: 840, color: "bg-indigo-500" },
                    { label: "USA", count: 210, color: "bg-blue-500" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2 text-slate-500">
                        <span>{stat.label}</span>
                        <span>{stat.count} Members</span>
                      </div>
                      <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: i === 0 ? '80%' : '30%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Creation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Send size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tight leading-none">Global Feed</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Visible to all alumni</p>
                    </div>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-500 transition-all">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-8">
                  <textarea 
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    required
                    placeholder="Share your professional milestone, career advice, or campus memories..."
                    className="w-full h-48 border-none focus:ring-0 text-xl font-medium placeholder:text-slate-300 resize-none italic"
                  />
                  
                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <div className="flex gap-4 text-slate-400">
                      <button type="button" className="p-4 rounded-2xl hover:bg-slate-50 hover:text-indigo-600 transition-all"><ImageIcon size={24} /></button>
                      <button type="button" className="p-4 rounded-2xl hover:bg-slate-50 hover:text-indigo-600 transition-all"><FileText size={24} /></button>
                      <button type="button" className="p-4 rounded-2xl hover:bg-slate-50 hover:text-indigo-600 transition-all"><Calendar size={24} /></button>
                    </div>
                    <button 
                      type="submit"
                      disabled={!postContent.trim()}
                      className="px-12 py-5 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-600 disabled:opacity-20 disabled:hover:bg-slate-950 transition-all shadow-xl shadow-slate-200"
                    >
                      Post Community Update
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
