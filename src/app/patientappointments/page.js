"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { getCookie, logOut } from '../functionality/loginlogic';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';
import AppointmentsList from '../components/appointments_patient';

const PatientAppointments = () => {

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
    { href: "/PatientScreen", name: "Home"},
    { href: "/patientappointments", name: "My Appointments" },
    { href: "/healthoverview", name: "Health Overview" },
    { href: "#name", name: userName},
    { onClick: logOut, name: "Logout" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/waitingroom1.jpg"
        spanText1="My Appointments"
        spanText2={`${userName}`}
        paragraphText="Here are your upcoming appointments with your doctors."
      />


      {/* Appointments Section */}
      <AppointmentsList/>
    </div>
  );
};

export default PatientAppointments;