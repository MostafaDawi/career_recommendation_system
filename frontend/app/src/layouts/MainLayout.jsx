import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <main className="pt-20 px-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
