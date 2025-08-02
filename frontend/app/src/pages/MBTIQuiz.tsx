import { useState } from "react";

interface MBTIQuizProps {
  onComplete: (type: string) => void;
}

// --- SVG Icon Components ---
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
    <div className="flex items-center justify-center py-12 px-4 bg-gray-100 min-h-screen">
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

export default MBTIQuiz;
