"use client";
import React, { useState, useEffect } from "react";
import { getCookie, logOut } from "../functionality/loginlogic";
import Overlay from "../components/Overlay";
import Navbar from "../components/Navbar";

const InstructorsScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch user info from cookies
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("email");
    setUserName(storedUserName || "Guest");
    setEmail(storedUserEmail || "");
  }, []);

  const links = [
    { href: "/home", name: "Dashboard" },
    { href: "instructorswithpatients", name: "Connect with Patients" },
    { href: "/courses", name: "Courses" },
    { href: "#name", name: userName },
    { onClick: logOut, name: "Logout" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/instructorbg.jpg"
        spanText1="Welcome,"
        spanText2={`${userName}`}
        paragraphText="Manage your courses, schedule, and communicate with your patients."
        buttonText=""
        onClick={null} // No button or action specified
      />

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Instructor Stats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Total Patients
            </h3>
            <p className="text-gray-600 dark:text-gray-400">15</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Total Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-400">4</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Upcoming Appointments
            </h3>
            <p className="text-gray-600 dark:text-gray-400">5</p>
          </div>
        </div>
      </section>

      {/* Patients Section */}
      <section id="patients" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          My Patients
        </h2>

        {/* Example Patient Profiles */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              John Doe
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 34</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Diabetes</p>
            <p className="text-gray-600 dark:text-gray-400">Contact: john.doe@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <button
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300"
                onClick={() => alert("Messaging patient John Doe...")}
              >
                Send Message
              </button>
              <span className="text-sm text-green-600 dark:text-green-400">Contact Patient</span>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Jane Smith
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 28</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Hypertension</p>
            <p className="text-gray-600 dark:text-gray-400">Contact: jane.smith@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <button
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300"
                onClick={() => alert("Messaging patient Jane Smith...")}
              >
                Send Message
              </button>
              <span className="text-sm text-green-600 dark:text-green-400">Contact Patient</span>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Tom Brown
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Age: 45</p>
            <p className="text-gray-600 dark:text-gray-400">Condition: Asthma</p>
            <p className="text-gray-600 dark:text-gray-400">Contact: tom.brown@example.com</p>
            <div className="flex items-center space-x-4 mt-4">
              <button
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300"
                onClick={() => alert("Messaging patient Tom Brown...")}
              >
                Send Message
              </button>
              <span className="text-sm text-green-600 dark:text-green-400">Contact Patient</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorsScreen;