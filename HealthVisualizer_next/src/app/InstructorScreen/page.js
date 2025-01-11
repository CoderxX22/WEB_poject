"use client";
import React from 'react';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';

const InstructorsScreen = () => {

  const links = [
    { href: "/home", name: "Dashboard" },
    { href: "instructorswithpatients", name: "Connect with Patients" },
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
        spanText1="Welcome,"
        spanText2="Instructors"
        paragraphText="Manage your courses, schedule, and communicate with your patients."
        buttonText=""
        onClick={null} // No button or action specified
      />

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