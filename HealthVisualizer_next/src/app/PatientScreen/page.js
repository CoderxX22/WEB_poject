"use client";
import React from 'react';
import Navbar from '../components/Navbar';

const PatientScreen = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar />

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
          <h1 className="text-6xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">
            Welcome, <span className="text-blue-600 dark:text-blue-400">Patient</span>
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            View your upcoming appointments, track your health status, and communicate with your doctor.
          </p>
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 hover:scale-110"
            onClick={() => document.getElementById('appointments').scrollIntoView({ behavior: 'smooth' })}
          >
            View Appointments
          </button>
        </div>
      </div>

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

      {/* Health Status Section */}
      <section id="healthStatus" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Your Health Status</h2>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Blood Pressure: 120/80</h3>
          <p className="text-gray-600 dark:text-gray-400">Heart Rate: 72 bpm</p>
          <p className="text-gray-600 dark:text-gray-400">Last Checkup: December 15, 2023</p>
        </div>
      </section>
    </div>
  );
};

export default PatientScreen;