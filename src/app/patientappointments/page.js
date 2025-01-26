"use client";
import React, { useState, useEffect } from "react";
import { getCookie, logOut } from "../functionality/loginlogic";
import Overlay from "../components/Overlay";
import Navbar from "../components/Navbar";
import Patient_Appointments from "../components/appointments_patient";

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
     { 
         name: userName, 
         dropdownItems: [
             { onClick: logOut, name: "Logout" }
         ] 
     }
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

      <Patient_Appointments/>
    </div>
  );
};

export default PatientAppointments;