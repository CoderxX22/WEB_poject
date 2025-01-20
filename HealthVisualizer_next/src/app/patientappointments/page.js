"use client";
import React, { useState, useEffect } from "react";
import { getCookie, logOut } from "../functionality/loginlogic";
import Overlay from "../components/Overlay";
import Navbar from "../components/Navbar";

const PatientAppointments = () => {
  const [userName, setUserName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    // Fetch user info and appointments
    const storedUserName = getCookie("userName");
    setUserName(storedUserName || "Guest");

    // Simulated appointments
    setAppointments([
      { doctor: "Dr. Smith", date: "2025-01-22", time: "10:00 AM" },
      { doctor: "Dr. Taylor", date: "2025-01-25", time: "02:00 PM" },
    ]);
  }, []);

  const links = [
    { href: "/PatientScreen", name: "Home" },
    { href: "/patientappointments", name: "My Appointments" },
    { href: "/healthoverview", name: "Health Overview" },
    { href: "#name", name: userName },
    { onClick: logOut, name: "Logout" },
  ];

  const handleAddAppointment = () => {
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({ doctor: "", date: "", time: "" });
    setShowAddAppointment(false);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.doctor
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDate = filterDate
      ? appointment.date === filterDate
      : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Overlay Section */}
      <Overlay
        backgroundImage="/waitingroom1.jpg"
        spanText1="My Appointments"
        spanText2={`${userName}`}
        paragraphText="Manage your upcoming appointments efficiently."
      />

      {/* Appointments Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        {/* Title and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Upcoming Appointments
          </h2>
          <button
            onClick={() => setShowAddAppointment(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
          >
            Add Appointment
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search by doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Statistics */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            You have <span className="font-semibold">{appointments.length}</span>{" "}
            upcoming appointments.
          </p>
        </div>

        {/* Appointment List */}
        <div className="space-y-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {appointment.doctor}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Date: {appointment.date}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Time: {appointment.time}
                </p>
              </div>
            ))
          ) : (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No appointments match your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Add Appointment Popout */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Add New Appointment
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Doctor's Name"
                value={newAppointment.doctor}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, doctor: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, date: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="time"
                value={newAppointment.time}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, time: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleAddAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddAppointment(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;