import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { auth } from '../functionality/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  // State variables to toggle between login/signup and store role/special input values
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(""); // State for role selection (Doctor, Instructor, Patient)
  const [specialInput, setSpecialInput] = useState(""); // State for the special input based on role
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => { // Login via Firebase Authentication
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password, role);
      console.log('User logged in successfully!');
      // Redirect user to dashboard or another page
      navigateToRole(role);
    } catch (err) {
      setError(err.message);  // Handle login errors
    }
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, role);
      console.log("Signed up successfully:", userCredential.user);

      // Save user data or navigate to the dashboard
      navigateToRole(role);
    } catch (err) {
      setError(err.message); // Display error
      console.error("Signup error:", err);
    }
  };

  // Handle successful Google login
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login successful", credentialResponse);
    navigateToRole();
    // Add logic for handling Google login here
  };

  // Handle failed Google login
  const handleGoogleLoginError = () => {
    console.log("Google login failed");
  };

  // Handle form submission for login or signup
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...");
    navigateToRole();
  };

  const navigateToRole = () => {
    if (role === "Doctor") {
      window.location.href = "/doctor"; // Navigate to Doctor's page
    } else if (role === "Patient") {
      window.location.href = "/patient"; // Navigate to Patient's page
    } else {
      console.log("Role not selected or invalid");
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <section
        id="login"
        className="h-auto md:h-auto lg:min-h-screen bg-gray-200 dark:bg-gray-700 flex flex-col justify-center items-center"
      >
        <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-200">
          {isLogin ? "Log In" : "Sign Up"} {/* Dynamic title based on isLogin */}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-center px-6">
          {isLogin
            ? "Log in to your account to view your personalized dashboard."
            : "Sign up to create a new account and start your journey today."}
        </p>

        <div className="mt-8 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form onSubmit={handleFormSubmit}>
            {/* Shared Fields for Both Login and Signup */}
            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isLogin} // Required only for signup
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Set email in state
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set password in state
                className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Fields for Signup Only */}
            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {/* Role Selection */}
                <label
                  htmlFor="role"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)} // Update role state
                  className="w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">--Select a Role--</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Patient">Patient</option>
                </select>
                {/* Special Input for Role-based Fields */}
                <label
                  htmlFor="LicenseNumber"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  License Number
                </label>
                <input
                  type="text"
                  id="specialInput"
                  value={specialInput}
                  onChange={(e) => setSpecialInput(e.target.value)} // Handle input change
                  disabled={role === "Patient" || role === ""} // Disable input for Patient role
                  className={`w-full mt-2 px-4 py-2 border rounded-md dark:bg-gray-900 text-black ${
                    role === "Patient" || role === ""
                      ? "cursor-not-allowed bg-gray-300 text-gray-400" // Disabled state
                      : "dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder={
                    role === "Patient" || role === ""
                      ? "Disabled for this role" // Placeholder when disabled
                      : "Enter Number"
                  }
                  required
                />
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
                isLogin
                  ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
                  : "bg-green-500 hover:bg-green-600 focus:ring-green-400"
              }`}
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4">
            {/* Google Login Button */}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>
        </div>

        <div className="mt-4">
          {/* Toggle Between Login and Signup Forms */}
          {isLogin ? (
            <p className="text-gray-700 dark:text-gray-300">
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-500 hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default Login;
