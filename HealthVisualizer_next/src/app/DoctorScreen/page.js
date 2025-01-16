"use client";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where , setDoc , doc , updateDoc } from "firebase/firestore";
import Overlay from '../components/Overlay.jsx';
import Navbar from '../components/Navbar.jsx';

const DoctorScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  useEffect(() => {
    // Set the username from the cookie when the component mounts
    const storedUserName = getCookie("userName");
    setUserName(storedUserName);
    const storedUserEmail = getCookie("email");
    setEmail(storedUserEmail);

  }, []);
  const logOut = async () =>{
    try {
      // Get the user's document from Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userDocRef = doc(db, "users", userDoc.id);

        // Update the "connected" field to false
        await updateDoc(userDocRef, { connected: false });
        
        window.location.href = "/app";

      }
  }catch (err) {
    console.error("Error updating user's connected status:", err);
  }
};
  const links = [
    { href: "/DoctorScreen", name: "Dashboard" },
    { href: "/appointments", name: "Appointments" },
    { href: "/patients", name: "Patients" },
    { href: "#name", name: `Dr.${userName}`},
    { href: "#logout", name: "Logout", onClick: logOut }
  ];

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
          onClick={() => window.location.href = '/appointments'} // Pass the custom action here
      />

      {/* Appointments Section */}
      <section id="appointments" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Upcoming Appointments</h2>
        {/* Example Appointments */}
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 2, 2024 at 10:00 AM</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Jane Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">Scheduled: January 3, 2024 at 2:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};



export default DoctorScreen;