"use client";
import React, { useState } from 'react';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';

const PatientsList= () => {
  const [searchQuery, setSearchQuery] = useState('');

  const links = [
    { href: "/DoctorScreen", name: "Dashboard" },
    { href: "/appointments", name: "Appointments" },
    { href: "/patients", name: "Patients" },
    { href: "/logout", name: "Logout" },
  ];
  
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
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/Statuscope.jpg"
        spanText1="Patient List"
        spanText2=""
        paragraphText="Welcome to patients list, here you can search for patients and watch patients details."
      />


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