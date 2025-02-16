import React, { useState, useEffect } from "react";
import { getCookie } from "../../functionality/loginlogic";
import { db } from "../../functionality/firebase";
import { collection, getDocs, addDoc, doc, getDoc, query, where } from "firebase/firestore";
import { fetchDoctors, fetchAppointmentsForPatient, handleCreateAppointment } from "../../functionality/appointmentLogic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Patient_Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const Specialty = [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Oncology" },
  ];

  const Locations = [
    { id: 1, name: "Karmiel" },
    { id: 2, name: "Haifa" },
    { id: 3, name: "Tel Aviv" },
  ];

  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    doctorName: "",
    date: "",
    time: "",
    specialty: "",
    location: "",
  });
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Fetch doctors from Firestore
  useEffect(() => {
    const getDoctors = async () => {
      const doctorData = await fetchDoctors();
      setDoctors(doctorData);
    };

    getDoctors();
  }, []);

  // Fetch appointments for the logged-in patient
  useEffect(() => {
    const storedUserEmail = getCookie("email");
    const loadAppointments = async () => {
      const appointmentsData = await fetchAppointmentsForPatient(storedUserEmail);
      setAppointments(appointmentsData);
    };

    loadAppointments();
  }, []);


  // Filter appointments by search query and date
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.doctorName
      ? appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    const matchesDate = filterDate ? appointment.date === filterDate : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
      {/* Title and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Appointments
        </h2>
        <button
          onClick={() => setShowAddAppointment(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
        >
          Add Appointment
        </button>
      </div>

      {/* Appointment List */}
      <div className="space-y-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {appointment.doctorName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
              Date: {appointment.date?.toDate ? appointment.date.toDate().toLocaleDateString() : new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Time: {appointment.time}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Specialty: {appointment.specialty}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Location: {appointment.location}
              </p>
            </div>
          ))
        ) : (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No appointments match your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Add Appointment Popout */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Add New Appointment
            </h2>
            <form onSubmit={(e) => handleCreateAppointment(
                e,
                newAppointment,
                setNewAppointment,
                setAppointments,
                setShowAddAppointment,
                setLoading,
                setError
              )}>

              <div className="mb-4">
                <label htmlFor="doctor" className="block text-gray-700 dark:text-gray-200 mb-1">
                  Select a Doctor
                </label>
                <select
                  id="doctor"
                  value={newAppointment.doctorName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 dark:text-gray-200 mb-1">
                  Date
                </label>
                <DatePicker
                  selected={newAppointment.date ? new Date(newAppointment.date) : null}
                  onChange={(date) => setNewAppointment({ ...newAppointment, date })}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select a date"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block text-gray-700 dark:text-gray-200 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
                  min="08:00"
                  max="17:00"
                  step="1800"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="specialty" className="block text-gray-700 dark:text-gray-200 mb-1">
                  Specialty
                </label>
                <select
                  id="specialty"
                  value={newAppointment.specialty}
                  onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
                >
                  <option value="">Select Specialty</option>
                  {Specialty.map((specialty) => (
                    <option key={specialty.id} value={specialty.name}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 dark:text-gray-200 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
                >
                  <option value="">Select Location</option>
                  {Locations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddAppointment(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient_Appointments;
