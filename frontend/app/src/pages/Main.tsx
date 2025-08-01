import React, { useState, useEffect } from "react";

// Define Prop Types for Components
interface HomePageProps {
  onStartQuiz: () => void;
}

interface MBTIQuizProps {
  onComplete: (type: string) => void;
}

interface ResultsPageProps {
  type: string | null;
  onRestart: () => void;
}

// --- SVG Icon Components ---
const LightningBoltIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-indigo-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="h-6 w-6 text-green-500"
    xmlns="http://www.w3.org/2000/svg"
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
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-yellow-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-indigo-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-indigo-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-indigo-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const BeakerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-indigo-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  </svg>
);

// Main App Component
const App = () => {
  const [page, setPage] = useState("home"); // 'home', 'quiz', 'results'
  const [mbtiType, setMbtiType] = useState<string | null>(null);

  const handleStartQuiz = () => {
    setPage("quiz");
  };

  const handleQuizComplete = (type: string) => {
    setMbtiType(type);
    setPage("results");
  };

  const handleRestart = () => {
    setMbtiType(null);
    setPage("home");
  };

  const renderPage = () => {
    switch (page) {
      case "quiz":
        return <MBTIQuiz onComplete={handleQuizComplete} />;
      case "results":
        return <ResultsPage type={mbtiType} onRestart={handleRestart} />;
      case "home":
      default:
        return <HomePage onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-['Poppins',_sans-serif] text-slate-800 flex flex-col">
      <Header onStartQuiz={handleStartQuiz} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
};

// --- Page Components ---

const Header: React.FC<{ onStartQuiz: () => void }> = ({ onStartQuiz }) => (
  <nav className="bg-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div
          className="flex-shrink-0 flex items-center cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl">
            CC
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-900">
            CareerCompass AI
          </span>
        </div>
        <div className=" md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a
              href="#features"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#assessment"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Assessment
            </a>
            <a
              href="#careers"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Careers
            </a>
            <a
              href="#testimonials"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Testimonials
            </a>
          </div>
        </div>
        <div>
          <button
            onClick={onStartQuiz}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl">
              CC
            </div>
            <span className="ml-3 text-xl font-semibold text-white">
              CareerCompass AI
            </span>
          </div>
          <p className="mb-4">
            Your personalized career navigator powered by artificial
            intelligence.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2">
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li className="mb-2">
              <a href="#assessment" className="hover:text-white">
                Assessment
              </a>
            </li>
            <li className="mb-2">
              <a href="#careers" className="hover:text-white">
                Careers
              </a>
            </li>
            <li className="mb-2">
              <a href="#testimonials" className="hover:text-white">
                Testimonials
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p>contact@careercompass.ai</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} CareerCompass AI. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
);

// Home Page Component
const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => (
  <>
    <style>{`
            .gradient-bg { background: linear-gradient(135deg, #4F46E5 0%, #10B981 100%); }
            .career-card { transition: all 0.3s ease; border-left: 4px solid #4F46E5; }
            .career-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); }
            .floating-ai { animation: float 6s ease-in-out infinite; }
            @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
            .skill-pill { transition: all 0.2s ease; }
            .skill-pill:hover { transform: scale(1.05); background-color: #4F46E5; color: white; }
        `}</style>
    <HeroSection onStartQuiz={onStartQuiz} />
    <StatsSection />
    <FeaturesSection />
    <AssessmentSection onStartQuiz={onStartQuiz} />
    <CareersSection />
    <TestimonialsSection />
    <FAQSection />
    <CTASection onStartQuiz={onStartQuiz} />
  </>
);

// --- Home Page Sections ---

const HeroSection: React.FC<HomePageProps> = ({ onStartQuiz }) => (
  <section className="gradient-bg text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your AI-Powered Career Navigator
          </h1>
          <p className="text-xl mb-8">
            Personalized career recommendations powered by artificial
            intelligence to help you find your perfect career path.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={onStartQuiz}
              className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
            >
              Start Free Assessment
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
              How It Works
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative floating-ai">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/754edd76-1066-4a61-8bfc-3f52912a7ff7.png"
              alt="AI interface with career paths"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <LightningBoltIcon />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">AI Analysis</p>
                  <p className="font-semibold text-gray-900">Processing...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="bg-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <h3 className="text-4xl font-bold text-indigo-600 mb-2">97%</h3>
          <p className="text-gray-600">Accuracy rate in career matching</p>
        </div>
        <div className="p-6 md:border-l md:border-r border-gray-200">
          <h3 className="text-4xl font-bold text-green-500 mb-2">10K+</h3>
          <p className="text-gray-600">Career paths analyzed</p>
        </div>
        <div className="p-6">
          <h3 className="text-4xl font-bold text-blue-500 mb-2">85%</h3>
          <p className="text-gray-600">Users report higher job satisfaction</p>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      title: "Skill Analysis",
      description:
        "Our AI evaluates your current skills, strengths, and competencies to match you with careers that align with your abilities.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      color: "indigo",
    },
    {
      title: "Industry Trends",
      description:
        "We incorporate real-time labor market data and emerging industry trends into our recommendations.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      color: "green",
    },
    {
      title: "Personality Fit",
      description:
        "By understanding your personality traits, we suggest careers where you're likely to thrive and be fulfilled.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      color: "blue",
    },
  ];
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How CareerCompass AI Helps You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced AI analyzes multiple dimensions of your profile to
            provide the most accurate career recommendations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-xl shadow-md career-card"
            >
              <div
                className={`w-14 h-14 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AssessmentSection: React.FC<HomePageProps> = ({ onStartQuiz }) => (
  <section id="assessment" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:flex items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Take Our AI-Powered Career Assessment
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our 15-minute assessment evaluates your skills, interests, values,
            and personality to recommend the best career paths for you.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <CheckIcon />
              </div>
              <p className="ml-3 text-gray-700">
                Personalized career recommendations
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <CheckIcon />
              </div>
              <p className="ml-3 text-gray-700">Detailed skill gap analysis</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <CheckIcon />
              </div>
              <p className="ml-3 text-gray-700">
                Actionable career development plan
              </p>
            </li>
          </ul>
          <button
            onClick={onStartQuiz}
            className="bg-indigo-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Start Free Assessment
          </button>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-gray-50 p-8 rounded-xl lg:ml-8">
            <h3 className="text-xl font-semibold text-center text-gray-800">
              Preview the Experience
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CareersSection = () => {
  const careers = [
    {
      name: "AI Engineer",
      growth: "High Growth",
      rating: 4.8,
      reviews: "1.2K",
      salary: "$120K - $180K",
      match: 85,
      description:
        "Develop intelligent systems and algorithms that can learn and make decisions.",
      skills: ["Machine Learning", "Python", "Data Science"],
      image:
        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bfb5a547-c706-42fd-88d9-19768f993bfb.png",
      color: "indigo",
    },
    {
      name: "UX Designer",
      growth: "Creative",
      rating: 4.7,
      reviews: "890",
      salary: "$85K - $140K",
      match: 70,
      description:
        "Create intuitive and engaging user experiences for digital products.",
      skills: ["User Research", "Prototyping", "Figma"],
      image:
        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/acb9488d-7926-4f23-8217-c89c032ba2cf.png",
      color: "blue",
    },
    {
      name: "Digital Marketer",
      growth: "Versatile",
      rating: 4.5,
      reviews: "760",
      salary: "$65K - $120K",
      match: 50,
      description:
        "Develop and implement online marketing strategies across various digital channels.",
      skills: ["SEO", "Content Marketing", "Social Media"],
      image:
        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5ddc1223-29bd-4059-ad1d-37d67dd5c65a.png",
      color: "purple",
    },
  ];
  return (
    <section id="careers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Career Paths
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover careers matched to your profile with detailed information
            about each path.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career) => (
            <div
              key={career.name}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <img
                src={career.image}
                alt={`Office for ${career.name}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {career.name}
                  </h3>
                  <span
                    className={`bg-${career.color}-100 text-${career.color}-800 text-xs font-medium px-2 py-1 rounded-full`}
                  >
                    {career.growth}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <StarIcon />
                  <span className="ml-1 text-gray-600">
                    {career.rating} ({career.reviews} reviews)
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  {career.description}
                </p>
                <button
                  className={`w-full bg-${career.color}-600 hover:bg-${career.color}-700 text-white py-2 rounded-md transition duration-300`}
                >
                  View Career Path
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Instructional Designer",
      text: "After 8 years as a teacher, I felt stuck. CareerCompass AI showed me how my skills could transfer to instructional design. Now I have a career I love with better pay and work-life balance!",
      image:
        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/723ede9e-61d4-4937-9c8b-ba78d7a98ef3.png",
    },
    {
      name: "Mark Chen",
      role: "Data Analyst",
      text: "I was an accountant who felt bored with my job. CareerCompass AI identified data analysis as a perfect fit. Their recommended upskilling path helped me transition smoothly into a more engaging career.",
      image:
        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e9b37cdd-01eb-4447-b031-3e5ce3359bdb.png",
    },
    {
      name: "Priya Patel",
      role: "Project Manager",
      text: "As a retail manager, I didn't realize how many transferable skills I had. CareerCompass AI matched me with project management roles where I've thrived. I doubled my salary in just two years!",
      image:
        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7f6b07a9-f984-4580-b98b-bdf61b68c157.png",
    },
  ];
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from professionals who found their ideal career path with
            CareerCompass AI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src={t.image}
                  alt={`Portrait of ${t.name}`}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-gray-700 italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  // Basic accordion functionality can be added with state
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-600">
            Answers to common questions will be displayed here.
          </p>
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC<HomePageProps> = ({ onStartQuiz }) => (
  <section className="gradient-bg text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Ready to Discover Your Ideal Career Path?
      </h2>
      <p className="text-xl mb-10 max-w-3xl mx-auto">
        Take the first step toward a more fulfilling career with our free
        AI-powered assessment.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <button
          onClick={onStartQuiz}
          className="bg-white text-indigo-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
        >
          Start Free Assessment
        </button>
        <button className="border border-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
          View Demo
        </button>
      </div>
    </div>
  </section>
);

// --- Quiz and Results Components ---

const quizQuestions = [
  {
    type: "choice",
    question: "You're at a party. Where are you most likely to be found?",
    options: [
      {
        text: "In the middle of the action, chatting with many people.",
        type: "E",
        icon: <UsersIcon />,
      },
      {
        text: "On the quiet edges, in a deep conversation with one person.",
        type: "I",
        icon: <UserIcon />,
      },
    ],
  },
  {
    type: "slider",
    question: "How do you recharge your energy?",
    labels: { left: "Quiet time alone", right: "Being with others" },
    types: { left: "I", right: "E" },
  },
  {
    type: "choice",
    question: "When approaching a problem, you tend to:",
    options: [
      {
        text: "Focus on the concrete details and facts at hand.",
        type: "S",
        icon: <BeakerIcon />,
      },
      {
        text: "Look at the big picture and imagine future possibilities.",
        type: "N",
        icon: <BookOpenIcon />,
      },
    ],
  },
  {
    type: "slider",
    question: "You are more interested in...",
    labels: { left: "What is actual", right: "What is possible" },
    types: { left: "S", right: "N" },
  },
  {
    type: "choice",
    question: "When making a decision, what's more important?",
    options: [
      {
        text: "Objective logic and fair principles.",
        type: "T",
        icon: <UsersIcon />,
      },
      {
        text: "How it will affect the people involved.",
        type: "F",
        icon: <UserIcon />,
      },
    ],
  },
  {
    type: "slider",
    question: "Your decision-making is guided by your...",
    labels: { left: "Head", right: "Heart" },
    types: { left: "T", right: "F" },
  },
  {
    type: "choice",
    question: "Your ideal vacation is:",
    options: [
      {
        text: "A well-planned itinerary with scheduled activities.",
        type: "J",
        icon: <BeakerIcon />,
      },
      {
        text: "A spontaneous trip with room for exploration.",
        type: "P",
        icon: <BookOpenIcon />,
      },
    ],
  },
  {
    type: "slider",
    question: "You prefer your work style to be...",
    labels: { left: "Structured & scheduled", right: "Flexible & adaptable" },
    types: { left: "J", right: "P" },
  },
];

const MBTIQuiz: React.FC<MBTIQuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });
  const [sliderValue, setSliderValue] = useState(50);
  const [isExiting, setIsExiting] = useState(false);

  const advanceQuestion = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSliderValue(50); // Reset slider for next question
        setIsExiting(false);
      } else {
        calculateResult();
      }
    }, 400);
  };

  const handleChoiceAnswer = (type: string) => {
    setAnswers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    advanceQuestion();
  };

  const handleSliderSubmit = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestion.type !== "slider") return;

    const { left, right } = currentQuestion.types;
    const value = sliderValue;

    const rightScore = value / 100;
    const leftScore = (100 - value) / 100;

    setAnswers((prev) => ({
      ...prev,
      [left]: prev[left] + leftScore * 2, // Give slider answers more weight
      [right]: prev[right] + rightScore * 2,
    }));
    advanceQuestion();
  };

  const calculateResult = () => {
    let result = "";
    result += answers.E > answers.I ? "E" : "I";
    result += answers.S > answers.N ? "S" : "N";
    result += answers.T > answers.F ? "T" : "F";
    result += answers.J > answers.P ? "J" : "P";
    onComplete(result);
  };

  if (currentQuestionIndex >= quizQuestions.length) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md mx-auto my-12">
        <h3 className="text-2xl font-bold mb-4">
          Analyzing your personality...
        </h3>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex / quizQuestions.length) * 100;

  const questionContainerClass = `transition-all duration-300 ${
    isExiting
      ? "opacity-0 transform -translate-x-8"
      : "opacity-100 transform translate-x-0"
  }`;

  return (
    <div className="flex items-center justify-center py-12 px-4 bg-gray-100 min-h-[calc(100vh-128px)]">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 overflow-hidden">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-600">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-bold text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-green-400 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className={questionContainerClass}>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center">
            {currentQuestion.question}
          </h3>

          {currentQuestion.type === "choice" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceAnswer(option.type)}
                  className="group w-full text-center p-6 bg-slate-100 rounded-lg hover:bg-indigo-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 text-indigo-500 group-hover:text-white transition-colors">
                      {option.icon}
                    </div>
                    <p className="text-lg text-slate-700 group-hover:text-white transition-colors">
                      {option.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === "slider" && (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-slate-500 mb-2">
                  <span>{currentQuestion.labels.left}</span>
                  <span>{currentQuestion.labels.right}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <button
                onClick={handleSliderSubmit}
                className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const careerRecommendations: {
  [key: string]: { title: string; careers: string[]; description: string };
} = {
  ISTJ: {
    title: "The Inspector",
    description:
      "Practical and fact-minded individuals, whose reliability cannot be doubted.",
    careers: [
      "Accountant",
      "Auditor",
      "Systems Analyst",
      "Civil Engineer",
      "Dentist",
    ],
  },
  ISFJ: {
    title: "The Protector",
    description:
      "Very dedicated and warm protectors, always ready to defend their loved ones.",
    careers: ["Nurse", "Teacher", "Social Worker", "Librarian", "HR Manager"],
  },
  INFJ: {
    title: "The Advocate",
    description:
      "Quiet and mystical, yet very inspiring and tireless idealists.",
    careers: [
      "Counselor",
      "Psychologist",
      "Writer",
      "Graphic Designer",
      "HR Development Trainer",
    ],
  },
  INTJ: {
    title: "The Architect",
    description:
      "Imaginative and strategic thinkers, with a plan for everything.",
    careers: [
      "Scientist",
      "Engineer",
      "Professor",
      "Strategic Planner",
      "Software Developer",
    ],
  },
  ISTP: {
    title: "The Crafter",
    description:
      "Bold and practical experimenters, masters of all kinds of tools.",
    careers: [
      "Mechanic",
      "Pilot",
      "Forensic Scientist",
      "Paramedic",
      "Software Engineer",
    ],
  },
  ISFP: {
    title: "The Artist",
    description:
      "Flexible and charming artists, always ready to explore and experience something new.",
    careers: ["Artist", "Musician", "Fashion Designer", "Veterinarian", "Chef"],
  },
  INFP: {
    title: "The Mediator",
    description:
      "Poetic, kind and altruistic people, always eager to help a good cause.",
    careers: [
      "Writer",
      "Counselor",
      "Graphic Designer",
      "Physical Therapist",
      "Non-profit Work",
    ],
  },
  INTP: {
    title: "The Thinker",
    description:
      "Innovative inventors with an unquenchable thirst for knowledge.",
    careers: [
      "Physicist",
      "Mathematician",
      "Computer Programmer",
      "Philosopher",
      "Economist",
    ],
  },
  ESTP: {
    title: "The Persuader",
    description:
      "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
    careers: [
      "Entrepreneur",
      "Sales Representative",
      "Paramedic",
      "Detective",
      "Financial Advisor",
    ],
  },
  ESFP: {
    title: "The Performer",
    description:
      "Spontaneous, energetic and enthusiastic people – life is never boring around them.",
    careers: [
      "Entertainer",
      "Event Planner",
      "Salesperson",
      "Tour Guide",
      "Flight Attendant",
    ],
  },
  ENFP: {
    title: "The Champion",
    description:
      "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
    careers: [
      "Journalist",
      "Actor",
      "Entrepreneur",
      "Marketing Manager",
      "Teacher",
    ],
  },
  ENTP: {
    title: "The Debater",
    description:
      "Smart and curious thinkers who cannot resist an intellectual challenge.",
    careers: [
      "Lawyer",
      "Entrepreneur",
      "Consultant",
      "Venture Capitalist",
      "Political Analyst",
    ],
  },
  ESTJ: {
    title: "The Director",
    description:
      "Excellent administrators, unsurpassed at managing things – or people.",
    careers: [
      "Manager",
      "Military Officer",
      "Judge",
      "Financial Officer",
      "School Administrator",
    ],
  },
  ESFJ: {
    title: "The Caregiver",
    description:
      "Extraordinarily caring, social and popular people, always eager to help.",
    careers: [
      "Teacher",
      "Nurse",
      "Event Coordinator",
      "Social Worker",
      "Account Manager",
    ],
  },
  ENFJ: {
    title: "The Protagonist",
    description:
      "Charismatic and inspiring leaders, able to mesmerize their listeners.",
    careers: [
      "Teacher",
      "Diplomat",
      "Sales Manager",
      "PR Specialist",
      "Life Coach",
    ],
  },
  ENTJ: {
    title: "The Commander",
    description:
      "Bold, imaginative and strong-willed leaders, always finding a way – or making one.",
    careers: [
      "CEO",
      "Business Executive",
      "Lawyer",
      "University Professor",
      "Consultant",
    ],
  },
};

const ResultsPage: React.FC<ResultsPageProps> = ({ type, onRestart }) => {
  if (!type || !careerRecommendations[type]) {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p className="text-slate-600 mb-6">
            Something went wrong. Please try again.
          </p>
          <button
            onClick={onRestart}
            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const { title, careers, description } = careerRecommendations[type];

  return (
    <div className="min-h-[calc(100vh-128px)] bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 text-center transform transition-all duration-500 scale-95 opacity-0 animate-fade-in-up">
        <style>{`
                    @keyframes fade-in-up {
                        0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                        100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
                `}</style>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Your Personality Type is:
        </h2>
        <div className="my-4">
          <span className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-indigo-500 py-2">
            {type}
          </span>
        </div>
        <p className="text-2xl text-slate-600 font-semibold mb-4">{title}</p>
        <p className="max-w-2xl mx-auto text-slate-500 mb-8">{description}</p>

        <div className="bg-slate-50 rounded-lg p-6 my-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-5">
            Recommended Career Paths
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {careers.map((career, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-800 text-md font-semibold px-4 py-2 rounded-full transition-transform duration-200 hover:scale-110 hover:bg-indigo-200"
              >
                {career}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Take the Quiz Again
        </button>
      </div>
    </div>
  );
};

export default App;
