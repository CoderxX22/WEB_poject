import React, {useEffect, useState } from 'react';

const DarkMode = () => {
    // State to toggle dark mode
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        // Check if dark mode is saved in localStorage
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode) {
          setDarkMode(savedMode === "true");
        } else {
          // Default mode can be light if nothing is saved
          setDarkMode(false);
        }
      }, []);

    useEffect(() => {
        // Apply dark mode class on the body element based on the state
        if (darkMode) {
          document.body.classList.add("dark");
          localStorage.setItem("darkMode", "true");
        } else {
          document.body.classList.remove("dark");
          localStorage.setItem("darkMode", "false");
        }
      }, [darkMode]);
    
    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };

    return (
    <li>
        <div
        onClick={toggleDarkMode}
        className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300 
                    ${darkMode ? 'justify-end' : 'justify-start'}`}
        >
        <div className="w-5 h-5 bg-white dark:bg-gray-400 rounded-full shadow-md transform transition-transform duration-300"></div>
        </div>
    </li>
    );
};

export default DarkMode;