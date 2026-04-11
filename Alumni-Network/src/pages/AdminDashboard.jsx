import React, { useState, useMemo, useRef, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Briefcase,
  Bell,
  Search,
  Upload,
  Download,
  Plus,
  Eye,
  LogOut,
  ChevronRight,
  TrendingUp,
  MapPin,
  GraduationCap,
  Building2,
  PieChart as PieChartIcon,
  ChevronLeft,
  X,
  CheckCircle2,
  FileSpreadsheet,
  Linkedin,
  Phone,
  Mail,
  ExternalLink,
  Clock,
  Globe,
} from "lucide-react";
import {
  Pie,
  PieChart,
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

const ITEMS_PER_PAGE = 10;

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("analytics");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const { events: contextEvents, jobs, fetchFeed } = useContext(AppContext);
  const [studentData, setStudentData] = useState([]);
  const [loadingAlumni, setLoadingAlumni] = useState(true);

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const [departmentData, setDepartmentData] = useState([]);
  const [graduationTrends, setGraduationTrends] = useState([]);

  useEffect(() => {
    fetchFeed();
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const students = response.data.students || [];
      setStudentData(students);

      // Compute analytics
      const branchCount = {};
      const batchCount = {};
      const companyCount = {};

      students.forEach((student) => {
        if (student.branch)
          branchCount[student.branch] = (branchCount[student.branch] || 0) + 1;
        if (student.passoutYear)
          batchCount[student.passoutYear] =
            (batchCount[student.passoutYear] || 0) + 1;
        if (student.company)
          companyCount[student.company] =
            (companyCount[student.company] || 0) + 1;
      });

      setDepartmentData(
        Object.keys(branchCount).map((name) => ({
          name,
          value: branchCount[name],
        })),
      );
      setGraduationTrends(
        Object.keys(batchCount)
          .sort()
          .map((year) => ({ year, alumni: batchCount[year] })),
      );
    } catch (error) {
      console.error("Error fetching alumni:", error);
      toast.error("Failed to load alumni data");
    } finally {
      setLoadingAlumni(false);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(
        "http://localhost:5000/api/admin/upload-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      toast.success("Excel file uploaded successfully!");
      setFile(null);
      fetchStudents();
    } catch (error) {
      toast.error("Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("alumnet-user");
      window.location.href = "/login";
    }
  };

  const { createEvent } = useContext(AppContext);

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const result = await createEvent(eventForm);
    if (result.success) {
      toast.success("Event created successfully!");
      setShowEventModal(false);
      setEventForm({
        title: "",
        description: "",
        date: "",
        location: "",
        organizer: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const navItems = [
    { id: "analytics", label: "Analytics", icon: LayoutDashboard },
    { id: "Directory", label: "Directory", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
  ];

  const pieColors = [
    "hsl(239, 84%, 67%)",
    "hsl(142, 72%, 45%)",
    "hsl(32, 95%, 60%)",
    "hsl(280, 75%, 60%)",
    "hsl(190, 80%, 50%)",
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "analytics":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Alumni",
                  value: studentData.length,
                  icon: Users,
                  color: "bg-indigo-50 border-indigo-100 text-indigo-600",
                },
                {
                  label: "Upcoming Events",
                  value: contextEvents.length,
                  icon: Calendar,
                  color: "bg-amber-50 border-amber-100 text-amber-600",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-[2rem] border bg-white shadow-sm flex items-center gap-4 group hover:shadow-lg transition-all duration-500`}
                >
                  <div
                    className={`p-4 rounded-2xl ${stat.color.split(" ")[0]} ${stat.color.split(" ")[2]} transition-transform duration-500 group-hover:scale-110`}
                  >
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-black text-slate-900 font-outfit">
                      {stat.value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="premium-card p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <PieChartIcon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-outfit">
                    Department Distribution
                  </h3>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                      >
                        {departmentData.map((_, i) => (
                          <Cell
                            key={i}
                            fill={pieColors[i % pieColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "1rem",
                          border: "none",
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="premium-card p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-outfit">
                    Graduation Trends
                  </h3>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={graduationTrends}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip
                        cursor={{ fill: "#f8fafc" }}
                        contentStyle={{
                          borderRadius: "1rem",
                          border: "none",
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar
                        dataKey="alumni"
                        fill="hsl(239, 84%, 67%)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "Directory":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex-1 w-full relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search alumni by name, email or branch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-slate-900 shadow-sm"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex-1 md:flex-none px-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Upload size={18} /> Import Excel
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept=".xlsx,.xls"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file && (
                  <button
                    onClick={uploadFile}
                    disabled={isUploading}
                    className="px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
                  >
                    {isUploading ? "Uploading..." : "Confirm Upload"}
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-hidden glass-card rounded-[2.5rem] border border-white/40 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-indigo-600/5 border-b border-indigo-50">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                        Alumnus
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                        Branch
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                        Graduation
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {studentData
                      .filter((m) =>
                        m.full_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                      )
                      .map((member, i) => (
                        <tr
                          key={i}
                          className="group hover:bg-indigo-50/30 transition-all duration-300"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg group-hover:rotate-6 transition-transform">
                                {member.full_name?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 font-outfit">
                                  {member.full_name}
                                </p>
                                <p className="text-xs font-medium text-slate-400">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-indigo-100">
                              {member.branch}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                              <GraduationCap
                                size={16}
                                className="text-slate-300"
                              />
                              {member.passoutYear}
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button
                              onClick={() => {
                                setSelectedStudent(member);
                                setShowStudentModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      case "events":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex-1 w-full relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search events by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-slate-900 shadow-sm"
                />
              </div>
              <button
                onClick={() => setShowEventModal(true)}
                className="px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
              >
                <Plus size={18} /> Create Event
              </button>
            </div>

            <div className="overflow-hidden glass-card rounded-[2.5rem] border border-white/40 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-indigo-600/5 border-b border-indigo-50">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                        Event Details
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                        Date
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                        Location
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                        Organizer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {contextEvents
                      .filter(
                        (e) =>
                          e.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          e.location
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                      )
                      .map((event, i) => (
                        <tr
                          key={i}
                          className="group hover:bg-indigo-50/30 transition-all duration-300"
                        >
                          <td className="px-8 py-5">
                            <div>
                              <p className="font-bold text-slate-900 font-outfit uppercase tracking-tight">
                                {event.title}
                              </p>
                              <p className="text-xs font-medium text-slate-400 line-clamp-1 italic">
                                {event.description}
                              </p>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                              <Calendar size={16} className="text-slate-300" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                              <MapPin size={16} className="text-slate-300" />
                              {event.location}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                              {event.organizer || "Institute"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="py-20 text-center text-slate-400 italic font-medium">
            Coming soon...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-inter overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="fixed lg:relative z-[100] h-screen bg-slate-900 text-slate-400 p-4 flex flex-col transition-all duration-500 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 mb-12">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-indigo-900/40">
            <GraduationCap className="text-white" size={24} />
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xl font-black text-white font-outfit tracking-tighter uppercase whitespace-nowrap"
              >
                Alum<span className="text-indigo-400">Net</span> Admin
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === item.id
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-900/20"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                className={
                  activeSection === item.id
                    ? "text-white"
                    : "text-slate-500 group-hover:text-indigo-400 transition-colors"
                }
              />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-bold text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-8 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all font-bold group"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm">Log Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-slate-50/50 backdrop-blur-3xl scroll-smooth">
        <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-xl border-b border-slate-100 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <ChevronLeft
                size={20}
                className={!isSidebarOpen ? "rotate-180" : ""}
              />
            </button>
            <h2 className="text-xl font-black text-slate-800 font-outfit tracking-tight capitalize">
              {activeSection}
            </h2>
          </div>
        </header>

        <div className="p-8 pb-32">{renderSection()}</div>

        {/* Student Details Modal */}
        <AnimatePresence>
          {showStudentModal && selectedStudent && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowStudentModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-200"
              >
                {/* Formal Header */}
                <div className="bg-slate-900 px-10 py-8 flex items-center justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                  <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold font-outfit shadow-lg shadow-indigo-900/20">
                      {selectedStudent.full_name?.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white font-outfit">
                        {selectedStudent.full_name}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowStudentModal(false)}
                    className="p-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-xl transition-all border border-white/10 z-10"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 bg-white">
                  {/* Personal & Contact Section */}
                  <div className="p-8 space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        Personal Details
                      </h3>
                      <div className="space-y-5">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                            <Mail size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Email Address
                            </p>
                            <p className="text-sm font-semibold text-slate-800 break-all">
                              {selectedStudent.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                            <Phone size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Mobile Number
                            </p>
                            <p className="text-sm font-semibold text-slate-800">
                              {selectedStudent.phone || "Not Updated"}
                            </p>
                          </div>
                        </div>
                        {selectedStudent.linkedinuri && (
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                              <Linkedin size={16} />
                            </div>
                            <div className="w-full">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Professional Link
                              </p>
                              <a
                                href={selectedStudent.linkedinuri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-indigo-600 hover:underline flex items-center gap-1.5 mt-0.5"
                              >
                                LinkedIn Profile <ExternalLink size={12} />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Academic Information Section */}
                  <div className="p-8 bg-slate-50/30 space-y-6 lg:col-span-1">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                      Academic Record
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Enrollment No.
                            </p>
                            <p className="text-sm font-semibold text-slate-800 mt-1">
                              {selectedStudent.enrollment_no}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Passout Year
                            </p>
                            <p className="text-sm font-semibold text-slate-800 mt-1">
                              {selectedStudent.passoutYear}
                            </p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-50">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Degree / Course
                          </p>
                          <p className="text-sm font-semibold text-slate-800 mt-1">
                            {selectedStudent.course || "B.Tech Engineering"}
                          </p>
                        </div>
                        <div className="pt-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Department / Branch
                          </p>
                          <p className="text-sm font-semibold text-slate-800 mt-1">
                            {selectedStudent.branch}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Background Section */}
                  <div className="p-8 space-y-6 lg:col-span-1">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                      Professional Information
                    </h3>
                    <div className="space-y-4">
                      <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <Briefcase size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Current Designation
                            </p>
                            <p className="text-base font-bold text-slate-800 leading-tight mt-1">
                              {selectedStudent.job || "Industry Professional"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <Building2 size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Organization / Company
                            </p>
                            <p className="text-base font-bold text-slate-800 leading-tight mt-1">
                              {selectedStudent.company || "Not Disclosed"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Base Location
                            </p>
                            <p className="text-base font-bold text-slate-800 leading-tight mt-1">
                              {selectedStudent.location || "On-Site / Remote"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          {/* Event Creation Modal */}
          {showEventModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowEventModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200"
              >
                <div className="bg-slate-900 px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-xl text-white">
                      <Calendar size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white font-outfit uppercase tracking-tight">
                      Create New Event
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="p-2 text-slate-400 hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleEventSubmit} className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                      Event Title
                    </label>
                    <input
                      name="title"
                      value={eventForm.title}
                      onChange={handleEventInputChange}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-bold text-slate-900"
                      placeholder="e.g. Annual Alumni Meet 2024"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                      Vision & Description
                    </label>
                    <textarea
                      name="description"
                      value={eventForm.description}
                      onChange={handleEventInputChange}
                      required
                      rows={3}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-bold text-slate-900 resize-none"
                      placeholder="Tell us about the event objective..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                        Date
                      </label>
                      <input
                        name="date"
                        type="date"
                        value={eventForm.date}
                        onChange={handleEventInputChange}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-bold text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                        Organizer
                      </label>
                      <input
                        name="organizer"
                        value={eventForm.organizer}
                        onChange={handleEventInputChange}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-bold text-slate-900"
                        placeholder="e.g. Alumni Association"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                      Location / Virtual Link
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                        size={18}
                      />
                      <input
                        name="location"
                        value={eventForm.location}
                        onChange={handleEventInputChange}
                        required
                        className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-bold text-slate-900"
                        placeholder="Main Auditorium / Zoom Link"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:translate-y-[-2px] transition-all mt-4"
                  >
                    Publish Event
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
