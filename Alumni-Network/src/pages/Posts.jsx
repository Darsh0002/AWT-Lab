import React, { useState } from "react";

// =================================================================================================
// --- DUMMY DATA ---
// =================================================================================================

const initialUser = {
  name: "Alex Johnson",
  title: "Computer Science Student",
  avatar: "https://placehold.co/100x100/3B82F6/FFFFFF?text=AJ",
  connections: 152,
  profileViews: 88,
};

const initialPosts = [
  {
    id: 1,
    author: {
      name: "Dr. Sarah Chen",
      title: "CTO @ Innovate Solutions",
      avatar: "https://placehold.co/100x100/3B82F6/FFFFFF?text=SC",
    },
    timestamp: "8h ago",
    content:
      "Just wrapped up a guide on navigating technical interviews for senior roles, focusing on system design. It covers common pitfalls and a framework for structuring your answers. Hope this helps some of you preparing for that next big step! #interviewprep #systemdesign",
    document: { name: "Senior_Tech_Interview_Guide.pdf", size: "1.2MB" },
    likes: 125,
    comments: 42,
  },
  {
    id: 2,
    author: {
      name: "Emily Watson",
      title: "UX Design Lead @ Creative Minds",
      avatar: "https://placehold.co/100x100/14B8A6/FFFFFF?text=EW",
    },
    timestamp: "1d ago",
    content:
      "Thrilled to share my interview experience with a major tech firm for a UX Lead position! The process was intense but incredibly rewarding. Key takeaway: your portfolio is your story, make sure every project narrative is compelling and clear. Happy to answer questions in the comments!",
    image:
      "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop",
    likes: 230,
    comments: 78,
  },
  {
    id: 3,
    author: {
      name: "Marcus Williams",
      title: "Founder & CEO @ EcoInnovate",
      avatar: "https://placehold.co/100x100/10B981/FFFFFF?text=MW",
    },
    timestamp: "2d ago",
    content:
      "We're hosting a virtual alumni meetup next month to discuss 'Sustainability in Tech'. It's a great chance to network and explore how we can innovate for a greener future. Link to register is in my bio! #sustainability #alumnimeetup #greentech",
    likes: 150,
    comments: 33,
  },
  {
    id: 4,
    author: {
      name: "James Rodriguez",
      title: "Investment Director @ VCP",
      avatar: "https://placehold.co/100x100/1E3A8A/FFFFFF?text=JR",
    },
    timestamp: "2d ago",
    content:
      "For all the finance students out there, I've compiled a list of essential valuation techniques that are frequently tested in investment banking interviews. Don't just memorize them, understand the 'why' behind each method. #finance #investmentbanking #careers",
    likes: 98,
    comments: 21,
  },
  {
    id: 5,
    author: {
      name: "David Lee",
      title: "Senior Software Engineer @ DataStream",
      avatar: "https://placehold.co/100x100/475569/FFFFFF?text=DL",
    },
    timestamp: "3d ago",
    content:
      "Excited to share that I've accepted a new role as a Staff Engineer! Huge thanks to this community for the resources and interview prep tips. The guide on system design shared by Dr. Chen was particularly helpful. Keep pushing forward, everyone! #newjob #careergoals",
    likes: 312,
    comments: 65,
  },
  {
    id: 6,
    author: {
      name: "Alex Johnson",
      title: "Computer Science Student",
      avatar: "https://placehold.co/100x100/3B82F6/FFFFFF?text=AJ",
    },
    timestamp: "4d ago",
    content:
      "Question for the experienced software engineers here: What's one non-technical skill you believe has been most crucial to your career growth? Trying to look beyond the code. #softskills #careeradvice",
    likes: 75,
    comments: 55,
  },
  {
    id: 7,
    author: {
      name: "Dr. Priya Patel",
      title: "Senior Research Director @ BioPharma",
      avatar: "https://placehold.co/100x100/0EA5E9/FFFFFF?text=PP",
    },
    timestamp: "5d ago",
    content:
      "Our team just published a new paper on advancements in CRISPR technology. It's a culmination of two years of hard work. Sharing the abstract here for anyone interested in the biotech space. #biotechnology #research #crispr",
    document: { name: "CRISPR_Advancements_Abstract.pdf", size: "450KB" },
    likes: 180,
    comments: 29,
  },
  {
    id: 8,
    author: {
      name: "Michael Brown",
      title: "Data Scientist @ QuantumLeap",
      avatar: "https://placehold.co/100x100/F59E0B/FFFFFF?text=MB",
    },
    timestamp: "6d ago",
    content:
      "What's everyone's favorite Python library for data visualization? I'm a big fan of Plotly for its interactivity, but Matplotlib is the old reliable. Curious to hear other perspectives! #datascience #python #dataviz",
    likes: 95,
    comments: 48,
  },
];

// =================================================================================================
// --- SVG ICONS ---
// =================================================================================================

const LikeIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 mr-2 transition-colors ${filled ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.562 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
  </svg>
);
const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2 text-gray-500 hover:text-blue-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
      clipRule="evenodd"
    />
  </svg>
);
const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2 text-gray-500 hover:text-blue-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
  </svg>
);
const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2 text-blue-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

// =================================================================================================
// --- REUSABLE UI COMPONENTS ---
// =================================================================================================

const ProfileCard = ({ user }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
    <div className="h-20 bg-blue-500"></div>
    <div className="p-4 pt-0 text-center">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-20 h-20 rounded-full mx-auto -mt-10 border-4 border-white"
      />
      <h3 className="text-lg font-bold mt-2">{user.name}</h3>
      <p className="text-sm text-gray-500">{user.title}</p>
    </div>
    <div className="border-t border-gray-100 p-4 text-sm">
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-600">Connections</span>
        <span className="font-bold text-blue-600">{user.connections}</span>
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-600">Profile Views</span>
        <span className="font-bold text-blue-600">{user.profileViews}</span>
      </div>
    </div>
    <div className="border-t border-gray-100 p-4">
      <button className="w-full text-left text-sm font-semibold text-gray-700 hover:text-blue-600">
        My Posts
      </button>
      <button className="w-full text-left text-sm font-semibold text-gray-700 hover:text-blue-600 mt-2">
        Saved Items
      </button>
    </div>
  </div>
);

const NetworkSuggestionsCard = () => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mt-6">
    <h3 className="font-bold text-lg mb-3">People You May Know</h3>
    <ul className="space-y-4">
      {[
        {
          name: "David Lee",
          title: "Senior Software Engineer",
          avatar: "https://placehold.co/100x100/475569/FFFFFF?text=DL",
        },
        {
          name: "Emily Watson",
          title: "UX Design Lead",
          avatar: "https://placehold.co/100x100/14B8A6/FFFFFF?text=EW",
        },
        {
          name: "Marcus Williams",
          title: "Founder & CEO",
          avatar: "https://placehold.co/100x100/10B981/FFFFFF?text=MW",
        },
      ].map((person) => (
        <li key={person.name} className="flex items-center">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-grow">
            <p className="font-bold text-sm">{person.name}</p>
            <p className="text-xs text-gray-500">{person.title}</p>
          </div>
          <button className="text-blue-600 border border-blue-600 rounded-full px-3 py-1 text-sm font-semibold hover:bg-blue-50">
            +
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const UpcomingEventsCard = () => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mt-6">
    <h3 className="font-bold text-lg mb-3">Upcoming Events</h3>
    <ul className="space-y-3">
      {[
        { title: "Alumni Networking Night", date: "Oct 15, 2025" },
        { title: "Tech Talk: AI in 2026", date: "Nov 02, 2025" },
        { title: "Annual Alumni Gala", date: "Dec 10, 2025" },
      ].map((event) => (
        <li key={event.title}>
          <p className="font-semibold text-sm text-gray-800">{event.title}</p>
          <p className="text-xs text-gray-500">{event.date}</p>
        </li>
      ))}
    </ul>
  </div>
);

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6">
      <div className="flex items-start mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-bold text-gray-900">{post.author.name}</p>
          <p className="text-xs text-gray-500">
            {post.author.title} &bull; {post.timestamp}
          </p>
        </div>
      </div>
      <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="mt-4 rounded-lg w-full"
        />
      )}
      {post.document && (
        <a
          href="#"
          className="mt-4 flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
        >
          <DocumentIcon />
          <div>
            <p className="font-semibold text-sm text-blue-800">
              {post.document.name}
            </p>
            <p className="text-xs text-blue-600">{post.document.size}</p>
          </div>
        </a>
      )}
      <div className="flex justify-between items-center text-sm text-gray-500 mt-4 border-b border-gray-100 pb-2">
        <span>{likeCount.toLocaleString()} Likes</span>
        <span>{post.comments} Comments</span>
      </div>
      <div className="flex justify-around items-center pt-2">
        <button
          onClick={handleLike}
          className="flex items-center font-semibold text-gray-600 hover:text-blue-600 p-2 rounded-lg w-full justify-center transition-colors"
        >
          <LikeIcon filled={liked} /> Like
        </button>
        <button className="flex items-center font-semibold text-gray-600 hover:text-blue-600 p-2 rounded-lg w-full justify-center transition-colors">
          <CommentIcon /> Comment
        </button>
        <button className="flex items-center font-semibold text-gray-600 hover:text-blue-600 p-2 rounded-lg w-full justify-center transition-colors">
          <ShareIcon /> Share
        </button>
      </div>
    </div>
  );
};

const CreatePost = ({ onPostClick }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 flex items-center gap-4 mb-6">
    <img
      src={initialUser.avatar}
      alt="Your avatar"
      className="w-12 h-12 rounded-full"
    />
    <button
      onClick={onPostClick}
      className="flex-grow text-left bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-4 rounded-full transition-colors"
    >
      Start a post...
    </button>
  </div>
);

const PostModal = ({ user, setShowModal, setPosts }) => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = () => {
    if (postContent.trim() === "") return;
    const newPost = {
      id: Date.now(),
      author: { name: user.name, title: user.title, avatar: user.avatar },
      timestamp: "Just now",
      content: postContent,
      likes: 0,
      comments: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start z-50 p-4 pt-20"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Create a post</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600 text-3xl"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <textarea
            className="w-full h-40 border-none focus:ring-0 text-lg p-2"
            placeholder="What do you want to talk about?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!postContent.trim()}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

// =================================================================================================
// --- MAIN APP COMPONENT ---
// =================================================================================================
export default function Posts() {
  const [posts, setPosts] = useState(initialPosts);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-blue-50 pt-10 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-8">
              <ProfileCard user={initialUser} />
              <NetworkSuggestionsCard />
            </div>
          </aside>

          {/* Center Column (Main Feed) */}
          <main className="lg:col-span-2">
            <CreatePost onPostClick={() => setShowModal(true)} />
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </main>

          {/* Right Column */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                <h3 className="font-bold text-lg">Trending Topics</h3>
                <ul className="mt-2 text-sm space-y-2 text-blue-700 font-semibold">
                  <li>
                    <a href="#" className="hover:underline">
                      #InterviewExperiences
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      #ResumeTips
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      #CareerAdvice
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      #AlumniNetwork
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      #CampusNews
                    </a>
                  </li>
                </ul>
              </div>
              <UpcomingEventsCard />
            </div>
          </aside>
        </div>
      </div>
      {showModal && (
        <PostModal
          user={initialUser}
          setShowModal={setShowModal}
          setPosts={setPosts}
        />
      )}
    </div>
  );
}
