"use client";
import React, { useState, useEffect } from 'react';
import { getCookie, logOut } from '../functionality/loginlogic';
import Overlay from '../components/Overlay.jsx';
import Navbar from '../components/Navbar.jsx';

const Courses = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState([
    { id: 1, name: "Introduction to Health Science", duration: "4 Weeks", instructor: "Dr. Sarah Johnson", available: true, description: "A foundational course on health science principles." },
    { id: 2, name: "Advanced Medical Practices", duration: "8 Weeks", instructor: "Prof. Michael Lee", available: false, description: "An advanced course on medical practices and techniques." },
    { id: 3, name: "Nutrition and Wellness", duration: "6 Weeks", instructor: "Dr. Emily Carter", available: true, description: "A course focusing on nutrition, health, and wellness strategies." }
  ]);
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Mark Lee", email: "mark.lee@example.com" },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [recommendationStatus, setRecommendationStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const storedUserName = getCookie("userName");
    const storedUserEmail = getCookie("email");
    setUserName(storedUserName || "Guest");
    setEmail(storedUserEmail || "");
  }, []);

  const links = [
    { href: "/InstructorScreen", name: "Home" },
    { href: "instructorswithpatients", name: "Connect with Patients" },
    { href: "/courses", name: "Courses" },
    {
      name: userName,
      dropdownItems: [
        { name: "Logout", onClick: logOut },
      ],
    },
  ];
  

  const handleSendRecommendation = (courseId) => {
    if (selectedPatient) {
      setRecommendationStatus(`Recommendation for ${courses.find(course => course.id === courseId).name} sent to ${selectedPatient.name}`);
    } else {
      setRecommendationStatus("Please select a patient to send the recommendation.");
    }
  };

  // Filtering courses based on the search query
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
      <Navbar links={links} />

      <Overlay 
        backgroundImage="/instructorbg.jpg"
        paragraphText="Choose a course to recommend to your patients." 
        spanText1="Available" 
        spanText2="Courses" 
      />
      
      <section id="courses" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Our Courses</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search for a course..."
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredCourses.map(course => (
            <div key={course.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{course.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">Duration: {course.duration}</p>
              <p className="text-gray-600 dark:text-gray-400">Instructor: {course.instructor}</p>
              <p className="text-gray-600 dark:text-gray-400">{course.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <span className={`text-sm ${course.available ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {course.available ? 'Available' : 'Unavailable'}
                </span>
                <div className="flex flex-col mt-2">
                  <label htmlFor="patientSelect" className="text-gray-600 dark:text-gray-400">Select a Patient:</label>
                  <select
                    id="patientSelect"
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                    onChange={(e) => setSelectedPatient(patients.find(patient => patient.id === parseInt(e.target.value)))}
                    defaultValue=""
                  >
                    <option value="" disabled>Select a patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                </div>
                <button 
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300"
                  onClick={() => handleSendRecommendation(course.id)}
                  disabled={!course.available}
                >
                  Send Recommendation
                </button>
              </div>
            </div>
          ))}
        </div>

        {recommendationStatus && (
          <div className="mt-6 p-4 bg-green-600 text-white rounded-lg shadow-md">
            <p>{recommendationStatus}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Courses;