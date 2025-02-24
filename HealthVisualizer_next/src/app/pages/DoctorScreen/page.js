"use client";
import React, { useState, useEffect } from "react";
import { getCookie, logOut } from "../../functionality/loginlogic";
import Overlay from "../../components/mainComponent/Overlay.jsx";
import Navbar from "../../components/mainComponent/Navbar.jsx";
import { FaBell, FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import { fetchAppointmentsForDoctor } from "@/app/functionality/appointmentLogic";

const DoctorScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [notifications, setNotifications] = useState([
    "You have a new appointment scheduled.",
    "Patient John Doe needs a follow-up.",
  ]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);



  useEffect(() => {
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("email");
    setUserName(storedUserName || "Guest");
    setEmail(storedUserEmail || "");
  }, []);

  const doctorName = "Dr."+userName;

  useEffect(() => {
    if (doctorName) {
      fetchAppointmentsForDoctor("Dr."+userName, setUpcomingAppointments, setPastAppointments);
    }
  }, [doctorName]);

  const links = [
    { href: "/pages/DoctorScreen", name: "Home" },
    { href: "/pages/appointments", name: "Appointments" },
    { href: "/pages/patients", name: "Patients" },
    {
      name: `Dr. ${userName}`,
      dropdownItems: [
        { name: "Logout", onClick: logOut },
      ],
    },
  ];
  

  const currentDate = new Date().toLocaleDateString();
  const formatDateTime = (date, time) => {
    // Combine the date and time into a single string
    const appointmentDate = new Date(date.toDate());
    console.log(appointmentDate);
    // Use toLocaleString to match the required format
    return appointmentDate.toLocaleString("en-US", {
      weekday: "long", // For full weekday name (e.g., "Monday")
      year: "numeric",
      month: "long",   // Full month name (e.g., "January")
      day: "numeric",  // Day of the month
    });
  };
  
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/doctorbg.avif"
        paragraphText="You can manage patient appointments, track progress, and provide the best care for your patients."
        spanText1="Welcome,"
        spanText2={`Dr. ${userName}`}
        buttonText="View Appointments"
        onClick={() => window.location.href = "/pages/appointments"}
      />

      {/* Today's Date and Notifications */}
      <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Today's Date:
          </p>
          <p className="text-xl text-gray-800 dark:text-gray-100">
            {currentDate}
          </p>
        </div>

        {/* Notifications */}
        <div className="relative flex items-center">
        <FaBell className="text-2xl text-blue-600 dark:text-blue-400" />
        {notifications.length > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-2  h-3 flex items-center justify-center">
            {notifications.length}
          </div>
        )}
      </div>

      </div>

      {/* Navigation to Other Pages */}
      <section className="py-6 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Manage Your Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Appointments</h3>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage your upcoming appointments.
            </p>
            <button
              onClick={() => window.location.href = "/pages/appointments"}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Go to Appointments
            </button>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Patients</h3>
            <p className="text-gray-600 dark:text-gray-400">
              View patient details and track progress.
            </p>
            <button
              onClick={() => window.location.href = "/pages/patients"}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Go to Patients
            </button>
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section id="appointments" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Upcoming Appointments
        </h2>
        {/* Filtered Appointments */}
        <div className="space-y-6">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Patient: {appointment.patientName || "Unknown"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Scheduled: {formatDateTime(appointment.date, appointment.time)+" at "+ appointment.time}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Location: {appointment.location || "Not specified"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Specialty: {appointment.specialty || "General"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No upcoming appointments</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DoctorScreen;