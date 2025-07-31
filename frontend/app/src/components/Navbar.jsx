import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    // <!-- Navigation -->
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="#"
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
            </a>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                href="#"
                data-page="landing"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="#how-it-works"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                How It Works
              </Link>
              <Link
                href="#features"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="nav-link border-transparent text-gray-600 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Testimonials
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/login">
              <button
                id="login-button"
                data-page="login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </Link>
            <div id="user-menu" className="hidden ml-3 relative">
              <div className="flex items-center">
                <span
                  id="user-name"
                  className="text-sm font-medium text-gray-700 mr-2"
                ></span>
                <button
                  id="logout-button"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
