"use client";
import React, { useState, useEffect } from 'react';
import { getCookie, logOut } from '../../functionality/loginlogic';
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import Overlay from '../../components/mainComponent/Overlay';
import Navbar from '../../components/mainComponent/Navbar';
import { FaCalendarAlt } from 'react-icons/fa';
import { patientDataForDoctor ,deletePatientFromDoctor, updateHealthMetrics} from "../../functionality/getPatientData";


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
    { href: "/pages/DoctorScreen", name: "Home" },
    { href: "/pages/appointments", name: "Appointments" },
    { href: "/pages/patients", name: "Patients" },
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

  const handleSave = async (patient, editedPatient) => {
    try {   
      console.log("Patient Data: ", patient);
      console.log("Edited Patient Data: ", editedPatient);
  
      if (!patient || !editedPatient) {
        console.error("No patient or edited data available.");
        return;
      }
  
      await updateHealthMetrics(patient.userEmail, editedPatient);
      console.log("Patient updated successfully!");

      const result = await patientDataForDoctor(userName); // Fetch data
      setNewPatientsList(result); // Update state
  
      setIsEditing(false); // Exit edit mode

      alert("Patient updated successfully!");
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const handleRemovePatient = async (patient) => {
    if (!patient) {
      console.log(patient);
      return alert("Error: Unable to remove patient. Missing email.");
    }
  
    if (window.confirm("Are you sure you want to remove this patient?")) {
      try {
        console.log("Removing patient with email:", patient.userEmail); // Debugging log
        await deletePatientFromDoctor(patient.userEmail);
        alert("Patient removed successfully!");
        // Refresh patient list after removal
        const result = await patientDataForDoctor(userName);
        setNewPatientsList(result);
      } catch (error) {
        console.error("Error removing patient:", error);
        alert("Failed to remove the patient. Please try again.");
      }
    }
  };
  
  const handleAddPatient = (e) => {
    e.preventDefault();
    alert("New patient added!");
    // You can later add functionality to actually save this patient to a database
    closeAddPatient();
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editingPatients, setEditingPatients] = useState({});
  const [editedPatient, setEditedPatient] = useState({});
  

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
                key={patient.email || index}
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

                {/* Editable Fields (Other Fields Are Editable) */}
                {[
                  "hight",
                  "weight",
                  "gender",
                  "coffee",
                  "smoking",
                  "BloodPressure",
                  "HeartRate",
                  "BMI",
                  "generalHealth",
                ].map((field) => (
                  <div key={field} className="mt-2 text-gray-600 dark:text-gray-400">
                    {field.replace(/([A-Z])/g, " $1")}:{" "}
                    {isEditing && selectedPatient === patient ? (
                      <input
                        type="text"
                        name={field}
                        value={editedPatient[field] || ""}  // Ensure it's never undefined
                        onChange={handleInputChange}
                        className="px-2 py-1 border rounded-md border-gray-300 text-gray-800 dark:text-white dark:bg-gray-700 bg-white"
                      />
                    ) : (
                      <span className="font-semibold">{patient[field]}</span>
                    )}
                  </div>
                ))}

                {/* Edit, Save & Remove Buttons */}
                <div className="mt-4 flex justify-end space-x-4">
                  {isEditing && selectedPatient === patient ? (
                    <>
                      <button
                        onClick={() => handleSave(patient, editedPatient)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          handleEditToggle(); // Open the edit mode for the selected patient
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all"
                      >
                        Edit Patient
                      </button>
                      <button
                        onClick={() => handleRemovePatient(patient)}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-100"
                      >
                        Remove Patient
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
      </section>
    </div>
  );
};

export default PatientsList;
