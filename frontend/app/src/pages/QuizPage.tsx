import React, { useEffect, useRef } from "react";
import useMBTIQuiz from "../utils/useMBTIQuiz";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/hooks.js";
import { getToken } from "../utils/auth.js";

interface QuizPageProps {
  onComplete: (result: string) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ onComplete }) => {
  const {
    currentQuestion,
    currentQuestionIndex,
    quizLength,
    progress,
    questionContainerClass,
    sliderValue,
    setSliderValue,
    handleChoiceAnswer,
    handleSliderSubmit,
    isQuizComplete,
  } = useMBTIQuiz(onComplete);

  const quizRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isQuizComplete) {
      if (quizRef.current) {
        quizRef.current.classList.add("animate-quiz-out");
      }
    }
  }, [isQuizComplete]);

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading quiz...
      </div>
    );
  }

  const questionNumber = currentQuestionIndex + 1;

  return (
    <div
      ref={quizRef}
      className="bg-gray-100 min-h-screen flex flex-col items-center justify-center font-inter"
    >
      <div className="w-full max-w-2xl px-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-indigo-600">
                Question {questionNumber} of {quizLength}
              </span>
              <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 transition-opacity duration-500">
              {currentQuestion.question}
            </h2>
          </div>

          <div className={`space-y-4 ${questionContainerClass}`}>
            {currentQuestion.type === "choice" &&
              currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceAnswer(option.type)}
                  className="w-full p-4 bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-lg flex items-center transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex-shrink-0 text-indigo-500 mr-4">
                    {option.icon}
                  </span>
                  <span className="text-gray-800 font-medium text-left">
                    {option.text}
                  </span>
                </button>
              ))}

            {currentQuestion.type === "slider" && (
              <div className="flex flex-col items-center">
                <div className="flex justify-between w-full mb-4 text-gray-600 font-medium">
                  <span>{currentQuestion.labels.left}</span>
                  <span>{currentQuestion.labels.right}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer range-lg"
                />
                <button
                  onClick={handleSliderSubmit}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
