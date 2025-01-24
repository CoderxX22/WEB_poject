"use client";
import React, { useState, useEffect } from "react";
import { getCookie, logOut } from "../functionality/loginlogic";
import Overlay from "../components/Overlay";
import Navbar from "../components/Navbar";
import BMI_Claculator from "../components/BMI_Calculator";
import { FaBirthdayCake,  FaCalendarCheck, FaVenusMars, FaSmoking, FaCoffee, FaHeartbeat, FaUserMd, FaWeight, FaRulerVertical } from "react-icons/fa";

const PatientScreen = () => {
  const [userName, setUserName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    hight: "",
    weight: "",
    smoking: "",
    coffee: "",
    generalHealth: "",
    allowDoctor: false,
  });

  useEffect(() => {
   const storedUserName = getCookie("userName");
   setUserName(storedUserName || "Guest");
  }, []);

  const links = [
    { href: "/PatientScreen", name: "Home" },
    { href: "/patientappointments", name: "My Appointments" },
    { href: "/healthoverview", name: "Health Overview" },
    { 
        name: userName, 
        dropdownItems: [
            { onClick: logOut, name: "Logout" }
        ] 
    }
];
    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value, // אם זה checkbox, שמור את הערך של checked
      }));
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן תוכל לשלוח את הנתונים או לבצע פעולה כלשהי
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar links={links} />

      {/* Welcome Section */}
      <Overlay
        backgroundImage="/waitingroom1.jpg"
        spanText1="Welcome, "
        spanText2={`${userName}`}
        paragraphText="Easily manage your health, appointments, and personal information."
        buttonText="View Appointments"
        onClick={() => window.location.href = "/patientappointments"}
      />
      <button
      onClick={() => setShowForm(!showForm)}
      className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        {showForm ? "Close Form" : "Fill Health Information"}
      </button>

      <div
        className={`${
          showForm ? "block" : "hidden"
        } fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50`}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            &times; 
          </button>

          <h3 className="text-xl text-blue-900 font-semibold text-center mb-6">Health Information Form</h3>
      <form className="max-w-xl mx-auto my-4 space-y-6">

        <div className="flex items-center justify-between">
        <FaBirthdayCake className="mr-2 text-blue-500"/>
          <label htmlFor="age" className="text-gray-700 font-semibold w-1/3">Age:</label>
          <div className="w-2/3">
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Please enter your age"
              className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
        <FaVenusMars className="mr-2 text-blue-500"/>
          <label htmlFor="gender" className="text-gray-700 font-semibold w-1/3">Gender:</label>
          <div className="w-2/3">
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
        <FaRulerVertical className="mr-2 text-blue-500"/>
          <label htmlFor="hight" className="text-gray-700 font-semibold w-1/3">Hight:</label>
          <div className="w-2/3">
          <input
              id="hight"
              name="hight"
              value={formData.hight}
              onChange={handleChange}
              placeholder="Please enter your hight"
              className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
        <FaWeight className="mr-2 text-blue-500"/>
          <label htmlFor="weight" className="text-gray-700 font-semibold w-1/3">Weight:</label>
          <div className="w-2/3">
          <input
              id="weight"
              name="weight"
              value={formData.hight}
              onChange={handleChange}
              placeholder="Please enter your weight"
              className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
        <FaSmoking className="mr-2 text-blue-500"/>
          <label htmlFor="smoking" className="text-gray-700 font-semibold w-1/3">Do you smoke?</label>
          <div className="w-2/3">
            <select
              id="smoking"
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="coffee" className="text-gray-700 font-semibold flex items-center">
          <FaCoffee className="mr-2 text-blue-500 text-blue-500"/>
          How many cups of coffee per day?
          </label>
          <div className="w-2/3">
            <select
              id="coffee"
              name="coffee"
              value={formData.coffee}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="1-2">1-2</option>
              <option value="3-6">3-6</option>
              <option value="6+">6+</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="generalHealth" className="text-gray-700 font-semibold w-1/3 flex items-center">
          <FaHeartbeat className="mr-2 text-blue-500"/> General Health Status: 
          </label>
          <div className="w-2/3 flex items-center">
            <textarea
              id="generalHealth"
              name="generalHealth"
              value={formData.generalHealth}
              onChange={handleChange}
              placeholder="Please enter your general health status"
              className="p-2 border border-gray-300 rounded w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-between text-grey-900">
          <label htmlFor="allowDoctor" className="text-gray-700 font-semibold w-1/3 flex items-center">
            <FaUserMd className="mr-2 text-blue-500" /> Allow Doctor to View Data:
          </label>
          <div className="w-2/3 flex items-center">
            <input
              type="checkbox"
              id="allowDoctor"
              name="allowDoctor"
              checked={formData.allowDoctor}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2 text-black">Yes, allow doctor to view my data</span>
          </div>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white border border-gray-500  p-2 rounded w-1/2 hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-800 border border-blue-800 rounded p-2 w-1/2 hover:bg-gray-300"
            onClick={() => setShowForm(false)}
          >
            Close Window
          </button>
        </div>
      </form>
              </div>
            </div>
            
      {/* Quick Actions */}
      <section className="py-6 px-4 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => window.location.href = "/healthoverview"}
          >
            <FaHeartbeat className="text-3xl mb-4" />
            <h3 className="text-xl font-semibold">Check Health Status</h3>
            <p>Track your vital signs and BMI.</p>
          </div>
          <div
            className="p-6 bg-blue-400 text-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
            onClick={() => window.location.href = "/patientappointments"}
          >
            <FaCalendarCheck className="text-3xl mb-4" />
            <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
            <p>Review and manage your scheduled visits.</p>
          </div>
        </div>
      </section>

      {/* Health Overview */}
      <section id="health-overview" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Health Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Blood Pressure
            </h3>
            <p className="text-gray-600 dark:text-gray-300">120/80 mmHg</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Height
            </h3>
            <p className="text-gray-600 dark:text-gray-300">180 cm</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Weight
            </h3>
            <p className="text-gray-600 dark:text-gray-300">75 kg</p>
          </div>
          <div className="md:col-span-3">
            <BMI_Claculator />
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section id="appointments" className="py-12 px-4 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Upcoming Appointments
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Dr. Smith
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Scheduled: January 2, 2024 at 10:00 AM
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Dr. Lee
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Scheduled: January 3, 2024 at 2:00 PM
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientScreen;