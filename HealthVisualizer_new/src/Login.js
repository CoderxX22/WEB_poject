import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(""); // State for the dropdown selection
  const [specialInput, setSpecialInput] = useState(""); // State for dependent input

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login successful", credentialResponse);
    // Additional login handling logic
  };

  const handleGoogleLoginError = () => {
    console.log("Google login failed");
    // Additional error handling logic
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...");
    // Implement login or signup logic here
  };

  return (
    <section
      id="login"
      className="h-screen bg-gray-200 dark:bg-gray-700 flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-4 text-center px-6">
        {isLogin
          ? "Log in to your account to view your personalized dashboard."
          : "Sign up to create a new account and start your journey today."}
      </p>

      <div className="mt-8 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleFormSubmit}>
          {/* Shared Fields */}
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!isLogin}
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label
                htmlFor="role"
                className="block text-gray-700 dark:text-gray-300"
              >
                Role
              </label>
              <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                <option value="">--Select a Role--</option>
                <option value="Doctor">Doctor</option>
                <option value="Instructor">Instructor</option>
                <option value="Patient">Patient</option>
              </select>
              <label
                htmlFor="LicenseNumber"
                className="block text-gray-700 dark:text-gray-300"
              >
              
              License Number
              </label>
              <input
                  type="text"
                  id="specialInput"
                  value={specialInput}
                  onChange={(e) => setSpecialInput(e.target.value)}
                  disabled={role === "Patient" || role === ""}
                  className={`w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 ${
                    role === "Patient" || role === ""
                      ? "cursor-not-allowed bg-gray-300 text-gray-400"
                      : "dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder={
                    role === "Patient" || role === ""
                      ? "Disabled for this role"
                      : "Enter Number"
                  }
                  required
                />
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
              isLogin
                ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
                : "bg-green-500 hover:bg-green-600 focus:ring-green-400"
            }`}
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </div>
      </div>

      <div className="mt-4">
        {isLogin ? (
          <p className="text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              Log In
            </button>
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
