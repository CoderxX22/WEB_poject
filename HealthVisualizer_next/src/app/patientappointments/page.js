"use client";
import React from 'react';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';

const PatientAppointments = () => {

  const links = [
    { href: "/PatientScreen", name: "Dashboard" },
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
        spanText1="My Appointments"
        spanText2="Patient"
        paragraphText="Here are your upcoming appointments with your doctors."
      />


      {/* Appointments Section */}
      <section id="appointments" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Upcoming Appointments</h2>
        
        {/* Example Appointments */}
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dr. John Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 2, 2024 at 10:00 AM</p>
            <p className="text-gray-600 dark:text-gray-400">Specialty: Cardiologist</p>
            <p className="text-gray-600 dark:text-gray-400">Location: Clinic A, Room 3</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dr. Jane Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 3, 2024 at 2:00 PM</p>
            <p className="text-gray-600 dark:text-gray-400">Specialty: Dermatologist</p>
            <p className="text-gray-600 dark:text-gray-400">Location: Clinic B, Room 2</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dr. Michael Johnson</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 5, 2024 at 9:00 AM</p>
            <p className="text-gray-600 dark:text-gray-400">Specialty: Orthopedist</p>
            <p className="text-gray-600 dark:text-gray-400">Location: Clinic C, Room 1</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientAppointments;