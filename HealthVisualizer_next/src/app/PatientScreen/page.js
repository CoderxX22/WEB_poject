"use client";
import React from 'react';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';

const PatientScreen = () => {
  
  const links = [
    { href: "/PatientScreen", name: "Home" },
    { href: "/patientappointments", name: "My Appointments" },
    { href: "/healthoverview", name: "Health Overview" },
    { href: "#logout", name: "Logout" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/Statuscope.jpg"
        spanText1="Welcome, "
        spanText2="Patient"
        paragraphText="You can view your upcoming appointments, track your health status, and manage your personal information."
        buttonText="View Appointments"
        onClick={() => window.location.href = '/patientappointments'}
      />


      {/* Health Overview Section */}
      <section id="health-overview" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Health Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Blood Pressure</h3>
            <p className="text-gray-600 dark:text-gray-400">120/80 mmHg</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Height</h3>
            <p className="text-gray-600 dark:text-gray-400">180 cm</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Weight</h3>
            <p className="text-gray-600 dark:text-gray-400">75 kg</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">BMI</h3>
            <p className="text-gray-600 dark:text-gray-400">23.1</p>
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section id="appointments" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Upcoming Appointments</h2>
        {/* Example Appointments */}
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dr. Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 2, 2024 at 10:00 AM</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dr. Lee</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 3, 2024 at 2:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientScreen;