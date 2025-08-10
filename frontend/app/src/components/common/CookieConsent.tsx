import React, { useState, useEffect } from "react";

// Helper functions for managing cookies
const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!getCookie("cookie-consent")) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookie-consent", "true", 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50 transition-transform duration-300 transform translate-y-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-sm text-center md:text-left">
          We use cookies to ensure you get the best experience on our website.
          By using our site, you agree to our use of cookies.
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 ml-2 underline"
          >
            Learn more
          </a>
        </p>
        <button
          onClick={handleAccept}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md w-full md:w-auto"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
