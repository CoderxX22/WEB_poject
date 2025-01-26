"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { getCookie, logOut } from '../functionality/loginlogic';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';
import DoctorAppointments from '../components/DoctorAppointments';

const AppointmentsScreen = () => {
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
    { href: "/DoctorScreen", name: "Home" },
    { href: "/appointments", name: "Appointments" },
    { href: "/patients", name: "Patients" },
    {
      name: `Dr. ${userName}`,
      dropdownItems: [
        { name: "Logout", onClick: logOut },
      ],
    },
  ];
  

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/doctorbg.avif"
        spanText1=""
        spanText2="Appointments"
        paragraphText="Welcome to the appointments page, here you can see upcoming and past appointments"
      />

      {/* Appointments List Component */}
      <DoctorAppointments docName={`Dr. ${userName}`} />
    </div>
  );
};

export default AppointmentsScreen;