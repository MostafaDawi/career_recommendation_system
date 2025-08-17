import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/hooks";
import { Menu, X } from "lucide-react";
import UserProfileIcon from "./icons/UserProfileIcon";
import { getToken } from "../utils/auth";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [auth, setAuth] = useState(isAuthenticated);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenDashboard, setOpenDashboard] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const burgerMenu = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDashboard(false);
      }
      if (burgerMenu.current && !burgerMenu.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check authentication
  useEffect(() => {
    setAuth(isAuthenticated);
  }, [isAuthenticated]);

  const logoutHandler = () => {
    logout();
    setAuth(false);
    setIsDrawerOpen(false);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    // <!-- Navigation -->
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link
              to="/"
              data-page="landing"
              className="flex-shrink-0 flex items-center"
            >
              <svg
                className="h-8 w-8 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">
                CareerCompass AI
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/job"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Jobs
              </Link>
              <Link
                to="/contact"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>

              {/* Dropdown Trigger */}
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpenDashboard(!isOpenDashboard)}
                    className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition"
                  >
                    Menu{"  "}
                    <svg
                      viewBox="0 0 20 20"
                      className={`h-4 w-4 transition-transform ${
                        isOpenDashboard ? "rotate-180" : ""
                      }`}
                      fill="currentColor"
                    >
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 mt-2 w-52 p-2 bg-white rounded-sm shadow-lg border border-gray-200 transform transition duration-300 ${
                      isOpenDashboard
                        ? "opacity-100 scale-y-100 translate-y-2 pointer-events-auto"
                        : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                    } origin-top`}
                  >
                    <ul className="py-1 text-gray-700">
                      <Link to="/recommended">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Recommended Jobs
                        </li>
                      </Link>
                      <Link to="/quiz">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Personality Test
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Start Assessment
                </Link>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center">
            {!auth ? (
              <Link to="/login">
                <button
                  id="login-button"
                  data-page="login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </Link>
            ) : (
              <div className="flex gap-2 items-center">
                <div className="relative inline-block text-left" ref={menuRef}>
                  {/* Icon Button */}
                  <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition border border-black-10"
                  >
                    <UserProfileIcon className="w-8 h-8 text-gray-700" />
                  </button>
                  {/* Dropdown Menu */}
                  <div
                    className={`absolute -right-5 mt-2 w-48 bg-white rounded-lg shadow-lg px-2 border border-gray-200 transform-gpu transition duration-300 ease-in-out ${
                      open
                        ? "opacity-100 translate-y-2 scale-100 pointer-events-auto"
                        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                    }`}
                  >
                    <ul className="py-2 text-sm text-gray-700">
                      <Link to="/profile">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Profile
                        </li>
                      </Link>

                      <div className="flex flex-col cursor-pointer">
                        <Link
                          to="/change_password"
                          onClick={closeDrawer}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Change Password
                        </Link>
                      </div>
                      <li
                        onClick={logoutHandler}
                        className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="font-bold">{user?.name}</div>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center justify-between px-4 py-2">
            <button
              onClick={() => setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          ref={burgerMenu}
        >
          <span className="text-lg font-semibold text-indigo-600">Menu</span>
          <button onClick={closeDrawer} className="text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            onClick={closeDrawer}
            className="text-gray-700 hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            to="/recommended"
            onClick={closeDrawer}
            className="text-gray-700 hover:text-indigo-600"
          >
            Recommendations
          </Link>
          <Link
            to="/quiz"
            onClick={closeDrawer}
            className="text-gray-700 hover:text-indigo-600"
          >
            Quiz
          </Link>
          <Link
            to="/job"
            onClick={closeDrawer}
            className="text-gray-700 hover:text-indigo-600"
          >
            Job
          </Link>
          {!auth ? (
            <Link to="/login" onClick={closeDrawer}>
              <button className="mt-4 px-4 py-2 w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                Log in
              </button>
            </Link>
          ) : (
            <div className="flex flex-col p-0 space-y-4">
              <Link
                to="/profile"
                onClick={closeDrawer}
                className="text-gray-700 hover:text-indigo-600"
              >
                Profile
              </Link>
              <div className="flex flex-col text-sm space-y-4">
                <Link
                  to="/change_password"
                  onClick={closeDrawer}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Change Password
                </Link>
                <Link
                  // to="/save_quiz"
                  onClick={closeDrawer}
                  className="text-gray-500 hover:text-indigo-600"
                >
                  Saved Tests (To Be Added Later)
                </Link>
              </div>

              <button
                onClick={logoutHandler}
                className="mt-4 px-4 py-2 w-full text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded-md"
              >
                Log out
              </button>
            </div>
          )}
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
