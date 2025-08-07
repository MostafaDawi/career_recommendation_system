import { Routes, Route, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.js";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Recommendations from "../pages/Recommendations.jsx";
import MBTIQuiz from "../pages/MBTIQuiz.js";
import { useState } from "react";
import ResultsPage from "../pages/ResultsPage.js";
import HomePage from "../pages/HomePage.js";
import RecommendLayout from "../layouts/RecommendLayout.js";

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

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/quiz"
            element={<MBTIQuiz onComplete={handleQuizComplete} />}
          />
          <Route
            path="/results"
            element={<ResultsPage type={mbtiType} onRestart={handleRestart} />}
          />
          <Route
            path="/"
            element={<HomePage onStartQuiz={handleStartQuiz} />}
          />
        </Route>

        <Route element={<RecommendLayout />}>
          <Route path="/recommended" element={<Recommendations />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Add more routes here */}
      </Routes>
    </>
  );
}

export default AppWrapper;
