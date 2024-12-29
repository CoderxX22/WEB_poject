import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
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
          ? "Log in to your account to view your personalized health dashboard and track your progress."
          : "Sign up to create a new account and start managing your health today."}
      </p>

      <div className="mt-8 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {isLogin ? (
          <form>
            {/* Login Form */}
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
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Log In
            </button>
          </form>
        ) : (
          <form>
            {/* Sign Up Form */}
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
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Sign Up
            </button>
          </form>
        )}
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
