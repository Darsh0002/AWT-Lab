import React, { useState, useMemo } from "react";

// =================================================================================================
// --- DUMMY DATA ---
// =================================================================================================
const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Innovate Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    department: "Engineering",
    description:
      "We are looking for a skilled Frontend Developer to join our team to build beautiful, responsive user interfaces for our flagship products. Key skills: React, TypeScript, CSS.",
    postedBy: "Dr. Sarah Chen",
    postedOn: "2024-09-15",
    companyLogo: "https://placehold.co/100x100/3B82F6/FFFFFF?text=IS",
  },
  {
    id: 2,
    title: "Business Development Intern",
    company: "EcoInnovate",
    location: "Remote",
    type: "Internship",
    department: "Business",
    description:
      "This internship offers a unique opportunity to work directly with the CEO on strategic partnerships and market expansion initiatives.",
    postedBy: "Marcus Williams",
    postedOn: "2024-09-14",
    companyLogo: "https://placehold.co/100x100/10B981/FFFFFF?text=EI",
  },
  {
    id: 3,
    title: "Clinical Research Associate",
    company: "BioPharma Innovations",
    location: "Boston, MA",
    type: "Full-time",
    department: "Healthcare",
    description:
      "Support clinical trials and contribute to groundbreaking medical research. Requires a background in life sciences.",
    postedBy: "Dr. Priya Patel",
    postedOn: "2024-09-12",
    companyLogo: "https://placehold.co/100x100/0EA5E9/FFFFFF?text=BI",
  },
  {
    id: 4,
    title: "Financial Analyst",
    company: "Venture Capital Partners",
    location: "New York, NY",
    type: "Full-time",
    department: "Finance",
    description:
      "Analyze market trends, perform due diligence on potential investments, and support our portfolio companies. Experience with SQL is a plus.",
    postedBy: "James Rodriguez",
    postedOn: "2024-09-11",
    companyLogo: "https://placehold.co/100x100/1E3A8A/FFFFFF?text=VP",
  },
  {
    id: 5,
    title: "UX Design Intern",
    company: "Creative Minds Agency",
    location: "Remote",
    type: "Internship",
    department: "Design",
    description:
      "Join our design team to work on real client projects, from user research and wireframing to final mockups using Figma.",
    postedBy: "Emily Watson",
    postedOn: "2024-09-10",
    companyLogo: "https://placehold.co/100x100/14B8A6/FFFFFF?text=CM",
  },
  {
    id: 6,
    title: "Backend Engineer (Go)",
    company: "DataStream Corp",
    location: "Austin, TX",
    type: "Full-time",
    department: "Engineering",
    description:
      "Develop and maintain scalable backend services and APIs that power our data analytics platform. Experience with Go, Docker, and SQL is required.",
    postedBy: "David Lee",
    postedOn: "2024-09-08",
    companyLogo: "https://placehold.co/100x100/475569/FFFFFF?text=DC",
  },
];

// =================================================================================================
// --- REUSABLE UI COMPONENTS ---
// =================================================================================================
const JobCard = ({ job, isBestMatch = false }) => (
  <div
    className={`relative bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      isBestMatch ? "ring-4 ring-blue-500 ring-offset-2" : ""
    }`}
  >
    {isBestMatch && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
        BEST MATCH
      </div>
    )}
    <div className="flex items-start mb-4">
      <img
        src={job.companyLogo}
        alt={`${job.company} logo`}
        className="w-16 h-16 rounded-lg mr-4 object-cover"
      />
      <div>
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            job.type === "Full-time"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {job.type}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mt-1">{job.title}</h3>
        <p className="text-gray-600 font-semibold">{job.company}</p>
      </div>
    </div>
    <p className="text-gray-700 text-sm flex-grow mb-4">{job.description}</p>
    <div className="text-sm text-gray-500 mb-4">
      <p className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1 inline-block"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        {job.location}
      </p>
    </div>
    <div className="border-t border-gray-100 pt-4 mt-auto flex justify-between items-center">
      <div className="text-xs text-gray-500">
        <p>
          Posted by{" "}
          <span className="font-semibold text-blue-700">{job.postedBy}</span>
        </p>
        <p>{new Date(job.postedOn).toLocaleDateString()}</p>
      </div>
      <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
        Apply Now
      </button>
    </div>
  </div>
);

const PostJobModal = ({ setShowModal, setJobs }) => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description: "",
    postedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      ...jobDetails,
      postedOn: new Date().toISOString().split("T")[0],
      companyLogo: `https://placehold.co/100x100/8B5CF6/FFFFFF?text=${jobDetails.company
        .substring(0, 2)
        .toUpperCase()}`,
    };
    setJobs((prevJobs) => [newJob, ...prevJobs]);
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Post a New Job Opening
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600 text-3xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={jobDetails.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={jobDetails.company}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <select
              name="location"
              value={jobDetails.location}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white"
            >
              <option>Remote</option>
              <option>New York, NY</option>
              <option>San Francisco, CA</option>
              <option>Austin, TX</option>
            </select>
            <select
              name="type"
              value={jobDetails.type}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white"
            >
              <option>Full-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
            <select
              name="department"
              value={jobDetails.department}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white"
            >
              <option>Engineering</option>
              <option>Design</option>
              <option>Business</option>
              <option>Finance</option>
              <option>Healthcare</option>
            </select>
            <input
              type="text"
              name="postedBy"
              placeholder="Your Name (Alumni)"
              value={jobDetails.postedBy}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <textarea
            name="description"
            placeholder="Job Description"
            value={jobDetails.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-32"
            required
          ></textarea>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =================================================================================================
// --- MAIN COMPONENT ---
// =================================================================================================
export default function Jobs() {
  // --- STATE MANAGEMENT ---
  const [jobs, setJobs] = useState(initialJobs);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "All Locations",
    type: "All Types",
    department: "All Departments",
  });
  const [userProfile, setUserProfile] = useState({
    skills: "",
    title: "",
    location: "",
  });
  const [isMatching, setIsMatching] = useState(false);
  const [bestJobMatch, setBestJobMatch] = useState(null);

  // --- EVENT HANDLERS & LOGIC ---
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindJobMatch = (e) => {
    e.preventDefault();
    if (!userProfile.skills && !userProfile.title) {
      alert("Please fill in your skills or desired job title.");
      return;
    }
    setIsMatching(true);
    setBestJobMatch(null);

    // Simulate AI processing delay
    setTimeout(() => {
      let topJob = null;
      let maxScore = -1;
      const profileSkills = userProfile.skills
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const profileTitle = userProfile.title.toLowerCase();

      jobs.forEach((job) => {
        let score = 0;
        const jobText = `${job.title} ${job.description}`.toLowerCase();

        // 1. Skill Match (High Priority)
        profileSkills.forEach((skill) => {
          if (jobText.includes(skill)) score += 15;
        });

        // 2. Title Match (High Priority)
        if (job.title.toLowerCase().includes(profileTitle)) score += 20;

        // 3. Location Match (Medium Priority)
        const profileLocation = userProfile.location.toLowerCase();
        if (
          profileLocation &&
          job.location.toLowerCase().includes(profileLocation)
        )
          score += 10;
        if (
          profileLocation === "remote" &&
          job.location.toLowerCase() === "remote"
        )
          score += 15;

        if (score > maxScore) {
          maxScore = score;
          topJob = job;
        }
      });

      setBestJobMatch(topJob);
      setIsMatching(false);
    }, 2000);
  };

  // --- MEMOIZED COMPUTATIONS ---
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchTerm.toLowerCase() === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation =
        filters.location === "All Locations" ||
        job.location === filters.location;
      const matchesType =
        filters.type === "All Types" || job.type === filters.type;
      const matchesDepartment =
        filters.department === "All Departments" ||
        job.department === filters.department;
      return (
        matchesSearch && matchesLocation && matchesType && matchesDepartment
      );
    });
  }, [searchTerm, filters, jobs]);

  const uniqueValues = (key) => [
    "All " + key.charAt(0).toUpperCase() + key.slice(1) + "s",
    ...new Set(initialJobs.map((j) => j[key])),
  ];

  // --- RENDER ---
  return (
    <div className="bg-blue-50 pt-8 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Alumni <span className="text-blue-600">Job Board</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover exclusive opportunities posted by fellow alumni. Your next
            career move starts here.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            + Post a Job Opening
          </button>
        </header>

        {/* AI Job Matcher Section */}
        <section className="mt-16 max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl shadow-2xl text-white">
            <h2 className="text-3xl font-bold text-center mb-2">
              Find Your Perfect Job with AI
            </h2>
            <p className="text-center text-blue-100 mb-6">
              Tell us about yourself and we'll find the best role for you.
            </p>

            {!bestJobMatch && !isMatching && (
              <form onSubmit={handleFindJobMatch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="skills"
                      className="block text-sm font-semibold mb-2 text-blue-100"
                    >
                      Your Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="skills"
                      id="skills"
                      value={userProfile.skills}
                      onChange={handleProfileChange}
                      placeholder="e.g., React, SQL, Figma"
                      className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-blue-200 focus:ring-2 focus:ring-white outline-none transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-semibold mb-2 text-blue-100"
                    >
                      Desired Job Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={userProfile.title}
                      onChange={handleProfileChange}
                      placeholder="e.g., Frontend Developer"
                      className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-blue-200 focus:ring-2 focus:ring-white outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold mb-2 text-blue-100"
                  >
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={userProfile.location}
                    onChange={handleProfileChange}
                    placeholder="e.g., Remote, New York, CA"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-blue-200 focus:ring-2 focus:ring-white outline-none transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors shadow-lg !mt-6"
                >
                  Find My Job Match
                </button>
              </form>
            )}

            {isMatching && (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                <p className="mt-4 font-semibold text-lg">
                  Scanning job openings for you...
                </p>
              </div>
            )}

            {bestJobMatch && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  We found a job that's a great fit!
                </h3>
                <div className="max-w-md mx-auto relative">
                  <JobCard job={bestJobMatch} isBestMatch={true} />
                </div>
                <button
                  onClick={() => {
                    setBestJobMatch(null);
                    setUserProfile({ skills: "", title: "", location: "" });
                  }}
                  className="mt-6 bg-white/20 text-white font-semibold py-2 px-5 rounded-lg hover:bg-white/30 transition"
                >
                  Search Again
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Filter & Search Section */}
        <div className="p-6 rounded-xl shadow-md border border-gray-100 mb-8 sticky top-4 z-10 backdrop-blur-sm bg-white/80">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
            <div className="relative lg:col-span-1">
              <input
                type="text"
                placeholder="Search by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <select
              name="location"
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
            >
              {uniqueValues("location").map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <select
              name="type"
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
            >
              {uniqueValues("type").map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              name="department"
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
            >
              {uniqueValues("department").map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="md:col-span-2 xl:col-span-3 text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No Job Openings Found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search criteria or check back later!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      {showModal && (
        <PostJobModal setShowModal={setShowModal} setJobs={setJobs} />
      )}
    </div>
  );
}
