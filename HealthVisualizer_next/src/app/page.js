"use client"
import React, { useState } from 'react';
import Info from './components/Info.js';
import Contact from './components/Contact.js';
import Login from './components/Login.js';
import Navbar from './components/Navbar.jsx';
const healthImage = '/Statuscope.jpg';

const MainPage = () => {
  // State to toggle dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark'); // Add/remove 'dark' class from <html>
  };

  return (
    <>
      {/* Main wrapper with dynamic background for light/dark mode */}
      <div className="relative min-h-screen md:h-auto sm:h-auto bg-gray-50 dark:bg-gray-800">
        {/* Navbar Section */}
        <Navbar />
        {/* Main Content Section */}
        <div className="relative">
          {/* Background Section */}
          <div
            className="w-full h-[60vh] bg-cover bg-center"
            style={{
              backgroundImage: `url(${healthImage})`,
              filter: 'blur(2px)', // Adds a blur effect
              zIndex: 1,
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800"></div>
          </div>

          {/* Overlay Content Section */}
          <div className="absolute top-2/3 w-full text-center px-4 z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6">
              <span className="text-gray-800 dark:text-gray-100">Welcome to</span>{' '}
              <span className="text-blue-600 dark:text-blue-400">HealthVisualizer</span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-4 md:mb-6">
              Welcome to the health advisor website, you are welcome to check your health status
              <br /> and get the best advice from our professional doctors.
            </p>
            <button
              className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 hover:scale-110"
              onClick={() => document.getElementById('info').scrollIntoView({ behavior: 'smooth' })} // Smooth scroll to Info section
            >
              About us
            </button>
          </div>
        </div>
      </div>
      {/* Info Section */}
      <Info />
      {/* Contact Section */}
      <Contact />
      {/* Login Section */}
      <Login />
    </>
  );
};

export default MainPage;
