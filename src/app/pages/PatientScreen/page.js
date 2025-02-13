"use client";
import React, { useState, useEffect } from "react";
import { getCookie, logOut } from "../../functionality/loginlogic";
import Overlay from "../../components/mainComponent/Overlay";
import Navbar from "../../components/mainComponent/Navbar";
import BMI_Claculator from "../../components/patientComponent/BMI_Calculator";
import { FaCalendarCheck, FaHeartbeat } from "react-icons/fa";
import FirstFillForm from "../../components/patientComponent/firstFillForm";
import { patientData } from "../../functionality/getPatientData";

const PatientScreen = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [allPatientData, setPatientData] = useState({}); // Set default state as an empty object
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("email");
    setUserEmail(storedUserEmail);
    setUserName(storedUserName || "Guest"); //storedUserName
  }, []);

  useEffect(() => {
    if (userEmail) {
      const checkFirstLogin = async () => {
        setLoading(true); // Set loading state to true while fetching
        const result = await patientData(userEmail);
        console.log("Fetched Patient Data: ", result); // Log the fetched data
        setPatientData(result); // Update the state with the result
        setLoading(false); // Set loading state to false once data is fetched
      };
      checkFirstLogin();
    }
  }, [userEmail]);

  const links = [
    { href: "/pages/PatientScreen", name: "Home" },
    { href: "/pages/patientappointments", name: "My Appointments" },
    { href: "/pages/healthoverview", name: "Health Overview" },
    { 
        name: userName, 
        dropdownItems: [
            { onClick: logOut, name: "Logout" }
        ] 
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar links={links} />

      {/* Welcome Section */}
      <Overlay
        backgroundImage="/waitingroom1.jpg"
        spanText1="Welcome, "
        spanText2={`${userName}`}
        paragraphText="Easily manage your health, appointments, and personal information."
        buttonText="View Appointments"
        onClick={() => window.location.href = "/pages/patientappointments"}
      />
      
      <FirstFillForm storedUserEmail={userEmail} />

      {/* Quick Actions */}
      <section className="py-6 px-4 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => window.location.href = "/pages/healthoverview"}
          >
            <FaHeartbeat className="text-3xl mb-4" />
            <h3 className="text-xl font-semibold">Check Health Status</h3>
            <p>Track your vital signs and BMI.</p>
          </div>
          <div
            className="p-6 bg-blue-400 text-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => window.location.href = "/pages/patientappointments"}
          >
            <FaCalendarCheck className="text-3xl mb-4" />
            <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
            <p>Review and manage your scheduled visits.</p>
          </div>
        </div>
      </section>

      {/* Health Overview */}
      <section id="health-overview" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Health Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Blood Pressure
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{loading ? "Loading..." : allPatientData.BloodPressure}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Height
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{loading ? "Loading..." : allPatientData.hight}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Weight
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{loading ? "Loading..." : allPatientData.weight}</p>
          </div>
          <div className="md:col-span-3">
            <BMI_Claculator />
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section id="appointments" className="py-12 px-4 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Upcoming Appointments
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Dr. Smith
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Scheduled: January 2, 2024 at 10:00 AM
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Dr. Lee
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Scheduled: January 3, 2024 at 2:00 PM
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientScreen;
