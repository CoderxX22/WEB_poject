"use client";
import React, { useState } from 'react';

const PatientsList= () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const patients = [
    { id: 1, name: 'John Doe', age: 30, condition: 'Flu', lastVisit: 'January 2, 2024' },
    { id: 2, name: 'Jane Smith', age: 25, condition: 'Back Pain', lastVisit: 'January 5, 2024' },
    { id: 3, name: 'Alice Johnson', age: 40, condition: 'Diabetes', lastVisit: 'December 20, 2023' },
    { id: 4, name: 'Bob Brown', age: 55, condition: 'Hypertension', lastVisit: 'January 3, 2024' },
    // Add more patients as needed
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                href="/DoctorScreen"
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/appointments"
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                Appointments
              </a>
            </li>
            <li>
              <a
                href="/patients"
                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
              >
                Patients
              </a>
            </li>
            <li>
              <a
                href="/logout"
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
          <h1 className="text-blue-700 text-6xl font-extrabold mb-6 text-white dark:text-gray-100">
            Patient List
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            Welcome to patients list , here you can search for patients and watch patients details
          </p>
        </div>
      </div>

      {/* Patients Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Patient Details</h2>
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Patient List */}
        <div className="space-y-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {patient.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Age: {patient.age}
                </div>
              </div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">
                Condition: <span className="font-semibold">{patient.condition}</span>
              </div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">
                Last Visit: <span className="font-semibold">{patient.lastVisit}</span>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all">
                  View Details
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-all">
                  Remove Patient
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientsList;