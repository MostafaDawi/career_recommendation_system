import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/hooks";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [auth, setAuth] = useState(isAuthenticated);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                to="/recommended"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Recommendations
              </Link>
              <Link
                to="/quiz"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Quiz
              </Link>
              <Link
                href="#testimonials"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Testimonials
              </Link>
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
              <button
                onClick={logoutHandler}
                id="logout-button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log out
              </button>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center justify-between px-4 py-2 sm:hidden">
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
        <div className="flex items-center justify-between px-4 py-3 border-b">
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
          <a
            href="#testimonials"
            onClick={closeDrawer}
            className="text-gray-700 hover:text-indigo-600"
          >
            Testimonials
          </a>
          {!auth ? (
            <Link to="/login" onClick={closeDrawer}>
              <button className="mt-4 px-4 py-2 w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                Log in
              </button>
            </Link>
          ) : (
            <button
              onClick={logoutHandler}
              className="mt-4 px-4 py-2 w-full text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded-md"
            >
              Log out
            </button>
          )}
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
