import React, { useState } from "react";
import { db } from "../functionality/firebase"; // Correct relative path
import { collection, getDocs, query, where , setDoc , doc } from "firebase/firestore";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("");
  const [specialInput, setSpecialInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (isLogin) {
      console.log("Logging in...");
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // User exists in Firestore
          console.log("User found in Firestore!");
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const userRole = userData?.role;
  
          if (userRole) {
            console.log(`User role: ${userRole}`);
            navigateToRole(userRole);
          } else {
            setError("User role is not defined in the database.");
          }
        } else {
          setError("No user found with this email.");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("An error occurred. Please try again.");
      }
    } else {
      console.log("Signing up...");
      try {
      // Add user details to Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty){
        alert("The email you entered is already exists");
      }else{
      await setDoc(doc(usersRef), {
        fullName,
        email,
        password,
        role,
        specialInput: role === "Doctor" || role === "Instructor" ? specialInput : "Null",
      });
    }
      alert("Signup successful! Click OK to refresh.");
      window.location.reload();
      console.log("Signup successful");
        setError("");
      } catch (err) {
        console.error("Error during signup:", err);
        setError("An error occurred during signup. Please try again.");
      }
    }
  };

  const navigateToRole = (role) => {
    if (role === "Doctor") {
      window.location.href = "/DoctorScreen";
    } else if (role === "Patient") {
      window.location.href = "/PatientScreen";
     } else if (role === "Instructor") {
        window.location.href = "/InstructorScreen";
    } else {
      console.log("Role not selected or invalid");
    }
  };

  return (
    <section id="login" className="h-auto md:h-auto lg:min-h-screen bg-gray-200 dark:bg-gray-700 flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-200">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>
      <div className="mt-8 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleFormSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Full Name"
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!isLogin}
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label htmlFor="role" className="block text-gray-700 dark:text-gray-300">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">--Select a Role--</option>
                <option value="Doctor">Doctor</option>
                <option value="Instructor">Instructor</option>
                <option value="Patient">Patient</option>
              </select>
              <label htmlFor="specialInput" className="block text-gray-700 dark:text-gray-300">Special Input</label>
              <input
                type="text"
                id="specialInput"
                value={specialInput}
                onChange={(e) => setSpecialInput(e.target.value)}
                disabled={role === "Patient" || role === ""}
                className={`w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 text-black ${
                  role === "Patient" || role === ""
                    ? "cursor-not-allowed bg-gray-300 text-gray-400"
                    : "dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }`}
                placeholder={
                  role === "Patient" || role === ""
                    ? "Disabled for this role"
                    : "Enter Number"
                }
                required
              />
            </div>
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
    </section>
  );
};

export default Login;
