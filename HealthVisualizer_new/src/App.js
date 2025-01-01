import React, { useState } from 'react';
import Info from './components/Info.js';
import Contact from './components/Contact.js';
import Login from './components/Login.js';
import PatientScreen from './components/PatientScreen.js';
import DoctorScreen from './components/DoctorScreen.js';
const healthIcon = '/pngwing.com.png';
const healthImage = '/Statuscope.jpg';

const Navbar = () => {
  // State to toggle dark mode
  const [darkMode, setDarkMode] = useState(false);

  // State to manage the dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // State for the hamburger menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark'); // Add/remove 'dark' class from <html>
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to toggle the hamburger menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Main wrapper with dynamic background for light/dark mode */}
      <div className={`relative min-h-screen bg-gray-50 dark:bg-gray-800`}>
        {/* Navbar Section */}
        <nav className="bg-blue-600 dark:bg-gray-900 shadow-md relative z-50">
          <div className="flex justify-between items-center w-full px-4 md:px-10 lg:px-16 py-3">
            {/* Logo Section with Icon and Text */}
            <div className="flex items-center space-x-3 ml-5">
              <img
                src={healthIcon}
                alt="logo"
                className="w-8 h-8 filter dark:invert-0 invert" // Invert color for light mode
              />
              <span
                href="#app"
                className="text-xl font-bold text-white dark:text-blue-400 hover:text-black dark:hover:text-gray-200 transition-all hover:scale-110"
              >
                HealthVisualizer
              </span>
            </div>

            {/* Hamburger Icon for small screens */}
            <div className="lg:hidden flex items-center space-x-3" onClick={toggleMenu}>
              <button className="text-white text-2xl">
                {menuOpen ? 'X' : '☰'}
              </button>
            </div>

            {/* Navigation Links */}
            <ul
              className={`lg:flex items-center space-x-6 ${menuOpen ? 'hidden' : 'hidden'} lg:block`}
            >
              {/* Info Link */}
              <li>
                <a
                  href="#info"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                >
                  Info
                </a>
              </li>
              {/* Contact Link */}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                >
                  Contact
                </a>
              </li>
              {/* Dropdown Menu for Health */}
              <li className="relative group">
                <a
                  href="#health"
                  className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                >
                  Health ▼
                </a>
                {/* Dropdown Options */}
                <ul
                  className="absolute left-0 mt-2 w-40 bg-blue-600 dark:bg-gray-900 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                >
                  <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                    <a href="#option1" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                      Statistics
                    </a>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                    <a href="#option2" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                      Charts
                    </a>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                    <a href="#option2" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                      Update data
                    </a>
                  </li>
                </ul>
              </li>
              {/* Login Link */}
              <li>
                <a
                  href="#login"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('login').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                >
                  Login
                </a>
              </li>
              {/* Dark Mode Toggle Switch */}
              <li>
                <div
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300 
                              ${darkMode ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="w-5 h-5 bg-white dark:bg-gray-400 rounded-full shadow-md transform transition-transform duration-300"></div>
                </div>
              </li>
            </ul>

            {/* Mobile Dropdown */}
            {menuOpen && (
              <div className="lg:hidden absolute top-12 left-0 right-0 bg-blue-600 dark:bg-gray-900 shadow-md z-50">
                <ul className="flex flex-col items-center space-y-4 py-4">
                  <li>
                    <a
                      href="#info"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-all"
                    >
                      Info
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-all"
                    >
                      Contact
                    </a>
                  </li>
                  {/* Dropdown Menu for Health */}
                  <li className="relative">
                    <button
                      onClick={toggleDropdown} // Toggle dropdown visibility
                      className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                    >
                      Health {!dropdownOpen || !menuOpen ? '▼' : '▲'}
                    </button>
                    {/* Dropdown Options */}
                    {dropdownOpen && ( // Conditionally render the dropdown based on state
                      <ul
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-blue-600 dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-300 z-50"
                      >
                        <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                          <a href="#option1" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                            Statistics
                          </a>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                          <a href="#option2" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                            Charts
                          </a>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                          <a href="#option3" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                            Update data
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <a
                      href="#login"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('login').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-all"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <div
                      onClick={toggleDarkMode}
                      className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300 
                                  ${darkMode ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="w-5 h-5 bg-white dark:bg-gray-400 rounded-full shadow-md transform transition-transform duration-300"></div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

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

export default Navbar;
