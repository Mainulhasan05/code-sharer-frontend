"use client";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Replace with your actual API call logic
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        Cookies.set("codesharer_token", response.data.token);
        window.location.href = "/dashboard";
      } else {
        setError("Invalid email or password. Please try again.");
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md text-black"
              placeholder="Enter your full name"
              disabled={loading}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md text-black"
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md text-black"
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 bg-blue-600 text-white rounded-lg text-lg font-semibold ${
              loading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
