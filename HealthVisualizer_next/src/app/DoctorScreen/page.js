"use client";
import React from 'react';
import Overlay from '../components/Overlay.jsx';
import Navbar from '../components/Navbar.jsx';

const DoctorScreen = () => {

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
          paragraphText="You can manage patient appointments, track progress, and provide the best care for your patients."
          spanText1="Welcome,"
          spanText2="Dr. Smith"
          buttonText="View Appointments"
          onClick={() => window.location.href = '/appointments'} // Pass the custom action here
      />

      {/* Appointments Section */}
      <section id="appointments" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Upcoming Appointments</h2>
        {/* Example Appointments */}
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 2, 2024 at 10:00 AM</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Jane Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 3, 2024 at 2:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorScreen;