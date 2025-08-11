import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/common/CookieConsent.js";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
};

export default MainLayout;
