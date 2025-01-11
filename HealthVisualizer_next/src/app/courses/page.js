"use client";
import React from 'react';
import Overlay from '../components/Overlay.jsx';
import Navbar from '../components/Navbar.jsx';

const Courses = () => {
  
  const links = [
    { href: "/InstructorScreen", name: "Dashboard" },
    { href: "/instructorswithpatients", name: "Connect with Patients" },
    { href: "/courses", name: "Courses" },
    { href: "#logout", name: "Logout" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay 
        backgroundImage="/Statuscope.jpg" 
        paragraphText="Choose a course to recommend to your patients." 
        spanText1="Available" 
        spanText2="Courses" 
      />
      
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