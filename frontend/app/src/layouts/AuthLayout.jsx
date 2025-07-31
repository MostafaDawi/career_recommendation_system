import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="pt-20 px-6 bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
