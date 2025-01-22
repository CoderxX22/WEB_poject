"use client";
import React, { useState, useEffect } from 'react';
import { getCookie, logOut } from '../functionality/loginlogic';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';
import { FaCalendarAlt } from 'react-icons/fa';

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
  
  useEffect(() => {
    // Fetch user info from cookies
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("email");
    setUserName(storedUserName || "Guest");
    setEmail(storedUserEmail || "");
  }, []);

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
  

  const patients = [
    { id: 1, name: 'John Doe', age: 30, condition: 'Flu', lastVisit: 'January 2, 2024', additionalInfo: 'Patient is recovering well with flu medication.' },
    { id: 2, name: 'Jane Smith', age: 25, condition: 'Back Pain', lastVisit: 'January 5, 2024', additionalInfo: 'Patient is undergoing physiotherapy.' },
    { id: 3, name: 'Alice Johnson', age: 40, condition: 'Diabetes', lastVisit: 'December 20, 2023', additionalInfo: 'Patient is managing diabetes with insulin injections.' },
    { id: 4, name: 'Bob Brown', age: 55, condition: 'Hypertension', lastVisit: 'January 3, 2024', additionalInfo: 'Patient is on medication for blood pressure.' },
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {patient.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Age: {patient.age}
                </div>
              </div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">
                Condition: <span className="font-semibold">{patient.condition}</span>
              </div>
              <div className="mt-2 text-gray-600 dark:text-gray-400">
                Last Visit: <span className="font-semibold">{patient.lastVisit}</span>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button 
                  onClick={() => openDetails(patient)} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all">
                  View Details
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
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">{selectedPatient.name} - Details</h2>
            <p className="text-gray-600 dark:text-gray-400"><strong>Age:</strong> {selectedPatient.age}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Condition:</strong> {selectedPatient.condition}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Last Visit:</strong> {selectedPatient.lastVisit}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Additional Info:</strong> {selectedPatient.additionalInfo}</p>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={closeDetails} 
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-100">
                Close
              </button>
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
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-400">Additional Info</label>
                <textarea
                  value={newPatient.additionalInfo}
                  onChange={(e) => setNewPatient({ ...newPatient, additionalInfo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-all">
                  Add Patient
                </button>
                <button onClick={closeAddPatient} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-100">
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

export default PatientsList;