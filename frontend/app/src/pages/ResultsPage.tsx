interface ResultsPageProps {
  type: string | null;
  onRestart: () => void;
}

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
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

export default ResultsPage;
