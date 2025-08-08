import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <main className="pt-8 px-6 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
