"use client";
import React, { useState, useEffect } from "react";
import { fetchAppointmentsForDoctor } from "../../functionality/appointmentLogic";

const DoctorAppointments = ({ docName }) => {
  // Ensure that docName is safely handled and formatted
  const doctorName = docName ? docName.replace("Dr. ", "Dr.") : ""; // Fallback to empty string if docName is undefined
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    if (doctorName) {
      fetchAppointmentsForDoctor(doctorName, setUpcomingAppointments, setPastAppointments);
    }
  }, [doctorName]);

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
