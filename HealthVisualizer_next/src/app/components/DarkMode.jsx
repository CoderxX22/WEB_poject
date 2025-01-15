import React, { useEffect, useState } from 'react';

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Always reset to light mode on server start
    if (!sessionStorage.getItem('sessionInitialized')) {
      // Mark session as initialized to prevent resetting on navigation
      sessionStorage.setItem('sessionInitialized', 'true');
      setDarkMode(false);
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false'); // Clear any previous dark mode state
    } else {
      // Retain dark mode state within the same session
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'true') {
        setDarkMode(true);
        document.body.classList.add('dark');
      } else {
        setDarkMode(false);
        document.body.classList.remove('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
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
