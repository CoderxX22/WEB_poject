"use client";
import React from 'react';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';

const HealthOverview = () => {

  const links = [
    { href: "/PatientScreen", name: "Dashboard" },
    { href: "/appointments", name: "My Appointments" },
    { href: "/health-overview", name: "Health Overview" },
    { href: "#logout", name: "Logout" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/Statuscope.jpg"
        spanText1="Health Overview,"
        spanText2="Patient"
        paragraphText="Here you can see an overview of your current health metrics and progress."
      />

      {/* Health Metrics Section */}
      <section id="health-overview" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Health Metrics</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Blood Pressure</h3>
            <p className="text-gray-600 dark:text-gray-400">120/80 mmHg</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Height</h3>
            <p className="text-gray-600 dark:text-gray-400">175 cm</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Weight</h3>
            <p className="text-gray-600 dark:text-gray-400">70 kg</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Heart Rate</h3>
            <p className="text-gray-600 dark:text-gray-400">72 bpm</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">BMI</h3>
            <p className="text-gray-600 dark:text-gray-400">22.9 (Normal)</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthOverview;