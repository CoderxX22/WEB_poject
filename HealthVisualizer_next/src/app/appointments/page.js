"use client";
import React from 'react';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';

const AppointmentsScreen = () => {
  
  const links = [
    { href: "/DoctorScreen", name: "Dashboard" },
    { href: "/appointments", name: "Appointments" },
    { href: "/patients", name: "Patients" },
    { href: "#logout", name: "Logout" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/Statuscope.jpg"
        spanText1=""
        spanText2="Appointments"
        paragraphText="Welcome to the appointments page, here you can see upcoming and past appointments"
      />

      {/* Appointments List Section */}
      <section id="appointments-list" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Upcoming Appointments</h2>
        {/* Example Appointments */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-400">Scheduled: January 2, 2024 at 10:00 AM</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300">
              Reschedule
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Jane Smith</h3>
              <p className="text-gray-600 dark:text-gray-400">Scheduled: January 3, 2024 at 2:00 PM</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300">
              Reschedule
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Alice Cooper</h3>
              <p className="text-gray-600 dark:text-gray-400">Scheduled: January 5, 2024 at 9:30 AM</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300">
              Reschedule
            </button>
          </div>
        </div>
      </section>

      {/* Past Appointments Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Past Appointments</h2>
        {/* Example Past Appointments */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">David Lee</h3>
              <p className="text-gray-600 dark:text-gray-400">Completed: December 28, 2023 at 11:00 AM</p>
            </div>
            <button className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300">
              View Details
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Sarah Brown</h3>
              <p className="text-gray-600 dark:text-gray-400">Completed: December 27, 2023 at 3:00 PM</p>
            </div>
            <button className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300">
              View Details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentsScreen;