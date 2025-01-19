"use client";
import React, { useState, useEffect } from 'react';
import { getCookie, logOut } from '../functionality/loginlogic';
import Overlay from '../components/Overlay';
import Navbar from '../components/Navbar';

const InstructorsWithPatients = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [patients, setPatients] = useState([
    { name: "John Doe", age: 35, condition: "Hypertension", email: "john.doe@example.com", status: "Available for Consultation" },
    { name: "Jane Smith", age: 29, condition: "Diabetes", email: "jane.smith@example.com", status: "Pending Consultation" },
    { name: "Emily Carter", age: 40, condition: "Cardiac issues", email: "emily.carter@example.com", status: "Available for Consultation" },
  ]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", condition: "", email: "" });

  useEffect(() => {
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("email");
    setUserName(storedUserName || "Guest");
    setEmail(storedUserEmail || "");
  }, []);

  const links = [
    { href: "/InstructorScreen", name: "Dashboard" },
    { href: "/instructorswithpatients", name: "Connect with Patients" },
    { href: "/courses", name: "Courses" },
    { href: "#name", name: userName },
    { onClick: logOut, name: "Logout" },
  ];

  const handleContactClick = (patientName) => {
    alert(`Contacting ${patientName}...`);
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedPatients = [...patients];
    updatedPatients[index].status = newStatus;
    setPatients(updatedPatients);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(search) || patient.status.toLowerCase().includes(search)
  );

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.condition && newPatient.email) {
      setPatients([...patients, { ...newPatient, status: "Available for Consultation" }]);
      setNewPatient({ name: "", age: "", condition: "", email: "" });
      handleModalToggle();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeletePatient = (index) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      <Navbar links={links} />
      <Overlay
        backgroundImage="/instructorbg.jpg"
        spanText1="Connect with"
        spanText2={`${userName}`}
        paragraphText="Get in touch with your patients to provide guidance and support."
      />

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto py-6">
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={handleSearchChange}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <section id="patients" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Our Patients</h2>
          <button
            onClick={handleModalToggle}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300"
          >
            Add New Patient
          </button>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                <th className="px-4 py-2 text-gray-800 dark:text-gray-100">Name</th>
                <th className="px-4 py-2 text-gray-800 dark:text-gray-100">Age</th>
                <th className="px-4 py-2 text-gray-800 dark:text-gray-100">Condition</th>
                <th className="px-4 py-2 text-gray-800 dark:text-gray-100">Status</th>
                <th className="px-4 py-2 text-gray-800 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{patient.name}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{patient.age}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{patient.condition}</td>
                  <td className="px-4 py-2">
                    <span className={`text-sm ${patient.status === 'Available for Consultation' ? 'text-green-600' : 'text-yellow-600'} dark:${patient.status === 'Available for Consultation' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleContactClick(patient.name)}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                    >
                      Contact
                    </button>
                    <button
                      onClick={() => handleStatusChange(index, patient.status === "Available for Consultation" ? "Pending Consultation" : "Available for Consultation")}
                      className="ml-2 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-800 transition-all duration-300"
                    >
                      {patient.status === "Available for Consultation" ? "Set Pending" : "Set Available"}
                    </button>
                    <button
                      onClick={() => handleDeletePatient(index)}
                      className="ml-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Add New Patient</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-800 dark:text-gray-100 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newPatient.name}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 dark:text-gray-100 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newPatient.age}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 dark:text-gray-100 mb-2">Condition</label>
                <input
                  type="text"
                  name="condition"
                  value={newPatient.condition}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 dark:text-gray-100 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newPatient.email}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddPatient}
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300"
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

export default InstructorsWithPatients;