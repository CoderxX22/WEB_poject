"use client";
import React, { useState, useEffect } from "react";
import { db } from "../functionality/firebase";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { getCookie } from "../functionality/loginlogic";  // Assuming this function gets the logged-in user's email

const DoctorAppointments = ({ docName }) => {
  // Ensure that docName is safely handled and formatted
  const doctorName = docName ? docName.replace("Dr. ", "Dr.") : ""; // Fallback to empty string if docName is undefined
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    if (doctorName) {
      fetchAppointments(doctorName);
    }
  }, [doctorName]);

  const fetchAppointments = async (doctorName) => {
    try {
      const appointmentsRef = collection(db, "appointments");
      
      // Get the logged-in user's email
      const userEmail = getCookie("email");
  
      // Query to fetch appointments where doctorName matches the specified doctor's name and patientEmail matches the logged-in user's email
      const q = query(
        appointmentsRef,
        where("doctorName", "==", doctorName)
      );
  
      const appointmentsSnapshot = await getDocs(q);
  
      const currentDate = new Date();
      const upcoming = [];
      const past = [];
  
      appointmentsSnapshot.forEach((doc) => {
        const appointment = doc.data();
  
        if (appointment.date && appointment.time) {
            const timeStamp = appointment.data;
            const appointmentDate = new Date(timeStamp); // Use UTC time
            console.log(appointment.date);
          const appointmentWithId = {
            id: doc.id,
            ...appointment,
          };
  
          // Use only the date (without time) for the comparison, so that appointments are considered upcoming if the date is in the future
          const currentDateWithoutTime = new Date(currentDate);  // Reset time to 00:00
          const ToTimeStamp = Timestamp.fromDate(currentDateWithoutTime);
          console.log(currentDateWithoutTime);
          if (appointment.date >= ToTimeStamp) {
            upcoming.push(appointmentWithId);
          } else {
            past.push(appointmentWithId);
          }
        }
      });
  
      // Sort the appointments by date and time
      const sortByDateTime = (a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA - dateTimeB;
      };
  
      setUpcomingAppointments(upcoming.sort(sortByDateTime));
      setPastAppointments(past.sort(sortByDateTime).reverse());
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

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
    <>
      {/* Upcoming Appointments Section */}
      <section id="appointments-list" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Upcoming Appointments
        </h2>
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
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300">
                  Reschedule
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No upcoming appointments</p>
          )}
        </div>
      </section>

      {/* Past Appointments Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Past Appointments
        </h2>
        <div className="space-y-6">
          {pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Patient: {appointment.patientName || "Unknown"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Completed: {formatDateTime(appointment.date, appointment.time)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Location: {appointment.location || "Not specified"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Specialty: {appointment.specialty || "General"}
                  </p>
                </div>
                <button className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No past appointments</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DoctorAppointments;
