import React, { useState } from 'react';
import DarkMode from './DarkMode';
const healthIcon = '/pngwing.com.png';

const Navbar = () => {
    

     // State for the hamburger menu toggle
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to toggle the hamburger menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // State to manage the dropdown visibility
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
    <nav className="bg-blue-600 dark:bg-gray-900 shadow-md relative z-50">
            <div className="flex justify-between items-center w-full px-4 md:px-10 lg:px-16 py-3">
                {/* Logo Section with Icon and Text */}
                <div className="flex items-center space-x-3 ml-5">
                <img
                    src={healthIcon}
                    alt="logo"
                    className="w-8 h-8 filter dark:invert-0 invert" // Invert color for light mode
                />
                <span
                    href="#app"
                    className="text-xl font-bold text-white dark:text-blue-400 hover:text-black dark:hover:text-gray-200 transition-all hover:scale-110"
                >
                    HealthVisualizer
                </span>
                </div>

                {/* Hamburger Icon for small screens */}
                <div className="md:hidden lg:hidden flex items-center space-x-3" onClick={toggleMenu}>
                <button className="text-white text-2xl">
                    {menuOpen ? 'X' : '☰'}
                </button>
                </div>

                {/* Navigation Links */}
                <ul
                className={`lg:flex md:flex items-center space-x-6 ${menuOpen ? 'hidden' : 'hidden'} lg:block md:block`}
                >
                {/* Info Link */}
                <li>
                    <a
                    href="#info"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                    >
                    Info
                    </a>
                </li>
                {/* Contact Link */}
                <li>
                    <a
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                    >
                    Contact
                    </a>
                </li>
                {/* Dropdown Menu for Health */}
                <li className="relative group">
                    <a
                    href="#health"
                    className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                    >
                    Health ▼
                    </a>
                    {/* Dropdown Options */}
                    <ul
                    className="absolute left-0 mt-2 w-40 bg-blue-600 dark:bg-gray-900 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                    >
                    <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                        <a href="#option1" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                        Statistics
                        </a>
                    </li>
                    <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                        <a href="#option2" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                        Charts
                        </a>
                    </li>
                    <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                        <a href="#option2" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                        Update data
                        </a>
                    </li>
                    </ul>
                </li>
                {/* Login Link */}
                <li>
                    <a
                    href="#login"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('login').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                    >
                    Login
                    </a>
                </li>
                {/* Dark Mode Toggle Switch */}
                <DarkMode />
                </ul>

                {/* Mobile Dropdown */}
                {menuOpen && (
                <div className="lg:hidden absolute top-12 left-0 right-0 bg-blue-600 dark:bg-gray-900 shadow-md z-50">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                    <li>
                        <a
                        href="#info"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-all"
                        >
                        Info
                        </a>
                    </li>
                    <li>
                        <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-all"
                        >
                        Contact
                        </a>
                    </li>
                    {/* Dropdown Menu for Health */}
                    <li className="relative">
                        <button
                        onClick={toggleDropdown} // Toggle dropdown visibility
                        className="relative flex justify-center w-full text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 
                                    transition-transform duration-200 
                                    before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                    before:transition-all before:duration-300"
                        >
                        Health {!dropdownOpen || !menuOpen ? '▼' : '▲'}
                        </button>
                        {/* Dropdown Options */}
                        {dropdownOpen && ( // Conditionally render the dropdown based on state
                        <ul className="mt-2 flex flex-col items-center space-y-2 bg-blue-500 dark:bg-gray-800 transition-all duration-300 z-50">
                            <li className="px-7 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                            <a href="#option1" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                                Statistics
                            </a>
                            </li>
                            <li className="px-9 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                            <a href="#option2" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                                Charts
                            </a>
                            </li>
                            <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                            <a href="#option3" className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                                Update data
                            </a>
                            </li>
                        </ul>
                        )}
                    </li>
                    <li>
                        <a
                        href="#login"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('login').scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-all"
                        >
                        Login
                        </a>
                    </li>
                    <DarkMode />
                    </ul>
                </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;