import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/WelcomePage";
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Wrapper to access route info and conditionally show navbar
function AppWrapper() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Add more routes here */}
      </Routes>
    </>
  );
}

export default AppWrapper;
