import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const RecommendLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 font-['Poppins'] bg-gradient-to-br from-white via-f8fafc via-e2e8f0 to-indigo-400 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RecommendLayout;
