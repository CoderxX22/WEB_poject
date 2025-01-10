"use client";
import React from 'react';

const Courses = () => {
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
                href="/InstructorScreen"
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/instructorswithpatients"
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
            filter: "blur(3px)",
            zIndex: 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800"></div>
        </div>

        {/* Overlay Content Section */}
        <div className="absolute top-2/3 w-full text-center z-10 px-4">
          <h1 className="text-blue-700 text-5xl font-extrabold mb-4 text-white dark:text-gray-100">
            Available Courses
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Choose a course to recommend to your patients.
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <section id="courses" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Our Courses</h2>
        
        {/* Example Course Listings */}
        <div className="space-y-4">
          {/* Course 1 */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Introduction to Health Science</h3>
            <p className="text-gray-600 dark:text-gray-400">Duration: 4 Weeks</p>
            <p className="text-gray-600 dark:text-gray-400">Instructor: Dr. Sarah Johnson</p>
            <p className="text-gray-600 dark:text-gray-400">Description: A foundational course on health science principles.</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-green-600 dark:text-green-400">Available</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Sending a recommendation to a patient for Introduction to Health Science...')}
              >
                Send Recommendation
              </button>
            </div>
          </div>

          {/* Course 2 */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Advanced Medical Practices</h3>
            <p className="text-gray-600 dark:text-gray-400">Duration: 8 Weeks</p>
            <p className="text-gray-600 dark:text-gray-400">Instructor: Prof. Michael Lee</p>
            <p className="text-gray-600 dark:text-gray-400">Description: An advanced course on medical practices and techniques.</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-red-600 dark:text-red-400">Unavailable</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Trying to send a recommendation for Advanced Medical Practices...')}
                disabled
              >
                Send Recommendation
              </button>
            </div>
          </div>

          {/* Course 3 */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Nutrition and Wellness</h3>
            <p className="text-gray-600 dark:text-gray-400">Duration: 6 Weeks</p>
            <p className="text-gray-600 dark:text-gray-400">Instructor: Dr. Emily Carter</p>
            <p className="text-gray-600 dark:text-gray-400">Description: A course focusing on nutrition, health, and wellness strategies.</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-green-600 dark:text-green-400">Available</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Sending a recommendation to a patient for Nutrition and Wellness...')}
              >
                Send Recommendation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;