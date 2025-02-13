import React, { useState, useEffect } from 'react';
import { getCookie, logOut, navigateToRole } from '../../functionality/loginlogic';
import DarkMode from './DarkMode';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const healthIcon = '/pngwing.com.png';

const Header = () => {
    const pathname = usePathname(); // Get the current path
    const isLoginScreen = pathname === "/login"; // Check if on login page
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

    const [dropdownOpen2, setDropdownOpen2] = useState(false);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    

    useEffect(() => {
          // Fetch user info from cookies
          const storedUserName = getCookie("userName");
          const storedUserEmail = getCookie("email");
          const storedUserRole = getCookie("role");
          setUserName(storedUserName);
          setEmail(storedUserEmail);
          setUserRole(storedUserRole);
        }, []);

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
                    <Link href="/" className="text-xl font-bold text-white dark:text-blue-400 lg:hover:text-black lg:dark:hover:text-gray-200 lg:transition-all lg:hover:scale-110">
                        HealthVisualizer
                    </Link>
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
                        <Link
                            href={!isLoginScreen ? "#info" : "#"}
                            onClick={(e) => {
                                if (isLoginScreen) {
                                    e.preventDefault(); // Do nothing if on LoginScreen
                                    return;
                                }
                                e.preventDefault();
                                document.getElementById("info")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                        >
                            Info
                        </Link>
                    </li>
                    {/* Contact Link */}
                    <li>
                        <Link
                            href={!isLoginScreen ? "#contact" : "#"}
                            onClick={(e) => {
                                if (isLoginScreen) {
                                    e.preventDefault(); // Do nothing if on LoginScreen
                                    return;
                                }
                                e.preventDefault();
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                        >
                            Contact
                        </Link>
                    </li>
                    {/* Dropdown Menu for Health */}
                    <li className="relative group">
                        <Link
                            href="#health"
                            className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                        >
                            Health ▼
                        </Link>
                        {/* Dropdown Options */}
                        <ul
                            className="absolute left-0 mt-2 w-40 bg-blue-600 dark:bg-gray-900 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                        >
                            <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                                <Link href={!isLoginScreen ? "#statistics" : "#"}
                                    onClick={(e) => {
                                        if (isLoginScreen) {
                                            e.preventDefault(); // Do nothing if on LoginScreen
                                            return;
                                        }
                                        e.preventDefault();
                                        document.getElementById("statistics")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="block text-gray-200 hover:text-blue-800 dark:text-gray-300"
                                >
                                    Statistics
                                </Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                                <Link href={!isLoginScreen ? "#articles" : "#"} 
                                    onClick={(e) => {
                                        if (isLoginScreen) {
                                            e.preventDefault(); // Do nothing if on LoginScreen
                                            return;
                                        }
                                        e.preventDefault();
                                        document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                                    Articles
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* Login Link */}
                    <li className="relative group">
                        {userName ? (
                            <>
                                <button
                                    onClick={() => setDropdownOpen2(!dropdownOpen2)}
                                    className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                    before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                    before:transition-all before:duration-300 hover:before:w-full"
                                >
                                    {userName} ▼
                                </button>
                                {dropdownOpen2 && (
                                    <ul className="absolute mt-2 w-40 bg-blue-600 dark:bg-gray-900 shadow-lg rounded-lg z-50">
                                        <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                                            <button onClick={() => navigateToRole(userRole, userName, email)}
                                             className="text-gray-100">
                                                Your Profile
                                            </button>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                                            <button onClick={logOut} className="text-gray-100">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </>
                        ) : (
                            <Link href="/pages/LoginScreen" className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                            >Login</Link>
                        )}
                    </li>
                    {/* Dark Mode Toggle Switch */}
                    <DarkMode />
                </ul>

                {/* Mobile Dropdown */}
                {menuOpen && (
                    <div className="lg:hidden absolute top-12 left-0 right-0 bg-blue-600 dark:bg-gray-900 shadow-md z-50">
                        <ul className="flex flex-col items-center space-y-4 py-4">
                            <li>
                                <Link
                                    href={!isLoginScreen ? "#info" : "#"}
                                    onClick={(e) => {
                                        if (isLoginScreen) {
                                            e.preventDefault(); // Do nothing if on LoginScreen
                                            return;
                                        }
                                        e.preventDefault();
                                        document.getElementById("info")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-all"
                                >
                                    Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={!isLoginScreen ? "#contact" : "#"}
                                    onClick={(e) => {
                                        if (isLoginScreen) {
                                            e.preventDefault(); // Do nothing if on LoginScreen
                                            return;
                                        }
                                        e.preventDefault();
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-all"
                                >
                                    Contact
                                </Link>
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
                                            <Link href={!isLoginScreen ? "#statistics" : "#"}
                                                onClick={(e) => {
                                                    if (isLoginScreen) {
                                                        e.preventDefault(); // Do nothing if on LoginScreen
                                                        return;
                                                    }
                                                    e.preventDefault();
                                                    document.getElementById("statistics")?.scrollIntoView({ behavior: "smooth" });
                                                }}
                                                className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                                                Statistics
                                            </Link>
                                        </li>
                                        <li className="px-9 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                                            <Link href={!isLoginScreen ? "#articles" : "#"} 
                                                onClick={(e) => {
                                                    if (isLoginScreen) {
                                                        e.preventDefault(); // Do nothing if on LoginScreen
                                                        return;
                                                    }
                                                    e.preventDefault();
                                                    document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
                                                }} 
                                                className="block text-gray-200 hover:text-blue-800 dark:text-gray-300">
                                                Articles
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li className="relative group">
                                {userName ? (
                                    <>
                                        <button
                                            onClick={() => setDropdownOpen2(!dropdownOpen2)}
                                            className="relative flex justify-center w-full text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 
                                            transition-transform duration-200 
                                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                            before:transition-all before:duration-300"
                                        >
                                            {userName} {!dropdownOpen2 || !menuOpen ? '▼' : '▲'}
                                        </button>
                                        {dropdownOpen2 && (
                                            <ul className="mt-2 flex flex-col items-center space-y-2 bg-blue-500 dark:bg-gray-800 transition-all duration-300 z-50">
                                                <li className="px-5 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                                                    <button onClick={() => navigateToRole(userRole, userName, email)}
                                                    className="text-gray-100">
                                                        Your Profile
                                                    </button>
                                                </li>
                                                <li className="px-9 py-2 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-gray-700">
                                                    <button onClick={logOut} className="text-gray-100">
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link href="/pages/LoginScreen" className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                        before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                        before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                                    >Login</Link>
                                )}
                            </li>
                            <DarkMode />
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;