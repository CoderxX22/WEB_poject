import React, { useState } from 'react';

const DarkMode = () => {
    // State to toggle dark mode
    const [darkMode, setDarkMode] = useState(false);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark'); // Add/remove 'dark' class from <html>
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