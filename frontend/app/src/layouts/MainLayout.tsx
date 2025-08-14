import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/common/CookieConsent.js";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" className="mt-15" />
      <main className="bg-gray-50 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
};

export default MainLayout;
