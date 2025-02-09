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
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    condition: '',
    additionalInfo: ''
  });
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
        
        {/* Add New Patient Button */}
        <div className="text-right mb-6">
          <button
            onClick={openAddPatient}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-800 transition-all">
            Add New Patient
          </button>
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
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => openDetails(patient)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all"
                  >
                    View full Details
                  </button>
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-100">
                    Remove Patient
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Modal/Pop-up for Patient Details */}
      {isOpen && selectedPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            {selectedPatient.fullName} - Details
          </h2>

          <div className="space-y-3">
            {/* Patient Details - Two Column Layout */}
            {[
              { label: "Smoking", name: "smoking" },
              { label: "General Health", name: "generalHealth" },
              { label: "Blood Pressure", name: "bloodPressure" },
              { label: "Heart Rate", name: "heartRate" },
              { label: "BMI", name: "bmi" },
              { label: "Weight", name: "weight" },
              { label: "Height", name: "height" }
            ].map(({ label, name }) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{label}:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name={name}
                    value={editedPatient?.[name] || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-2/3 text-black dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-gray-600 dark:text-gray-400 w-2/3">{selectedPatient[name]}</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-lg shadow-md hover:bg-green-100"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-100"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 border bg-blue-600 text-blue-100 hover:text-blue-800 rounded-lg shadow-md hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={closeDetails}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-100"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Add Patient Pop-up */}
      {isAddPatientOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Add New Patient</h2>
            <form onSubmit={handleAddPatient}>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-400">Name</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-400">Age</label>
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-400">Condition</label>
                <input
                  type="text"
                  value={newPatient.condition}
                  onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-400">Additional Info</label>
                <textarea
                  value={newPatient.additionalInfo}
                  onChange={(e) => setNewPatient({ ...newPatient, additionalInfo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeAddPatient}
                  className="px-4 py-2 border border-gray-600 text-gray-600 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsList;
