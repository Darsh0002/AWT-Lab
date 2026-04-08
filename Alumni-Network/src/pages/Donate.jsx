import React, { useState, useMemo, useEffect } from "react";

// --- DUMMY DATA ---
const initialCampaigns = [
  {
    id: 1,
    title: "Empower Rural Students Fund",
    description:
      "Provide educational opportunities and scholarships for talented students from rural and economically disadvantaged backgrounds across the nation.",
    image:
      "data:image/jpeg;base64,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",
    tags: ["Education", "Rural Development", "Empowerment"],
    supporters: 520,
    raised: 1500000,
    goal: 2500000,
    endDate: "2024-12-31",
  },
  {
    id: 2,
    title: "Innovation Lab Expansion",
    description:
      "Support the expansion of our university's innovation lab to foster entrepreneurship and cutting-edge research in line with modern tech advancements.",
    image:
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop",
    tags: ["Research", "Innovation", "Technology"],
    supporters: 180,
    raised: 400000,
    goal: 1000000,
    endDate: "2025-06-30",
  },
  {
    id: 3,
    title: "Green Campus Initiative",
    description:
      "Transform our campus with solar energy, water harvesting, and innovative waste management solutions for a sustainable future.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    tags: ["Environment", "Sustainability", "Campus"],
    supporters: 750,
    raised: 1200000,
    goal: 3000000,
    endDate: "2024-09-30",
  },
  {
    id: 4,
    title: "Alumni Mental Health Initiative",
    description:
      "Establish a comprehensive mental health support system for students and alumni, addressing the rising concerns in indian youth.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    tags: ["Mental Health", "Wellness", "Youth Support"],
    supporters: 310,
    raised: 125000,
    goal: 225000,
    endDate: "2024-10-31",
  },
];

// --- SVG ICONS ---
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1.5 inline-block"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0110 14.5a5 5 0 01-3.5-1.53 6.97 6.97 0 00-1.5 4.33A5 5 0 0010 18.5a5 5 0 002.93-1.5z" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1.5 inline-block"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

// --- REUSABLE COMPONENTS ---

const CampaignCard = ({ campaign, onDonate }) => {
  const progress = Math.round((campaign.raised / campaign.goal) * 100);
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="md:w-1/3">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-48 md:h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900">{campaign.title}</h3>
        <p className="text-gray-600 text-sm mt-2 mb-4 flex-grow">
          {campaign.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {campaign.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mb-2">
          <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            <span>${campaign.raised.toLocaleString()} raised</span>
            <span className="text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <div>
            <span className="flex items-center">
              <UsersIcon /> {campaign.supporters} supporters
            </span>
            <span className="flex items-center mt-1">
              <CalendarIcon /> Ends{" "}
              {new Date(campaign.endDate).toLocaleDateString()}
            </span>
          </div>
          <button
            onClick={() => onDonate(campaign)}
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

const DonationModal = ({ campaign, setShowModal }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountClick = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setAmount(Number(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    console.log(`Donating $${amount} to ${campaign.title}`);
    setStep(2);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 1 ? (
          <form onSubmit={handleSubmit}>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Support {campaign.title}
              </h2>
              <p className="text-gray-600 mt-2">
                Your contribution will make a difference. Thank you for your
                generosity.
              </p>

              <div className="mt-6">
                <label className="font-semibold text-gray-700">
                  Choose an amount
                </label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[25, 50, 100].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => handleAmountClick(val)}
                      className={`p-3 border rounded-lg font-bold transition-colors ${
                        amount === val && customAmount === ""
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Or enter custom amount"
                  className="w-full p-3 border rounded-lg mt-3"
                />
              </div>

              <div className="mt-6">
                <label className="font-semibold text-gray-700">
                  Personal Information
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 rounded-b-2xl">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700"
              >
                Donate ${amount || 0}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center p-12">
            <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              Thank You!
            </h2>
            <p className="text-gray-600 mt-2">
              Your generous donation to "{campaign.title}" is greatly
              appreciated. A receipt has been sent to your email.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function Donate() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, campaigns]);

  const collegeFundCampaign = {
    id: 0,
    title: "General College Fund",
    description:
      "Support the core mission of our college, from academic programs and faculty development to campus infrastructure. Your unrestricted gift provides flexibility to address the most pressing needs and opportunities as they arise.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
    tags: ["Unrestricted", "Core Mission", "Greatest Need"],
    supporters: "1,200+",
    raised: 5000000,
    goal: 10000000,
    endDate: "Ongoing",
  };

  return (
    <div className="bg-blue-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Fundraising <span className="text-blue-600">Campaigns</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            The Donation Portal enables both alumni and the institution to
            contribute to and manage financial donations through various
            campaigns.
          </p>
        </header>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-3 items-center sticky top-4 z-10">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder="Search campaigns..."
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
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-5 rounded-lg hover:bg-gray-100 transition-colors">
              Filters
            </button>
            <button className="w-full md:w-auto bg-green-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-green-700 transition-colors">
              + Create Campaign
            </button>
          </div>
        </div>

        <main className="space-y-8">
          {/* General College Fund Card */}
          <CampaignCard
            campaign={collegeFundCampaign}
            onDonate={handleDonateClick}
          />

          {/* Other Campaigns */}
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onDonate={handleDonateClick}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-700">
                No Campaigns Found
              </h3>
              <p className="text-gray-500 mt-2">
                Your search did not match any fundraising campaigns.
              </p>
            </div>
          )}
        </main>
      </div>
      {showModal && selectedCampaign && (
        <DonationModal
          campaign={selectedCampaign}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
