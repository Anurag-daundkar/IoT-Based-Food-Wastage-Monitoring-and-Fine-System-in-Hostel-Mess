import React, { useState } from "react";
import { FaUserGraduate, FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      if (result.user.role !== "student") {
        setError("You are not authorized as Student");
        return;
      }
      // Redirect to student base route (StudentLayout index -> Profile)
      navigate("/Student");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-emerald-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-green-200 relative">
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-green-600 focus:outline-none"
          aria-label="Close"
          onClick={() => navigate("/")}
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <FaUserGraduate className="w-12 h-12 text-green-600 mb-2" />
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Student Login
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your Smart Sentinel account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 bg-gray-50">
              <span className="px-3 text-green-500">
                <FaEnvelope />
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-2 py-3 bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 bg-gray-50">
              <span className="px-3 text-green-500">
                <FaLock />
              </span>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-2 py-3 bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="mr-2 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-green-600 hover:text-green-700 underline underline-offset-2 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl px-8 py-3 text-lg mt-2 disabled:opacity-50"
          >
            <FaUserGraduate className="w-5 h-5" />
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginPage;
