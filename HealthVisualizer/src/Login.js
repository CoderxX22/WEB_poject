import React from "react";

const Login = () => {
    return (
        <section
        id="login"
        className="h-screen bg-gray-200 dark:bg-gray-700 flex flex-col justify-center items-center"
      >
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Log In Section</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-center px-6">
          Log in to your account to view your personalized health dashboard and track your progress.
        </p>
      </section>
    );
};

export default Login;