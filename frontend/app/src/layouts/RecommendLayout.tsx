import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const RecommendLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-10 font-['Poppins'] gradient-bg min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RecommendLayout;
