import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" className="mt-15" />
      <main className="pt-8 px-6 gradient-bg">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
