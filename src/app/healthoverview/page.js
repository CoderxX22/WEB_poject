"use client";
import React, { useState, useEffect } from "react";
import { getCookie, logOut } from "../functionality/loginlogic";
import { fetchPatientDetails } from "../functionality/fetchHealthMetrics";
import Overlay from "../components/Overlay";
import Navbar from "../components/Navbar";

const HealthOverview = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [healthMetrics, setHealthMetrics] = useState({
    bloodPressure: '120/80 mmHg',
    height: '175 cm',
    weight: '70 kg',
    heartRate: '72 bpm',
    bmi: '22.9'
  });

  useEffect(() => {
    // Fetch user info from cookies
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("userEmail");
    setUserName(storedUserName || "Guest");
    setUserEmail(storedUserEmail || "");
  }, []);
    
  useEffect(() => {
    // Fetch the patient's health metrics if the email is available
    if (userEmail) {
      const fetchMetrics = async () => {
        const metrics = await fetchPatientDetails("userEmail");
        if (metrics) {
          setHealthMetrics(metrics); // Set the fetched health data to the state
        }
      };
      fetchMetrics();
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

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(healthMetrics).map(([key, value]) => (
            <div
              key={key}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{value}</p>
            </div>
          ))}
        </div>

        {/* Update Metrics (Read-Only) */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            View Your Metrics
          </h2>
          <div className="space-y-4">
            {Object.keys(healthMetrics).map((key) => (
              <div key={key} className="flex items-center space-x-4">
                <label
                  className="text-gray-800 dark:text-gray-100 capitalize w-1/3"
                  htmlFor={key}
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  id={key}
                  type="text"
                  value={healthMetrics[key]}
                  disabled
                  className="flex-1 px-4 py-2 border rounded-lg text-gray-600 dark:bg-gray-700 dark:text-gray-100 bg-gray-200 cursor-not-allowed"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthOverview;
