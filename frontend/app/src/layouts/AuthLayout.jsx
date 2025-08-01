import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-6 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
