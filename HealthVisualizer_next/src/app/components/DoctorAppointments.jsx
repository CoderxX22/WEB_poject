"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "../functionality/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";


const DoctorAppointments = (doctorName) => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
  
    useEffect(() => {
      if (doctorName) {
        fetchAppointments(doctorName);
      }
    }, [doctorName]);
  
    const fetchAppointments = async (doctorName) => {
      try {
        // Get all users
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        
        const currentDate = new Date();
        const upcoming = [];
        const past = [];
  
        // For each user, get their appointments
        for (const userDoc of usersSnapshot.docs) {
          // Get appointments sub-collection for this user
          const userAppointmentsRef = collection(db, `users/${userDoc.id}/appointments`);
          const appointmentsSnapshot = await getDocs(userAppointmentsRef);
          
          appointmentsSnapshot.docs.forEach(doc => {
            const appointment = doc.data();
            
            // Check if this appointment is for the current doctor
            if (appointment.doctorName === doctorName && appointment.date && appointment.time) {
              const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
              const appointmentWithId = {
                id: doc.id,
                patientEmail: userDoc.id,
                ...appointment
              };
  
              // Sort into upcoming or past based on date
              if (appointmentDateTime > currentDate) {
                upcoming.push(appointmentWithId);
              } else {
                past.push(appointmentWithId);
              }
            }
          });
        }
  
        // Sort appointments by date and time
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
      const appointmentDate = new Date(`${date}T${time}`);
      return appointmentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
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
                      {appointment.patientEmail}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Scheduled: {formatDateTime(appointment.date, appointment.time)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Location: {appointment.location}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Specialty: {appointment.specialty}
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
                      {appointment.patientEmail}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Completed: {formatDateTime(appointment.date, appointment.time)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Location: {appointment.location}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Specialty: {appointment.specialty}
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