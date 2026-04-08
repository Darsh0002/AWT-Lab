import React, { useState, useMemo } from "react";

const alumniData = [
  {
    name: "Aarav Patel",
    position: "Senior Software Engineer",
    company: "Tata Consultancy Services",
    location: "Mumbai, Maharashtra",
    education: "Computer Science and Engineering, Class of 2018",
    industry: "Information Technology",
    skills: ["Java", "Spring Boot", "Microservices", "Docker"],
    achievement:
      "Led development of a core banking system used by 5 major Indian banks.",
    match: "66%",
  },
  {
    name: "Priya Sharma",
    position: "Data Scientist",
    company: "Flipkart",
    location: "Bangalore, Karnataka",
    education: "Data Science, Class of 2019",
    industry: "E-commerce",
    skills: ["Python", "Machine Learning", "SQL", "Tableau"],
    achievement:
      "Developed an AI model that improved product recommendations by 30%.",
    match: "72%",
  },
  {
    name: "Rohan Mehta",
    position: "Product Manager",
    company: "Swiggy",
    location: "Bangalore, Karnataka",
    education: "MBA, Class of 2016",
    industry: "Logistics",
    skills: ["Roadmapping", "Analytics", "Stakeholder mgmt"],
    achievement: "Launched 2 new business verticals increasing GMV by 18%.",
    match: "58%",
  },
  {
    name: "Sneha Kapoor",
    position: "Frontend Engineer",
    company: "Zomato",
    location: "Pune, Maharashtra",
    education: "Information Technology, Class of 2020",
    industry: "Foodtech",
    skills: ["React", "TypeScript", "CSS", "Accessibility"],
    achievement:
      "Improved page load times by 40% leading to higher conversions.",
    match: "80%",
  },
  {
    name: "Vikram Singh",
    position: "DevOps Engineer",
    company: "Microsoft",
    location: "Hyderabad, Telangana",
    education: "Computer Science, Class of 2015",
    industry: "Cloud",
    skills: ["Kubernetes", "Terraform", "AWS", "CI/CD"],
    achievement:
      "Built scalable infra supporting 99.99% uptime for critical services.",
    match: "69%",
  },
  {
    name: "Anita Rao",
    position: "UX Designer",
    company: "Google",
    location: "Bangalore, Karnataka",
    education: "Design, Class of 2017",
    industry: "Tech",
    skills: ["Figma", "User Research", "Prototyping"],
    achievement: "Redesigned onboarding flow increasing retention by 22%.",
    match: "75%",
  },
  {
    name: "Karan Verma",
    position: "Data Engineer",
    company: "Jio Platforms",
    location: "Ahmedabad, Gujarat",
    education: "Computer Engineering, Class of 2014",
    industry: "Telecom",
    skills: ["Spark", "Python", "ETL", "BigQuery"],
    achievement: "Built ETL pipelines processing 10TB/day.",
    match: "61%",
  },
  {
    name: "Meera Nair",
    position: "ML Engineer",
    company: "Amazon",
    location: "Bangalore, Karnataka",
    education: "AI & ML, Class of 2019",
    industry: "E-commerce",
    skills: ["PyTorch", "NLP", "MLOps"],
    achievement: "Deployed recommendation models saving 12% compute costs.",
    match: "78%",
  },
  {
    name: "Aditya Joshi",
    position: "Cybersecurity Analyst",
    company: "Infosys",
    location: "Pune, Maharashtra",
    education: "Information Security, Class of 2013",
    industry: "Security",
    skills: ["SIEM", "Pen Testing", "Forensics"],
    achievement: "Led incident response to mitigate major breach swiftly.",
    match: "64%",
  },
  {
    name: "Neha Desai",
    position: "Cloud Architect",
    company: "IBM",
    location: "Chennai, Tamil Nadu",
    education: "Cloud Computing, Class of 2017",
    industry: "Cloud Services",
    skills: ["Azure", "AWS", "GCP", "DevOps"],
    achievement: "Architected multi-cloud solutions for Fortune 500 clients.",
    match: "73%",
  },
  {
    name: "Siddharth Jain",
    position: "AI Researcher",
    company: "NVIDIA",
    location: "Noida, Uttar Pradesh",
    education: "Artificial Intelligence, Class of 2021",
    industry: "Semiconductors",
    skills: ["Deep Learning", "CUDA", "Python", "TensorFlow"],
    achievement: "Published 5 papers in top AI conferences.",
    match: "81%",
  },
  {
    name: "Ritika Singh",
    position: "Marketing Lead",
    company: "Unilever",
    location: "Kolkata, West Bengal",
    education: "Marketing, Class of 2018",
    industry: "FMCG",
    skills: ["Brand Strategy", "Digital Marketing", "SEO"],
    achievement: "Launched award-winning campaigns for new products.",
    match: "67%",
  },
  {
    name: "Mohit Agarwal",
    position: "Full Stack Developer",
    company: "Paytm",
    location: "Jaipur, Rajasthan",
    education: "Software Engineering, Class of 2016",
    industry: "Fintech",
    skills: ["Node.js", "React", "MongoDB", "TypeScript"],
    achievement: "Built scalable payment systems for millions of users.",
    match: "74%",
  },
  {
    name: "Ayesha Khan",
    position: "HR Manager",
    company: "Wipro",
    location: "Lucknow, Uttar Pradesh",
    education: "Human Resources, Class of 2015",
    industry: "IT Services",
    skills: ["Recruitment", "Employee Engagement", "Payroll"],
    achievement: "Implemented employee wellness programs across India.",
    match: "62%",
  },
  {
    name: "Rajesh Pillai",
    position: "Business Analyst",
    company: "Accenture",
    location: "Thiruvananthapuram, Kerala",
    education: "Business Analytics, Class of 2019",
    industry: "Consulting",
    skills: ["Excel", "Power BI", "SQL", "Data Visualization"],
    achievement: "Optimized processes saving $2M annually for clients.",
    match: "70%",
  },
  {
    name: "Tanvi Shah",
    position: "Product Designer",
    company: "Adobe",
    location: "Surat, Gujarat",
    education: "Design, Class of 2020",
    industry: "Software",
    skills: ["UI/UX", "Illustrator", "Photoshop", "Figma"],
    achievement: "Designed award-winning creative tools for designers.",
    match: "77%",
  },
];

const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colors = [
    "from-indigo-500 to-purple-500",
    "from-rose-500 to-orange-400",
    "from-green-400 to-teal-500",
    "from-sky-400 to-indigo-500",
  ];
  const clr = colors[name.length % colors.length];
  return (
    <div
      className={`w-12 h-12 rounded-full bg-gradient-to-br ${clr} flex items-center justify-center text-white font-semibold shadow-md`}
    >
      {initials}
    </div>
  );
};

const AlumniCard = ({ alumnus }) => (
  <div className="bg-white shadow-lg rounded-xl p-3 md:p-4 border border-gray-100 transform hover:scale-102 transition-transform duration-200">
    <div className="flex items-start gap-2 md:gap-3">
      <Avatar name={alumnus.name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between flex-wrap gap-1.5">
          <div>
            <div className="text-sm md:text-base font-semibold text-gray-900 truncate">
              {alumnus.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {alumnus.position} <span className="text-gray-300">•</span>{" "}
              <span className="font-medium text-gray-700">
                {alumnus.company}
              </span>
            </div>
          </div>
          <div>
            <span className="inline-block text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full">
              {alumnus.match} Match
            </span>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-600">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="inline-flex items-center gap-2 text-xs text-gray-500">
              📍 {alumnus.location}
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-500">{alumnus.education}</span>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">{alumnus.industry}</div>

        <div className="mt-4 flex flex-wrap gap-2">
          {alumnus.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <div className="font-medium text-gray-800 mb-1">
            Recent Achievement
          </div>
          <div className="text-sm text-gray-600">{alumnus.achievement}</div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button className="text-sm text-indigo-600 hover:underline">
            LinkedIn
          </button>
          <button className="text-sm text-sky-600 hover:underline">
            Twitter
          </button>
          <button className="ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-800 hover:to-indigo-800 text-white text-sm font-medium px-3 py-1 rounded-lg shadow">
            Connect
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AlumniDirectory = () => {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [skill, setSkill] = useState("");

  // Extract filter options from alumniData
  const graduationYears = Array.from(
    new Set(
      alumniData.map((a) => {
        const match = a.education.match(/Class of (\d{4})/);
        return match ? match[1] : "";
      }),
    ).values(),
  ).filter(Boolean);
  const companies = Array.from(
    new Set(alumniData.map((a) => a.company)),
  ).filter(Boolean);
  const states = Array.from(
    new Set(
      alumniData.map((a) => {
        const parts = a.location.split(", ");
        return parts.length > 1 ? parts[1] : "";
      }),
    ).values(),
  ).filter(Boolean);
  const skills = Array.from(
    new Set(alumniData.flatMap((a) => a.skills)),
  ).filter(Boolean);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return alumniData.filter((a) => {
      // Graduation year
      const matchYear = year ? a.education.includes(year) : true;
      // Company
      const matchCompany = company ? a.company === company : true;
      // State
      const matchState = state ? a.location.endsWith(state) : true;
      // Skill
      const matchSkill = skill ? a.skills.includes(skill) : true;
      // Query
      const matchQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q) ||
        a.position.toLowerCase().includes(q) ||
        a.skills.some((s) => s.toLowerCase().includes(q)) ||
        a.location.toLowerCase().includes(q);
      return (
        matchYear && matchCompany && matchState && matchSkill && matchQuery
      );
    });
  }, [query, year, company, state, skill]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center shadow-lg">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Alumni Directory
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover, connect, and get inspired by our alumni network. Filter by
            graduation year, company, state, skills, or search by keywords.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 -mt-16 z-10 relative">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-4 items-center justify-center border border-gray-100">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Search by name, company, role, skill or location..."
            aria-label="Search alumni"
          />
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl shadow-sm"
          >
            <option value="">Year</option>
            {graduationYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl shadow-sm"
          >
            <option value="">Company</option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl shadow-sm"
          >
            <option value="">State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl shadow-sm"
          >
            <option value="">Skill</option>
            {skills.map((sk) => (
              <option key={sk} value={sk}>
                {sk}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setQuery("");
              setYear("");
              setCompany("");
              setState("");
              setSkill("");
            }}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl shadow-sm hover:from-blue-700 hover:to-indigo-700 font-semibold"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Alumni Cards Section */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filtered.map((alumnus, idx) => (
            <AlumniCard key={idx} alumnus={alumnus} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 text-center text-gray-500 text-lg">
            No alumni match your search or filters. Try different keywords or
            filters.
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="w-full py-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-lg font-semibold">
            &copy; 2025 AlumNet | Built for Alumni, by Alumni
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AlumniDirectory;
