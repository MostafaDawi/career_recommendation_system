import { useState, useCallback, useEffect } from "react";
import UsersIcon from "../components/icons/UsersIcon";
import UserIcon from "../components/icons/UserIcon";
import BeakerIcon from "../components/icons/BeakerIcon";
import BookOpenIcon from "../components/icons/BookOpenIcon";

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

const useMBTIQuiz = (onComplete) => {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    answers: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    sliderValue: 50,
    isExiting: false,
  });

  const { currentQuestionIndex, answers, sliderValue, isExiting } = quizState;
  const isQuizComplete = currentQuestionIndex >= quizQuestions.length;

  const calculateResult = useCallback(() => {
    let result = "";
    result += answers.E > answers.I ? "E" : "I";
    result += answers.S > answers.N ? "S" : "N";
    result += answers.T > answers.F ? "T" : "F";
    result += answers.J > answers.P ? "J" : "P";
    onComplete(result);
  }, [answers, onComplete]);

  const advanceQuiz = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setQuizState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        sliderValue: 50,
        isExiting: false,
      }));
    } else {
      calculateResult();
    }
  }, [currentQuestionIndex, calculateResult, quizQuestions.length]);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        advanceQuiz();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isExiting, advanceQuiz]);

  const handleChoiceAnswer = useCallback((type) => {
    setQuizState((prevState) => ({
      ...prevState,
      answers: { ...prevState.answers, [type]: prevState.answers[type] + 1 },
      isExiting: true,
    }));
  }, []);

  const handleSliderSubmit = useCallback(() => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestion.type !== "slider") return;

    const { left, right } = currentQuestion.types;
    const rightScore = sliderValue / 100;
    const leftScore = (100 - sliderValue) / 100;

    setQuizState((prevState) => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [left]: prevState.answers[left] + leftScore * 2,
        [right]: prevState.answers[right] + rightScore * 2,
      },
      isExiting: true,
    }));
  }, [currentQuestionIndex, sliderValue]);

  const progress = (currentQuestionIndex / quizQuestions.length) * 100;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionContainerClass = `transition-all duration-300 ${
    isExiting
      ? "opacity-0 transform -translate-x-8"
      : "opacity-100 transform translate-x-0"
  }`;

  return {
    currentQuestion,
    currentQuestionIndex,
    quizLength: quizQuestions.length,
    progress,
    questionContainerClass,
    sliderValue,
    setSliderValue: (value) =>
      setQuizState((prevState) => ({ ...prevState, sliderValue: value })),
    handleChoiceAnswer,
    handleSliderSubmit,
    isQuizComplete,
  };
};

export default useMBTIQuiz;
