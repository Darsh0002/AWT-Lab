import React, { useState, useMemo } from "react";

// --- DUMMY DATA ---
// In a real application, this would come from an API
export const events = [
  {
    id: 1,
    name: "Alumni Reunion 2024",
    organizer: "Divya Kaurani",
    organizerType: "Alumni",
    status: "Active",
    date: "31/12/2024",
    time: "00:00",
  },
  {
    id: 2,
    name: "Meetup",
    organizer: "College Admin",
    organizerType: "College",
    status: "Active",
    date: "30/12/2024",
    time: "17:22",
  },
  {
    id: 3,
    name: "Hackathon Event",
    organizer: "College Admin",
    organizerType: "College",
    status: "Upcoming",
    date: "26/12/2024",
    time: "16:46",
  },
  {
    id: 4,
    name: "Generative AI Event",
    organizer: "College Admin",
    organizerType: "College",
    status: "Active",
    date: "22/12/2024",
    time: "12:00",
  },
  {
    id: 5,
    name: "How to Crack Faang",
    organizer: "Mayank Yadav",
    organizerType: "Alumni",
    status: "Active",
    date: "20/12/2024",
    time: "10:00",
  },
  {
    id: 6,
    name: "AR VR Webinar",
    organizer: "Khushi Sompura",
    organizerType: "Alumni",
    status: "Upcoming",
    date: "19/12/2024",
    time: "16:01",
  },
  {
    id: 7,
    name: "Industry Panel: Startups",
    organizer: "Alumni Cell",
    organizerType: "Alumni",
    status: "Active",
    date: "15/01/2025",
    time: "18:00",
  },
  {
    id: 8,
    name: "Alumni Networking Night",
    organizer: "Student Council",
    organizerType: "College",
    status: "Upcoming",
    date: "10/02/2025",
    time: "20:00",
  },
  {
    id: 9,
    name: "Data Science Workshop",
    organizer: "Ritu Sharma",
    organizerType: "Alumni",
    status: "Active",
    date: "05/03/2025",
    time: "09:30",
  },
  {
    id: 10,
    name: "Entrepreneurship Bootcamp",
    organizer: "Incubation Cell",
    organizerType: "College",
    status: "Active",
    date: "22/04/2025",
    time: "10:00",
  },
  {
    id: 11,
    name: "Alumni Mentorship Session",
    organizer: "Priya Patel",
    organizerType: "Alumni",
    status: "Active",
    date: "12/05/2025",
    time: "16:00",
  },
  {
    id: 12,
    name: "Campus Tour for Alumni",
    organizer: "Campus Team",
    organizerType: "College",
    status: "Upcoming",
    date: "01/06/2025",
    time: "11:00",
  },
];

export const alumni = [
  {
    id: 1,
    name: "Daksh Titarmare",
    email: "devdakshtit@gmail.com",
    degree: "B.Tech",
    department: "Computer Science",
    graduationYear: 2028,
    enrollmentNumber: "2213063",
  },
  {
    id: 2,
    name: "DS Mahato",
    email: "ds.mahato@email.com",
    degree: "M.Tech",
    department: "Electrical",
    graduationYear: 2024,
    enrollmentNumber: "2213011",
  },
  {
    id: 3,
    name: "New User",
    email: "new.user@email.com",
    degree: "B.Tech",
    department: "Computer Science",
    graduationYear: 2027,
    enrollmentNumber: "2213012",
  },
  {
    id: 4,
    name: "Nitesh Gupta",
    email: "nitesh.gupta@email.com",
    degree: "PhD",
    department: "Computer Science",
    graduationYear: 2027,
    enrollmentNumber: "2213013",
  },
  {
    id: 5,
    name: "Hit Lathiya",
    email: "hit.lathiya@email.com",
    degree: "MBA",
    department: "Business Administration",
    graduationYear: 2027,
    enrollmentNumber: "2213014",
  },
  {
    id: 6,
    name: "Anjali Verma",
    email: "anjali.verma@mail.com",
    degree: "B.Tech",
    department: "Electrical",
    graduationYear: 2023,
    enrollmentNumber: "2213001",
  },
  {
    id: 7,
    name: "Rohit Singh",
    email: "rohit.singh@mail.com",
    degree: "B.Tech",
    department: "Mechanical",
    graduationYear: 2022,
    enrollmentNumber: "2213002",
  },
  {
    id: 8,
    name: "Sonal Mehta",
    email: "sonal.mehta@mail.com",
    degree: "M.Tech",
    department: "Computer Science",
    graduationYear: 2021,
    enrollmentNumber: "2213003",
  },
  {
    id: 9,
    name: "Vikram Rao",
    email: "vikram.rao@mail.com",
    degree: "PhD",
    department: "Chemical",
    graduationYear: 2020,
    enrollmentNumber: "2213004",
  },
  {
    id: 10,
    name: "Pooja Desai",
    email: "pooja.desai@mail.com",
    degree: "MBA",
    department: "Finance",
    graduationYear: 2019,
    enrollmentNumber: "2213005",
  },
  {
    id: 11,
    name: "Amit Patel",
    email: "amit.patel@mail.com",
    degree: "B.Tech",
    department: "Computer Science",
    graduationYear: 2024,
    enrollmentNumber: "2213006",
  },
  {
    id: 12,
    name: "Meera Joshi",
    email: "meera.joshi@mail.com",
    degree: "M.Tech",
    department: "Electrical",
    graduationYear: 2025,
    enrollmentNumber: "2213007",
  },
  {
    id: 13,
    name: "Karan Malhotra",
    email: "karan.m@mail.com",
    degree: "B.Tech",
    department: "Civil",
    graduationYear: 2026,
    enrollmentNumber: "2213008",
  },
  {
    id: 14,
    name: "Tanya Kapoor",
    email: "tanya.kapoor@mail.com",
    degree: "MBA",
    department: "Marketing",
    graduationYear: 2023,
    enrollmentNumber: "2213009",
  },
  {
    id: 15,
    name: "Rakesh Sharma",
    email: "rakesh.sharma@mail.com",
    degree: "B.Tech",
    department: "Chemical",
    graduationYear: 2021,
    enrollmentNumber: "2213010",
  },
];

export const donations = [
  { id: 1, alumniName: "Darsh Balar", amount: 150000, date: "10/05/2025" },
  { id: 2, alumniName: "Anjali Verma", amount: 30000, date: "01/08/2025" },
  { id: 3, alumniName: "Rohit Singh", amount: 45000, date: "12/07/2025" },
  { id: 4, alumniName: "Pooja Desai", amount: 5000, date: "02/04/2025" },
  { id: 5, alumniName: "Amit Patel", amount: 75000, date: "18/03/2025" },
];

import {
  FaChartPie,
  FaCalendarAlt,
  FaUsers,
  FaDonate,
  FaBell,
  FaSearch,
  FaDownload,
  FaUpload,
  FaBriefcase,
  FaTrophy,
  FaUserPlus,
  FaComments,
  FaEye,
  FaEdit,
  FaBars,
  FaTimes,
} from "react-icons/fa";
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
} from "recharts";

const ITEMS_PER_PAGE = 12;

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("analytics");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New donation received from John Doe - ₹25,000",
      type: "donation",
      status: "unread",
      time: "2 minutes ago",
    },
    {
      id: 2,
      message: "Upcoming event: Annual Alumni Meet 2025",
      type: "event",
      status: "unread",
      time: "10 minutes ago",
    },
    {
      id: 3,
      message: "Priya Sharma (CSE '22) posted a new job opportunity at Google",
      type: "job",
      status: "unread",
      time: "1 hour ago",
    },
    {
      id: 4,
      message:
        "Congratulations! The mentorship program has successfully connected 50+ students with alumni mentors",
      type: "achievement",
      status: "read",
      time: "3 hours ago",
    },
    {
      id: 5,
      message:
        "New alumni registration: Raj Patel (Mechanical '23) joined the network",
      type: "registration",
      status: "read",
      time: "5 hours ago",
    },
    {
      id: 6,
      message:
        "Your post about 'Technology Trends 2025' received 25+ responses",
      type: "engagement",
      status: "read",
      time: "1 day ago",
    },
  ]);

  const departmentData = [
    { name: "Computer Engg", value: 280 },
    { name: "IT", value: 190 },
    { name: "Electrical", value: 85 },
    { name: "Mechanical", value: 77 },
    { name: "Civil", value: 50 },
  ];
  const graduationTrends = [
    { year: 2020, alumni: 30 },
    { year: 2021, alumni: 45 },
    { year: 2022, alumni: 70 },
    { year: 2023, alumni: 120 },
    { year: 2024, alumni: 220 },
    { year: 2025, alumni: 150 },
  ];
  const degreeList = ["B.Tech", "M.Tech", "MBA", "PhD"];
  const departmentList = [
    "Computer Science",
    "Electrical",
    "Mechanical",
    "Civil",
    "Chemical",
  ];
  const batchList = ["2020", "2021", "2022", "2023", "2024"];
  const locationData = [
    { location: "Ahmedabad", alumni: 65 },
    { location: "Delhi", alumni: 30 },
    { location: "Punjab", alumni: 20 },
    { location: "Banglore", alumni: 70 },
    { location: "Other", alumni: 40 },
  ];
  const donationData = [
    { name: "2021", funds: 120000 },
    { name: "2022", funds: 250000 },
    { name: "2023", funds: 180000 },
    { name: "2024", funds: 320000 },
    { name: "2025", funds: 400000 },
  ];
  const pieColors = [
    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
    "#A78BFA",
  ];
  const graduationLineColor = "#06B6D4";
  const locationBarColor = "#4F46E5";
  const donationLineColor = "#EF4444";

  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");

  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showAlumniModal, setShowAlumniModal] = useState(false);

  const filteredAlumni = useMemo(() => {
    return alumni.filter((member) => {
      const inSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const inDegree = degree === "" || member.degree === degree;
      const inDepartment =
        department === "" || member.department === department;
      const inBatch = batch === "" || String(member.graduationYear) === batch;
      return inSearch && inDegree && inDepartment && inBatch;
    });
  }, [searchTerm, degree, department, batch]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSearchTerm("");
    setCurrentPage(1);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderMainDashboard = () => {
    switch (activeSection) {
      case "analytics":
        return (
          <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
            {/* Header & Summary Cards */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-4 flex items-center gap-3">
                <FaChartPie className="text-indigo-600" /> Analytics Overview
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center">
                  <FaUsers className="text-blue-500 text-3xl mb-2" />
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">
                    {departmentData.reduce((acc, d) => acc + d.value, 0)}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 text-center">
                    Total Alumni
                  </span>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center">
                  <FaChartPie className="text-indigo-500 text-3xl mb-2" />
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">
                    {departmentData.length}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 text-center">
                    Departments
                  </span>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center">
                  <FaDonate className="text-emerald-500 text-3xl mb-2" />
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">
                    ₹
                    {donationData
                      .reduce((acc, d) => acc + d.funds, 0)
                      .toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 text-center">
                    Total Funds
                  </span>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center">
                  <FaBriefcase className="text-yellow-500 text-3xl mb-2" />
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">
                    17
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 text-center">
                    Jobs Posted
                  </span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10">
              <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
                <h2 className="text-lg font-bold mb-4 text-indigo-700 flex items-center gap-2">
                  {" "}
                  <FaUsers className="text-indigo-400" /> Department
                  Distribution{" "}
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      dataKey="value"
                      nameKey="name"
                      label={({ payload }) => `${payload?.name ?? ""}`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell
                          key={`slice-${index}`}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
                <h2 className="text-lg font-bold mb-4 text-teal-700 flex items-center gap-2">
                  {" "}
                  <FaTrophy className="text-teal-400" /> Graduation Year Trends{" "}
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={graduationTrends}>
                    <XAxis dataKey="year" /> <YAxis /> <Tooltip /> <Legend />
                    <Line
                      type="monotone"
                      dataKey="alumni"
                      stroke={graduationLineColor}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
                <h2 className="text-lg font-bold mb-4 text-indigo-700 flex items-center gap-2">
                  {" "}
                  <FaChartPie className="text-indigo-400" /> Geographic
                  Distribution{" "}
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={locationData}>
                    <XAxis dataKey="location" /> <YAxis /> <Tooltip />{" "}
                    <Legend />
                    <Bar
                      dataKey="alumni"
                      fill={locationBarColor}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
                <h2 className="text-lg font-bold mb-4 text-rose-700 flex items-center gap-2">
                  {" "}
                  <FaDonate className="text-rose-400" /> Funds Donated by Alumni{" "}
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={donationData}>
                    <XAxis dataKey="name" /> <YAxis /> <Tooltip /> <Legend />
                    <Line
                      type="monotone"
                      dataKey="funds"
                      stroke={donationLineColor}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Other Sections */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-bold mb-4 text-indigo-700 flex items-center gap-2">
                  <FaUsers className="text-indigo-400" /> Top Alumni
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {alumni.slice(0, 3).map((alum) => (
                    <div
                      key={alum.id}
                      className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-4 shadow flex flex-col items-center text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center text-2xl font-bold text-indigo-700 mb-2">
                        {alum.name.charAt(0)}
                      </div>
                      <div className="font-semibold text-gray-800">
                        {alum.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {alum.degree}, {alum.department}
                      </div>
                      <div className="text-xs text-gray-400">
                        Batch {alum.graduationYear}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-bold mb-4 text-yellow-700 flex items-center gap-2">
                  <FaBriefcase className="text-yellow-400" /> Recent Jobs Posted
                </h2>
                <ul className="divide-y divide-gray-200">
                  <li className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <span className="font-medium text-gray-800">
                      Software Engineer at Google
                    </span>
                    <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                      Priya Sharma (CSE '22)
                    </span>
                  </li>
                  <li className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <span className="font-medium text-gray-800">
                      Data Analyst at TCS
                    </span>
                    <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                      Rahul Verma (IT '21)
                    </span>
                  </li>
                  <li className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <span className="font-medium text-gray-800">
                      Mechanical Engineer at L&T
                    </span>
                    <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                      Raj Patel (Mechanical '23)
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-lg font-bold mb-4 text-indigo-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-400" /> Upcoming Events
                </h2>
                <ul className="divide-y divide-gray-200">
                  {events.slice(0, 3).map((event) => (
                    <li
                      key={event.id}
                      className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                    >
                      <span className="font-medium text-gray-800">
                        {event.name}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                        {event.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <section className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3 text-emerald-700 flex items-center gap-2">
                  <FaDonate className="text-emerald-400" /> Recent Donations
                </h3>
                <div className="overflow-x-auto rounded-md border border-gray-300">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Alumni
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donations.slice(0, 5).map((donation) => (
                        <tr key={donation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {donation.alumniName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            ₹{(Number(donation.amount) || 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                            {donation.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        );
      case "events":
        return (
          <div className="p-4 sm:p-6 bg-white min-h-screen">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                  <FaCalendarAlt className="text-indigo-600" /> Event Management
                </h1>
                <p className="mt-2 text-gray-600">
                  Create and manage alumni events and gatherings
                </p>
              </div>
              <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 font-medium w-full sm:w-auto justify-center">
                <FaCalendarAlt className="text-blue-100" /> Create Event
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-100">
              <div className="max-w-md">
                <label
                  htmlFor="event-search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Search Events
                </label>
                <div className="relative text-gray-500 focus-within:text-gray-700">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaSearch />
                  </span>
                  <input
                    id="event-search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by event name..."
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Event Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Organizer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginate(filteredEvents).map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {event.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {event.organizer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            event.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {event.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                            <FaEye className="w-4 h-4" />
                            Details
                          </button>
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                            <FaUsers className="w-4 h-4" />
                            Attendance
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredEvents.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalItems={filteredEvents.length}
                itemsPerPage={ITEMS_PER_PAGE}
                setPage={setCurrentPage}
              />
            )}
          </div>
        );
      case "Alumni Directory":
        return (
          <div className="p-4 sm:p-6 bg-white min-h-screen">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                  <FaUsers className="text-indigo-600" /> Alumni Directory
                </h1>
                <p className="mt-2 text-gray-600">
                  Browse and manage your alumni network
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="bg-emerald-500 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-600 flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow">
                  <FaDownload className="text-emerald-100" /> Export Excel
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow">
                  <FaUpload className="text-blue-100" /> Add Alumni
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer hover:bg-gray-50"
                >
                  <option value="">All Degrees</option>
                  {degreeList.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border rounded px-4 py-2.5"
                >
                  <option value="">All Departments</option>
                  {departmentList.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full border rounded px-4 py-2.5"
                >
                  <option value="">All Batches</option>
                  {batchList.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide hidden sm:table-cell">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide hidden md:table-cell">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginate(filteredAlumni).map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap hidden sm:table-cell">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap hidden md:table-cell">
                        {member.department}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            onClick={() => {
                              setSelectedAlumni(member);
                              setShowAlumniModal(true);
                            }}
                          >
                            <FaEye className="w-4 h-4" />
                            View
                          </button>
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                            <FaEdit className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredAlumni.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalItems={filteredAlumni.length}
                itemsPerPage={ITEMS_PER_PAGE}
                setPage={setCurrentPage}
              />
            )}
            {showAlumniModal && selectedAlumni && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    onClick={() => setShowAlumniModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-bold mb-4 text-indigo-700">
                    Alumni Profile
                  </h2>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div>
                      <span className="font-semibold">Name:</span>{" "}
                      {selectedAlumni.name}
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span>{" "}
                      {selectedAlumni.email}
                    </div>
                    <div>
                      <span className="font-semibold">Degree:</span>{" "}
                      {selectedAlumni.degree}
                    </div>
                    <div>
                      <span className="font-semibold">Department:</span>{" "}
                      {selectedAlumni.department}
                    </div>
                    <div>
                      <span className="font-semibold">Graduation Year:</span>{" "}
                      {selectedAlumni.graduationYear}
                    </div>
                    <div>
                      <span className="font-semibold">Enrollment No:</span>{" "}
                      {selectedAlumni.enrollmentNumber}
                    </div>
                  </div>
                  <div className="mt-6 text-right">
                    <button
                      className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                      onClick={() => setShowAlumniModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "notifications":
        return (
          <div className="p-4 sm:p-6 bg-white min-h-screen">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-3">
                <FaBell className="text-indigo-600" /> Notifications
              </h1>
              {notifications.some((note) => note.status === "unread") && (
                <button
                  onClick={() => {
                    setNotifications((prev) =>
                      prev.map((n) => ({ ...n, status: "read" }))
                    );
                  }}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors mt-2 sm:mt-0"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <FaBell className="mx-auto text-4xl text-gray-300 mb-3" />
                  <p className="text-gray-500 text-lg">No new notifications</p>
                </div>
              ) : (
                notifications.map((note) => (
                  <div
                    key={note.id}
                    className={`transform transition-all duration-200 hover:scale-[1.01] ${
                      note.status === "unread"
                        ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-600"
                        : "bg-white"
                    } rounded-lg shadow-sm p-4 flex flex-col sm:flex-row items-start justify-between gap-4`}
                  >
                    <div className="flex items-start gap-3 flex-grow">
                      <div
                        className={`mt-1 p-2 rounded-full ${
                          note.status === "unread"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {note.type === "donation" && (
                          <FaDonate className="w-4 h-4" />
                        )}{" "}
                        {note.type === "event" && (
                          <FaCalendarAlt className="w-4 h-4" />
                        )}
                        {note.type === "job" && (
                          <FaBriefcase className="w-4 h-4" />
                        )}{" "}
                        {note.type === "achievement" && (
                          <FaTrophy className="w-4 h-4" />
                        )}
                        {note.type === "registration" && (
                          <FaUserPlus className="w-4 h-4" />
                        )}{" "}
                        {note.type === "engagement" && (
                          <FaComments className="w-4 h-4" />
                        )}
                        {!note.type && <FaBell className="w-4 h-4" />}
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            note.status === "unread"
                              ? "text-gray-900 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {note.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {note.time}
                        </p>
                      </div>
                    </div>
                    {note.status === "unread" && (
                      <button
                        onClick={() => {
                          setNotifications((prev) =>
                            prev.map((n) =>
                              n.id === note.id ? { ...n, status: "read" } : n
                            )
                          );
                        }}
                        className="text-xs self-start sm:self-center font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors flex-shrink-0"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar for navigation */}
      <aside
        className={`w-64 bg-white p-6 shadow-lg flex flex-col fixed inset-y-0 left-0 z-30 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-3xl my-8 font-extrabold text-gray-800">
          Dashboard
        </h2>
        <nav className="flex flex-col flex-grow space-y-3">
          {[
            { id: "analytics", label: "Analytics", icon: <FaChartPie /> },
            { id: "Alumni Directory", label: "Alumni Directory", icon: <FaUsers /> },
            { id: "events", label: "Events", icon: <FaCalendarAlt /> },
            { id: "notifications", label: "Notifications", icon: <FaBell /> },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => handleSectionChange(id)}
              className={`flex items-center gap-3 p-3 rounded-lg text-left text-lg font-semibold transition-colors duration-200 ${
                activeSection === id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-xl">{icon}</span> {label}
            </button>
          ))}
        </nav>
        <footer className="mt-auto py-6">
          <p className="text-sm text-gray-500">&copy; 2025 Alumni Network</p>
        </footer>
      </aside>

      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top header for mobile */}
        <header className="md:hidden sticky top-10 bg-white shadow-md z-10 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {activeSection}
          </h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Main content area */}
        <main className="flex-1 mt-12 overflow-auto">{renderMainDashboard()}</main>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalItems, itemsPerPage, setPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null; // Don't show pagination if there's only one page
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="mt-6 flex justify-center items-center space-x-3">
      <button
        onClick={() => canPrev && setPage(currentPage - 1)}
        disabled={!canPrev}
        className={`px-4 py-2 rounded-md ${
          canPrev ? "bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed"
        }`}
        aria-label="Previous Page"
      >
        Prev
      </button>
      <span className="text-gray-700 font-semibold">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => canNext && setPage(currentPage + 1)}
        disabled={!canNext}
        className={`px-4 py-2 rounded-md ${
          canNext ? "bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed"
        }`}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default AdminDashboard;
