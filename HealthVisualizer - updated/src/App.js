import React, { useState } from 'react';
import Info from './Info.js';
import Contact from './Contact.js';
import Login from './Login.js';
import healthIcon from './pngwing.com.png';
import healthImage from './Statuscope.jpg';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For dropdown visibility

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className={`relative min-h-screen bg-gray-50 dark:bg-gray-800`}>
        {/* Navbar Section */}
        <nav className="bg-blue-600 dark:bg-gray-900 shadow-md relative z-50">
          <div className="flex justify-between items-center w-full px-4 md:px-10 lg:px-16 py-3">
            {/* Logo Section with Icon and Text */}
            <div className="flex items-center space-x-3 ml-5">
              <img
                src={healthIcon}
                alt="logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white dark:text-blue-400 hover:text-black dark:hover:text-gray-200 transition-all hover:scale-110">
                HealthVisualizer
              </span>
            </div>

            {/* Navigation Links */}
            <ul className="flex items-center space-x-6">
              <li>
                <a
                  href="#info"
                  className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                >
                  Info
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                >
                  Contact
                </a>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                >
                  Health ▼
                </a>
                <ul
                  className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                >
                  <li className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700">
                    <a href="#option1" className="block text-gray-700 dark:text-gray-300">
                      Statistics
                    </a>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700">
                    <a href="#option2" className="block text-gray-700 dark:text-gray-300">
                      Charts
                    </a>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700">
                    <a href="#option2" className="block text-gray-700 dark:text-gray-300">
                      Update data
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#login"
                  className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                >
                  Login
                </a>
              </li>
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 shadow 
                            hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content Section */}
        <div className="relative">
          {/* Background Section */}
          <div
            className="w-full h-[60vh] bg-cover bg-center"
            style={{
              backgroundImage: `url(${healthImage})`,
              filter: "blur(2px)",
              zIndex: 1,
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800"></div>
          </div>

          {/* Content Section */}
          <div className="absolute top-2/3 w-full text-center z-10">
            <h1 className="text-6xl font-extrabold mb-6">
              <span className="text-gray-800 dark:text-gray-100">Welcome to</span>{' '}
              <span className="text-blue-600 dark:text-blue-400">HealthVisualizer</span>
            </h1>
            <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              Welcome to the health advisor website, you are welcome to check your health status
              <br /> and get the best advice from our professional doctors.
            </p>
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 hover:scale-110"
              onClick={() => document.getElementById('info').scrollIntoView({ behavior: 'smooth' })}
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

export default Navbar;
