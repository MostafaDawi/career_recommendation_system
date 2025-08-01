import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MBTIQuiz from "../pages/MBTIQuiz.js";
import ResultsPage from "../pages/ResultsPage.js";
import HomePage from "../pages/HomePage.js";

const MainLayout = () => {
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
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">{renderPage()}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
