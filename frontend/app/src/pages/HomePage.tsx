interface HomePageProps {
  onStartQuiz: () => void;
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
  <section className="gradient-bg text-white py-25">
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
              src="https://img.freepik.com/premium-vector/people-with-recommendation-vector-concept_118813-16990.jpg"
              alt="career guidance"
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

// REMOVE THIS SECTION
// REPLACED WITH THE CHATBOT
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

export default HomePage;
