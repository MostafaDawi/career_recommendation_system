import { useState } from "react";
import Header from "../components/Header";
import CareerCard from "../components/CareerCard";
import FloatingElements from "../components/FloatingElements";
import CareerModal from "../components/CareerModal";

const Recommendations = () => {
  const [openModal, setOpenModal] = useState(null);

  const careers = [
    {
      id: "fullstack",
      title: "Full Stack Developer",
      compatibility: "98%",
      description:
        "Build complete web applications from front-end to back-end. Perfect for your coding passion and problem-solving skills.",
      icon: (
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          ></path>
        </svg>
      ),
      isTopMatch: true,
      color: "from-purple-600 to-pink-500",
    },
    {
      id: "ux",
      title: "UX/UI Designer",
      compatibility: "85%",
      description:
        "Create beautiful and intuitive user experiences for millions of users worldwide. Perfect for creative problem-solvers.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
          ></path>
        </svg>
      ),
      isTopMatch: false,
      color: "from-pink-500 to-purple-600",
    },
    {
      id: "data",
      title: "Data Scientist",
      compatibility: "78%",
      description:
        "Unlock insights from data to drive business decisions and predict future trends. Ideal for analytical thinkers.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
      ),
      isTopMatch: false,
      color: "from-blue-500 to-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* خلفيات عناصر عائمة */}
      <FloatingElements />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* العنوان */}
        <Header />

        <div className="max-w-6xl mx-auto">
          {/* الوظائف المتطابقة الأعلى */}
          {careers
            .filter((career) => career.isTopMatch)
            .map((career) => (
              <div key={career.id} className="mb-12">
                <div className="text-center mb-6">
                  <span className="inline-flex items-center px-6 py-3 bg-yellow-400 text-yellow-900 rounded-full font-bold text-lg">
                    🏆 Perfect Match - {career.compatibility} Compatibility
                  </span>
                </div>
                <CareerCard
                  career={career}
                  onClick={() => setOpenModal(career.id)}
                  isTopMatch
                />
              </div>
            ))}

          {/* الوظائف الأخرى */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              Other Great Matches
            </h3>
            <p className="text-purple-600">
              Explore these alternative career paths that align with your skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {careers
              .filter((career) => !career.isTopMatch)
              .map((career) => (
                <CareerCard
                  key={career.id}
                  career={career}
                  onClick={() => setOpenModal(career.id)}
                />
              ))}
          </div>
        </div>

        {/* دعوة لاتخاذ إجراء */}
        <div className="text-center mt-16">
          <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              Ready to Start Your Journey? 🚀
            </h3>
            <p className="text-purple-700 text-lg">
              Your dream career is just one click away. Choose your path and
              begin building your future today!
            </p>
          </div>
        </div>
      </div>

      {/* نافذة المودال للوظيفة المفتوحة */}
      {openModal && (
        <CareerModal
          career={careers.find((c) => c.id === openModal)}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default Recommendations;
