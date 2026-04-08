import React, { useState } from "react";

// Data
const featuredEvents = [
  {
    title: "Annual Alumni Gala 2024",
    description:
      "Join us for an elegant evening celebrating our alumni achievements and fostering new connections.",
    date: "Sunday, December 15, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Grand Ballroom, Marriott Hotel, New York, NY",
    attendees: 250,
    price: "$75",
    tags: ["Featured", "Networking"],
  },
  {
    title: "Healthcare Leaders Summit",
    description:
      "Annual summit bringing together healthcare professionals to discuss industry trends and innovations.",
    date: "Sunday, December 8, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Medical Center Conference Hall, Boston, MA",
    attendees: 120,
    price: "$50",
    tags: ["Featured", "Professional"],
  },
];

const upcomingEvents = [
  {
    title: "Tech Industry Meetup",
    date: "28/11/2024",
    location: "San Francisco, CA",
    attendees: 85,
    price: "Free",
    tag: "Professional",
  },
  {
    title: "Young Alumni Happy Hour",
    date: "22/11/2024",
    location: "Chicago, IL",
    attendees: 45,
    price: "$25",
    tag: "Social",
  },
  {
    title: "Entrepreneurship Workshop",
    date: "01/12/2024",
    location: "Austin, TX",
    attendees: 60,
    price: "$40",
    tag: "Educational",
  },
];

const categories = ["Professional", "Social", "Educational", "Networking"];

const Events = () => {
  // State management
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Professional", // Added initial category
    expectedAttendees: "",
  });

  // Handle proposal form submission
  const handleProposalSubmit = (e) => {
    e.preventDefault();
    console.log("Event proposal submitted:", proposalForm);
    alert("Event proposal submitted successfully!");
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-top py-24 mb-12 rounded-b-3xl shadow-2xl"
        style={{ backgroundImage: "url('/login-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 rounded-b-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Discover & Connect at Alumni Events
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Your central hub for all upcoming gatherings, workshops, and
            reunions. Reconnect, learn, and grow with your peers.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 transform hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="text-white font-semibold text-lg">10+ Events</p>
                <p className="text-blue-100">This Month</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 transform hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">👥</span>
              <div>
                <p className="text-white font-semibold text-lg">500+ Alumni</p>
                <p className="text-blue-100">Participating</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 transform hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🌍</span>
              <div>
                <p className="text-white font-semibold text-lg">5+ Cities</p>
                <p className="text-blue-100">Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Events Section */}
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Featured Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredEvents.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 relative">
                <div className="absolute top-4 left-4 bg-yellow-400 text-blue-800 rounded-full text-xs font-semibold px-3 py-1">
                  {event.tags[0]}
                </div>
                <div className="absolute top-4 right-4 bg-yellow-400 text-blue-800 rounded-full text-xs font-semibold px-3 py-1">
                  {event.tags[1]}
                </div>
                <div className="text-center mt-8">
                  <span className="text-6xl">📅</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  {event.title}
                </h3>
                <p className="text-slate-600 mb-4">{event.description}</p>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center text-slate-700">
                    <span className="mr-3 text-lg">🗓️</span> {event.date}
                  </div>
                  <div className="flex items-center text-slate-700">
                    <span className="mr-3 text-lg">🕒</span> {event.time}
                  </div>
                  <div className="flex items-center text-slate-700">
                    <span className="mr-3 text-lg">📍</span> {event.location}
                  </div>
                  <div className="flex items-center text-slate-700">
                    <span className="mr-3 text-lg">👥</span> {event.attendees}{" "}
                    attendees
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {event.price}
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg py-3 px-6 font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="mr-2">Register Now</span>
                    <span className="text-lg">🔗</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Events Section */}
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 relative">
                <div className="absolute top-4 right-4 bg-white/90 text-indigo-600 rounded-full text-xs font-semibold px-3 py-1">
                  {event.tag}
                </div>
                <div className="text-center mt-6">
                  <span className="text-5xl">🗓️</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {event.title}
                </h3>
                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex items-center text-slate-700">
                    <span className="mr-3 text-lg">📅</span> {event.date}
                  </div>
                  <div className="flex items-center text-slate-700">
                    <span className="mr-3 text-lg">📍</span> {event.location}
                  </div>
                  <div className="flex items-center text-slate-700">
                    <span className="mr-3 text-lg">👥</span> {event.attendees}{" "}
                    attendees
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="font-bold text-xl text-blue-600">
                    {event.price}
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center justify-center bg-slate-100 text-slate-800 rounded-lg py-2 px-4 font-semibold hover:bg-slate-200 transition-all duration-300"
                  >
                    <span className="mr-2">View Details</span>
                    <span className="text-lg">➡️</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Organize Event Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 my-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Organize an Event?
          </h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Planning a regional meetup, industry panel, or social gathering? We
            provide support and resources to help you create successful alumni
            events.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowProposalForm(true)}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Submit Event Proposal
            </button>
          </div>
        </div>

        {/* Event Proposal Form Modal */}
        {showProposalForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Submit Event Proposal
              </h2>
              <form onSubmit={handleProposalSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Event Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={proposalForm.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={proposalForm.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      name="date"
                      value={proposalForm.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Time
                    </label>
                    <input
                      id="time"
                      type="time"
                      name="time"
                      value={proposalForm.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={proposalForm.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={proposalForm.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="expectedAttendees"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Expected Attendees
                    </label>
                    <input
                      id="expectedAttendees"
                      type="number"
                      name="expectedAttendees"
                      value={proposalForm.expectedAttendees}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-4 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowProposalForm(false)}
                    className="px-6 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Submit Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
