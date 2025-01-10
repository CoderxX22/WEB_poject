"use client";
import React from 'react';

const InstructorsScreen = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <nav className="bg-blue-600 dark:bg-gray-900 shadow-md relative z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 lg:px-16 py-3">
          {/* Logo Section with Icon and Text */}
          <div className="flex items-center space-x-3 ml-5">
            <img
              src="/pngwing.com.png"
              alt="logo"
              className="w-8 h-8 filter dark:invert-0 invert"
            />
            <span className="text-xl font-bold text-white dark:text-blue-400 hover:text-black dark:hover:text-gray-200 transition-all hover:scale-110">
              HealthVisualizer
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6">
            <li>
              <a
                href="/home"
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="instructorswithpatients"
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                Connect with Patients
              </a>
            </li>
            <li>
              <a
                href="/courses"
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="#logout"
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                Logout
              </a>
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
            backgroundImage: `url('/Statuscope.jpg')`,
            filter: "blur(2px)",
            zIndex: 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800"></div>
        </div>

        {/* Overlay Content Section */}
        <div className="absolute top-2/3 w-full text-center z-10 px-4">
          <h1 className="text-6xl font-extrabold mb-6 text-white dark:text-gray-100">
            Welcome, <span className="text-blue-600 dark:text-blue-400">Instructors</span>
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Manage your courses, schedule, and communicate with your patients.
          </p>
        </div>
      </div>

      {/* Patients Section */}
      <section id="patients" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Our Patients</h2>
        
        {/* Example Patient Profiles */}
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 34</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Diabetes</p>
            <p className="text-gray-600 dark:text-gray-400">Contact: john.doe@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-green-600 dark:text-green-400">Contact Patient</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Contacting patient John Doe...')}
              >
                Contact Patient
              </button>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Jane Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 28</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Hypertension</p>
            <p className="text-gray-600 dark:text-gray-400">Contact: jane.smith@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-green-600 dark:text-green-400">Contact Patient</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Contacting patient Jane Smith...')}
              >
                Contact Patient
              </button>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tom Brown</h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 45</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Asthma</p>
            <p className="text-gray-600 dark:text-gray-400">Contact: tom.brown@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-green-600 dark:text-green-400">Contact Patient</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Contacting patient Tom Brown...')}
              >
                Contact Patient
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorsScreen;