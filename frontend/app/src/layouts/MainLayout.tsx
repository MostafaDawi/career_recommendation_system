import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MBTIQuiz from "../pages/MBTIQuiz.js";
import ResultsPage from "../pages/ResultsPage.js";
import HomePage from "../pages/HomePage.js";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">{renderPage()}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
