import { Routes, Route, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.js";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Recommendations from "../pages/Recommendations.jsx";
import JobPage from "../pages/JobPage.jsx";

// import MBTIQuiz from "../pages/MBTIQuiz.js";
import { useState } from "react";
import ResultsPage from "../pages/ResultsPage.js";
import HomePage from "../pages/HomePage.js";
import RecommendLayout from "../layouts/RecommendLayout.js";

//chatbot imports
import ChatWidget from "./ChatWidget.jsx";
import QuizPage from "../pages/QuizPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import AboutPage from "../pages/AboutPage.js";
import ContactPage from "../pages/ContactPage.js";

function AppWrapper() {
  const [page, setPage] = useState("home"); // 'home', 'quiz', 'results'
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  const handleQuizComplete = (type: string) => {
    setMbtiType(type);
    navigate("/results");
  };

  const handleRestart = () => {
    setMbtiType(null);
    navigate("/quiz");
  };

  const onSubmitFeedback = (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.log(`Complaint: ${data.name} , ${data.email}, ${data.message}`);
  };

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<HomePage onStartQuiz={handleStartQuiz} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/contact"
            element={<ContactPage onSubmitFeedback={onSubmitFeedback} />}
          />
          <Route
            path="/quiz"
            element={<QuizPage onComplete={handleQuizComplete} />}
          />
          <Route
            path="/results"
            element={<ResultsPage type={mbtiType} onRestart={handleRestart} />}
          />
        </Route>

        <Route element={<RecommendLayout />}>
          <Route path="/recommended" element={<Recommendations />} />
          <Route path="/job" element={<JobPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* Add more routes here */}
      </Routes>
      {/* persistent chat widget (stays mounted across navigation) */}
      <ChatWidget />
    </>
  );
}

export default AppWrapper;
