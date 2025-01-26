"use client";
import React, { useState, useEffect } from 'react';
import { getCookie, logOut } from '../functionality/loginlogic';
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';
import { FaCalendarAlt } from 'react-icons/fa';
import { patientDataForDoctor } from "../functionality/getPatientData";

const PatientsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [updatePatient, setUpdatePatient] = useState({}); // Add updatePatient state
  const [newPatientsList, setNewPatientsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user info from cookies
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("email");
    setUserName(storedUserName || "Guest");
    setEmail(storedUserEmail || "");
  }, []);

  useEffect(() => {
    if (userName) {
      const fetchPatientData = async () => {
        setLoading(true); // Show loading state
        const result = await patientDataForDoctor(userName); // Fetch data
        setNewPatientsList(result); // Update state
        setLoading(false); // Hide loading state
      };
      fetchPatientData();
    }
  }, [userName]);

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

// Filter patients safely
  const filteredPatients = Array.isArray(newPatientsList)
  ? newPatientsList.filter((patient) =>
      (patient.name ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

  const currentDate = new Date().toLocaleDateString();

  const openDetails = (patient) => {
    setSelectedPatient(patient);
    setIsOpen(true);
  };

  const closeDetails = () => {
    setIsOpen(false);
    setSelectedPatient(null);
  };

  const openAddPatient = () => {
    setIsAddPatientOpen(true);
  };

  const closeAddPatient = () => {
    setIsAddPatientOpen(false);
    setNewPatient({
      name: '',
      age: '',
      condition: '',
      additionalInfo: ''
    });
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    alert("New patient added!");
    // You can later add functionality to actually save this patient to a database
    closeAddPatient();
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(null);

  // Update editedPatient whenever selectedPatient changes
  useEffect(() => {
    if (selectedPatient) {
      setEditedPatient({ ...selectedPatient }); // Copy selectedPatient to editedPatient
    }
  }, [selectedPatient]);

 
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
       // If entering edit mode, set editedPatient to the current selectedPatient
      setEditedPatient({ ...selectedPatient });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const handleSave = () => {
    // Here you can handle saving the updated patient details (e.g., API call)
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    // Cancel editing, revert back to selectedPatient
    setIsEditing(false);
    setEditedPatient({ ...selectedPatient });
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar Section */}
      <Navbar links={links} />

      {/* Main Content Section */}
      <Overlay
        backgroundImage="/doctorbg.avif"
        spanText1="Patient"
        spanText2="List"
        paragraphText="Welcome to patients list, here you can search for patients and watch patients details."
      />

      {/* Date Display */}
      <div className="absolute top-4 right-4 text-lg text-gray-700 dark:text-gray-300 flex items-center space-x-2">
        <FaCalendarAlt />
        <span>{currentDate}</span>
      </div>

      {/* Patients Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Patient Details</h2>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Patient List */}
        <div className="space-y-6">
          {/* Loading Indicator */}
          {loading && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              Loading patient data...
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPatients.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              No patients found for Dr. {userName}.
            </div>
          )}

          {/* Display Patients */}
          {!loading &&
            filteredPatients.map((patient, index) => (
              <div
                key={patient.email || index} // Use a unique identifier as the key
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {patient.fullName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Age: {patient.age}
                  </div>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  Height: <span className="font-semibold">{patient.hight}</span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  Weight: <span className="font-semibold">{patient.weight}</span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  Sex: <span className="font-semibold">{patient.gender}</span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  Coffee Cups per day: <span className="font-semibold">{patient.coffee}</span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  Smoking: <span className="font-semibold">{patient.smoking}</span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  Blood Pressure: <span className="font-semibold">{patient.BloodPressure}</span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  Average Heart Rate: <span className="font-semibold">{patient.HeartRate}</span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  BMI: <span className="font-semibold">{patient.BMI}</span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  General Health: <span className="font-semibold">{patient.generalHealth}</span>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => openDetails(patient)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all"
                  >
                    Edit Patient
                  </button>
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-100">
                    Remove Patient
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PatientsList;
