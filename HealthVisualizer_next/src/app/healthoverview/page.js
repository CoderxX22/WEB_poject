"use client";
import React, { useState, useEffect } from "react";
import { getCookie, logOut } from "../functionality/loginlogic";
import { fetchPatientDetails } from "../functionality/fetchHealthMetrics";
import Overlay from "../components/Overlay";
import Navbar from "../components/Navbar";
import { patientData } from "../functionality/getPatientData";

const HealthOverview = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [healthMetrics, setHealthMetrics] = useState({}); // Set default state as an empty object
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch user info from cookies
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("email");
    setUserName(storedUserName);
    setUserEmail(storedUserEmail);
  }, []);

  console.log("User email: ", userEmail);
    
  useEffect(() => {
      if (userEmail) {
        const checkFirstLogin = async () => {
          setLoading(true); // Set loading state to true while fetching
          const result = await patientData(userEmail);
          console.log("Fetched Patient overview Data: ", result); // Log the fetched data
          setHealthMetrics(result); // Update the state with the result
          setLoading(false); // Set loading state to false once data is fetched
        };
        checkFirstLogin();
      }
    }, [userEmail]);

  const links = [
      { href: "/PatientScreen", name: "Home" },
      { href: "/patientappointments", name: "My Appointments" },
      { href: "/healthoverview", name: "Health Overview" },
      { 
          name: userName, 
          dropdownItems: [
              { onClick: logOut, name: "Logout" }
          ] 
      }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Overlay Section */}
      <Overlay
        backgroundImage="/waitingroom1.jpg"
        spanText1="Health Overview,"
        spanText2={`${userName}`}
        paragraphText="Track and manage your health metrics with ease."
      />

      {/* Health Metrics Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Health Metrics
        </h2>

        {/* Summary and Suggestions */}
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg mb-6">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            Your health metrics look great! Keep up the good work.
          </p>
          <ul className="text-blue-600 dark:text-blue-300 mt-2 list-disc pl-6">
            <li>Stay hydrated to maintain a healthy heart rate.</li>
            <li>Regular exercise can help lower your BMI.</li>
          </ul>
        </div>
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
                <p className="text-gray-600 dark:text-gray-300">120/80 mmHg</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Height
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{loading ? "Loading..." : healthMetrics.hight}</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Weight
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{loading ? "Loading..." : healthMetrics.weight}</p>
              </div>
            </div>
          </section>
        </section>
    </div>
  );
};

export default HealthOverview;
