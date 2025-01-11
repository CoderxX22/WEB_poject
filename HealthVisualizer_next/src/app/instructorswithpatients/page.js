"use client";
import React from 'react';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';

const InstructorsWithPatients = () => {
  
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
        spanText1="Connect with"
        spanText2="Patients"
        paragraphText="Get in touch with your patients to provide guidance and support."
      />


      {/* Patient Section */}
      <section id="patients" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Our Patients</h2>
        
        {/* Example Patient Profiles */}
        <div className="space-y-4">
          {/* Patient 1 */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 35</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Hypertension</p>
            <p className="text-gray-600 dark:text-gray-400">Email: john.doe@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-green-600 dark:text-green-400">Available for Consultation</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Contacting John Doe...')}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Patient 2 */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Jane Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 29</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Diabetes</p>
            <p className="text-gray-600 dark:text-gray-400">Email: jane.smith@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-yellow-600 dark:text-yellow-400">Pending Consultation</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Contacting Jane Smith...')}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Patient 3 */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Emily Carter</h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 40</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Cardiac issues</p>
            <p className="text-gray-600 dark:text-gray-400">Email: emily.carter@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-green-600 dark:text-green-400">Available for Consultation</span>
              <button 
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                onClick={() => alert('Contacting Emily Carter...')}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorsWithPatients;