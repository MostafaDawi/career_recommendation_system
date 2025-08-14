import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

// Utility function to calculate password strength
const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return Math.min(strength, 5);
};

const ChangePassword = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Effect to update password strength and confirm password match
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setPasswordStrength(calculatePasswordStrength(newPassword));
      setPasswordsMatch(newPassword === confirmPassword);
    }
  }, [newPassword, confirmPassword, token]);

  const togglePasswordVisibility = (setter, state) => () => setter(!state);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setErrorMessage("");

    // Client-side validation for email
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Client-side validation for passwords
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (passwordStrength < 3) {
      setErrorMessage("Password is too weak. Please use a stronger password.");
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const isApiSuccess = Math.random() > 0.3;

      if (isApiSuccess) {
        setIsSuccess(true);
        // Reset form inputs after success
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setEmail("");
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      } else {
        setErrorMessage("An error occurred. Please try again.");
        setIsSuccess(false);
      }

      setIsLoading(false);
    }, 1500);
  };

  const strengthColors = [
    { color: "bg-red-500", width: "20%" },
    { color: "bg-orange-500", width: "40%" },
    { color: "bg-yellow-500", width: "60%" },
    { color: "bg-indigo-500", width: "80%" },
    { color: "bg-green-500", width: "100%" },
  ];

  const strengthHelpTexts = [
    "Very weak",
    "Weak",
    "Moderate",
    "Strong",
    "Very strong",
  ];

  const currentStrength = Math.min(passwordStrength, strengthColors.length - 1);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-indigo-500 opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-200 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-bounce"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Main content container */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden w-full max-w-md">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold">Change Password</h1>
          </div>
          <p className="mt-2 text-indigo-100">
            Secure your account with a new password
          </p>
        </div>

        {/* Form and Messages Section */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current Password Field */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter current password"
                />
                <i
                  className={`fas absolute right-3 top-3 text-gray-400 cursor-pointer ${
                    showCurrentPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                  onClick={togglePasswordVisibility(
                    setShowCurrentPassword,
                    showCurrentPassword
                  )}
                ></i>
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Create new password"
                />
                <i
                  className={`fas absolute right-3 top-3 text-gray-400 cursor-pointer ${
                    showNewPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                  onClick={togglePasswordVisibility(
                    setShowNewPassword,
                    showNewPassword
                  )}
                ></i>
              </div>
              <div className="h-1 bg-gray-200 mt-2 rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strengthColors[currentStrength].color}`}
                  style={{
                    width:
                      newPassword.length > 0
                        ? strengthColors[currentStrength].width
                        : "0%",
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {newPassword.length > 0
                  ? strengthHelpTexts[currentStrength]
                  : "Use 8+ characters with a mix of letters, numbers & symbols"}
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email for verification"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    !passwordsMatch && confirmPassword.length > 0
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Re-enter new password"
                />
                <i
                  className={`fas absolute right-3 top-3 text-gray-400 cursor-pointer ${
                    showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                  onClick={togglePasswordVisibility(
                    setShowConfirmPassword,
                    showConfirmPassword
                  )}
                ></i>
              </div>
              {!passwordsMatch && confirmPassword.length > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords must match
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="relative group">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center group-hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Update Password</span>
                {isLoading && (
                  <span className="ml-2">
                    <i className="fas fa-spinner fa-spin"></i>
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {isSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <div className="flex items-center space-x-4">
                <i className="fas fa-check-circle text-green-500"></i>
                <div>
                  <p className="font-medium">Password Updated Successfully!</p>
                  <p className="text-sm mt-1">
                    Your account is now more secure
                  </p>
                </div>
              </div>
              <a
                href="/"
                className="mt-4 block text-center text-indigo-600 hover:text-indigo-800"
              >
                Return to Home Page
              </a>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <div className="flex items-center space-x-4">
                <i className="fas fa-exclamation-circle text-red-500"></i>
                <div>
                  <p className="font-medium">{errorMessage}</p>
                  <p className="text-sm mt-1">
                    Please try again or contact support
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
