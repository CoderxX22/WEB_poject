import React, { useState, useEffect } from "react";
import { getCookie } from "../functionality/loginlogic";
import { db } from "../functionality/firebase"; // Firebase initialization
import { collection, doc, getDocs, addDoc } from "firebase/firestore";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    doctorName: "",
    date: "",
    time: "",
    specialty: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // To manage the visibility of the form

  // Fetch appointments when the component is mounted
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch appointments from Firestore
  const fetchAppointments = async () => {
    try {
      const storedUserEmail = getCookie("email");
      if (!storedUserEmail) {
        throw new Error("User email not found.");
      }

      const patientRef = doc(db, "users", storedUserEmail);
      const appointmentsRef = collection(patientRef, "appointments");

      // Get the appointments documents
      const querySnapshot = await getDocs(appointmentsRef);
      const appointmentsData = querySnapshot.docs.map(doc => doc.data());

      setAppointments(appointmentsData); // Set the appointments in the state
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  // Handle appointment creation
  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (!newAppointment.doctorName || !newAppointment.date || !newAppointment.time || !newAppointment.specialty || !newAppointment.location) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const storedUserEmail = getCookie("email");

      if (!storedUserEmail) {
        throw new Error("User email not found. Please log in.");
      }

      // Reference to the user's document in Firestore
      const patientRef = doc(db, "users", storedUserEmail);

      // Reference to the patient's appointments subcollection
      const appointmentsRef = collection(patientRef, "appointments");

      // Add the new appointment to the appointments subcollection
      await addDoc(appointmentsRef, newAppointment);

      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]); // Update the local state with the new appointment
      setNewAppointment({
        doctorName: "",
        date: "",
        time: "",
        specialty: "",
        location: "",
      }); // Reset the form
      alert("Appointment created successfully!");
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError("Failed to create appointment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle the form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      {/* Button to show/hide the form */}
      <button
        onClick={toggleFormVisibility}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {isFormVisible ? "Cancel" : "Add Appointment"}
      </button>

      {/* Render the existing appointments */}
      <div>
        {appointments.map((appointment, index) => (
          <div  className="space-y-4" key={index}>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{appointment.doctorName}</h3>
            <p className="text-gray-600 dark:text-gray-400">{appointment.date} at {appointment.time}</p>
            <p className="text-gray-600 dark:text-gray-400">Specialty: {appointment.specialty}</p>
            <p className="text-gray-600 dark:text-gray-400">Location: {appointment.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render the appointment creation form */}
      {isFormVisible && (
        <form onSubmit={handleCreateAppointment}>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="Doctor's Name"
              value={newAppointment.doctorName}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />

            <input
              type="date"
              placeholder="Date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />

            <input
              type="time"
              placeholder="Time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />

            <input
              type="text"
              placeholder="Specialty"
              value={newAppointment.specialty}
              onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />

            <input
              type="text"
              placeholder="Location"
              value={newAppointment.location}
              onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />

            <button
              type="submit"
              className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {loading ? "Creating..." : "Create Appointment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PatientAppointments;
