import React from "react";

const Info = () => {
    return (
        <section
        id="info"
        className="h-screen bg-white dark:bg-gray-900 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Info Section</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-center px-6">
          Explore detailed information about health insights and get guidance for a healthier lifestyle.
        </p>
      </section>
    );
};

export default Info;