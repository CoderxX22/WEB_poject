"use client"
import React, { useState, useEffect } from "react";
import { handleFormSubmit, navigateToRole , fetchDoctors } from "../functionality/loginlogic";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isFirst,setIsFirst] = useState(false);
  const [role, setRole] = useState("");
  const [specialInput, setSpecialInput] = useState("");
  const [familyDoctor, setFamilyDoctor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [doctorList, setDoctorList] = useState([]);


  useEffect(() => {
    const fetchAndSetDoctors = async () => {
      try {
        const doctors = await fetchDoctors();
        setDoctorList(doctors);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch doctors.");
      }
    };
    fetchAndSetDoctors();
  }, []);


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsFirst(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit({
      isLogin,
      email,
      password,
      fullName,
      role,
      specialInput,
      familyDoctor,
      setError,
      navigateToRole,
    });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-200 dark:bg-gray-700 flex flex-col justify-center items-center">
        <h2 className="text-5xl font-bold text-blue-800 dark:text-blue-200">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>
        <div className="mt-8 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form onSubmit={onSubmit}>
          {isLogin ? (
              <LoginForm 
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword} 
              />
            ) : (
              <SignupForm 
                email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              fullName={fullName}
              setFullName={setFullName}
              role={role}
              setRole={setRole}
              specialInput={specialInput}
              setSpecialInput={setSpecialInput}
              familyDoctor={familyDoctor}
              setFamilyDoctor={setFamilyDoctor}
              doctorList={doctorList}
              />
            )}
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
                isLogin
                  ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
                  : "bg-green-500 hover:bg-green-600 focus:ring-green-400"
              }`}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        <div className="mt-4">
          {isLogin ? (
            <p className="text-gray-700 dark:text-gray-300">
              Don't have an account?{" "}
              <button onClick={toggleForm} className="text-blue-500 hover:underline">Sign Up</button>
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <button onClick={toggleForm} className="text-blue-500 hover:underline">Log In</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
