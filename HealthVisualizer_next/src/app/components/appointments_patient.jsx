import React, { useState, useEffect } from "react";
import { getCookie } from "../functionality/loginlogic";
import { db } from "../functionality/firebase";
import { collection, getDocs, addDoc, doc, query, where } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Patient_Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const Specialty = [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neorology" },
    { id: 3, name: "Ancology" },
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
  const fetchDoctors = async () => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
      
      const doctorsList = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          if (data.role && data.role == "Doctor") {
            return {
              id: doc.id,
              name: "Dr." + data.fullName
            };
          }
          return null;
        })
        .filter(doctor => doctor !== null); // Remove any null entries
      
      setDoctors(doctorsList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors list");
    }
  };

  // Fetch both appointments and doctors when the component mounts
  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

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

      const querySnapshot = await getDocs(appointmentsRef);
      const appointmentsData = querySnapshot.docs.map((doc) => doc.data());

      setAppointments(appointmentsData);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  // Handle appointment creation
  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!newAppointment.doctorName) missingFields.push("Doctor's Name");
    if (!newAppointment.date) missingFields.push("Date");
    if (!newAppointment.time) missingFields.push("Time");
    if (!newAppointment.specialty) missingFields.push("Specialty");
    if (!newAppointment.location) missingFields.push("Location");
  
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }
  
    // Check if the chosen date is in the past
    const selectedDate = new Date(newAppointment.date);
    const now = new Date();
  
    // Remove time components from `now` for a pure date comparison
    now.setHours(0, 0, 0, 0);
  
    if (selectedDate < now) {
      alert("The chosen date cannot be in the past.");
      return;
    }

    try {
      setLoading(true);
      const storedUserEmail = getCookie("email");
      if (!storedUserEmail) {
        throw new Error("User email not found. Please log in.");
      }

      const patientRef = doc(db, "users", storedUserEmail);
      const appointmentsRef = collection(patientRef, "appointments");

      await addDoc(appointmentsRef, newAppointment);

      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
      setNewAppointment({
        doctorName: "",
        date: "",
        time: "",
        specialty: "",
        location: "",
      });
      setShowAddAppointment(false);
      alert("Appointment created successfully!");
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError("Failed to create appointment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments by search query and date
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.doctorName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDate = filterDate ? appointment.date === filterDate : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
      {/* Title and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Upcoming Appointments
        </h2>
        <button
          onClick={() => setShowAddAppointment(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
        >
          Add Appointment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by doctor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
        />
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
                Date: {appointment.date}
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
            <form onSubmit={handleCreateAppointment}>
              <div className="mb-4">
                <label htmlFor="doctor" className="block text-gray-700 dark:text-gray-200 mb-1">
                  Select a Doctor
                </label>
                <select
                  id="doctor"
                  value={newAppointment.doctorName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1"
                >
                  <option value="" disabled>
                    Choose a doctor
                  </option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
              <label htmlFor="spetialty" className="block text-gray-700 dark:text-gray-200 mb-1">
                Select a Specialty
              </label>
              <select
                id="specialty"
                value={newAppointment.specialty}
                onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1"
              >
                <option value="" disabled>
                  Choose a Specialty
                </option>
                {Specialty.map((specialty) => (
                  <option key={specialty.id} value={specialty.name}>
                    {specialty.name}
                  </option>
                ))}
              </select>
              </div>
              <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Date
              </label>
              <DatePicker
                selected={newAppointment.date ? new Date(newAppointment.date) : null}
                onChange={(date) =>
                  setNewAppointment({ ...newAppointment, date: date.toISOString().split('T')[0] })
                }
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
              />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Time
                </label>
                <div className="flex space-x-2">
                  {/* Hour Select */}
                  <select
                    value={newAppointment.time.split(":")[0]} // Get the hour from the time string
                    onChange={(e) => {
                      const newTime = e.target.value + ":" + newAppointment.time.split(":")[1];
                      setNewAppointment({ ...newAppointment, time: newTime });
                    }}
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1"
                  >
                  {Array.from({ length: 10 }, (_, i) => {
                          const hour = 8 + i; // Generate hours from 8 to 17
                          return (
                            <option key={hour} value={String(hour).padStart(2, "0")}>
                              {String(hour).padStart(2, "0")}
                            </option>
                    );
                  })}
                  </select>

                  {/* Minute Select */}
                  <select
                    value={newAppointment.time.split(":")[1]} // Get the minute from the time string
                    onChange={(e) => {
                      const newTime = newAppointment.time.split(":")[0] + ":" + e.target.value;
                      setNewAppointment({ ...newAppointment, time: newTime });
                    }}
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1"
                  >
                  {Array.from({ length: 4 }, (_, i) => {
                    const minute = i * 15; // Generate minutes: 0, 15, 30, 45
                    return (
                      <option key={minute} value={String(minute).padStart(2, "0")}>
                        {String(minute).padStart(2, "0")}
                      </option>
                    );
                  })}
                  </select>
                </div>
              </div>
              <div className="mb-4">
              <label htmlFor="spetialty" className="block text-gray-700 dark:text-gray-200 mb-1">
                Select a Location
              </label>
              <select
                id="specialty"
                value={newAppointment.location}
                onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1"
              >
                <option value="" disabled>
                  Choose a Location
                </option>
                {Locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddAppointment(false)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-100"
                >
                  Cancel
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
