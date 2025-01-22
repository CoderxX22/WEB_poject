import React, { useState } from 'react';
import DarkMode from './DarkMode';
import Link from 'next/link';

const healthIcon = '/pngwing.com.png';

const Navbar = ({ links }) => {
    // State for the hamburger menu toggle
    const [menuOpen, setMenuOpen] = useState(false);

    // State for managing dropdown visibility
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Function to toggle the hamburger menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                    <Link href="/" passHref>
                        <span className="text-xl font-bold text-white dark:text-blue-400 lg:hover:text-black lg:dark:hover:text-gray-200 lg:transition-all lg:hover:scale-110">
                            HealthVisualizer
                        </span>
                    </Link>
                </div>

                {/* Hamburger Icon for small screens */}
                <div className="md:hidden lg:hidden flex items-center space-x-3" onClick={toggleMenu}>
                    <button className="text-white text-2xl">
                        {menuOpen ? 'X' : '☰'}
                    </button>
                </div>

                {/* Navigation Links */}
                <ul className={`lg:flex md:flex items-center space-x-6 ${menuOpen ? 'hidden' : 'hidden'} lg:block md:block`}>
                    {links.map((link, index) => (
                        <li key={index} className="relative">
                            {link.onClick ? (
                                <button
                                    onClick={link.onClick}
                                    className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                        before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                        before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                                >
                                    {link.name}
                                </button>
                            ) : (
                                <Link href={link.href} passHref>
                                    <span
                                        className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                            before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                            before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                                    >
                                        {link.name}
                                    </span>
                                </Link>
                            )}

                            {/* Dropdown Button */}
                            {link.dropdownItems && (
                                <button
                                    onClick={toggleDropdown}
                                    className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200"
                                >
                                    {link.name}
                                </button>
                            )}

                            {/* Dropdown Menu */}
                            {dropdownOpen && link.dropdownItems && (
                                <div className="absolute right-0 mt-2 bg-blue-600 dark:bg-gray-900 shadow-md z-50 py-2 w-40">
                                    {link.dropdownItems.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={item.onClick}
                                            className="text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 w-full text-left px-4 py-2"
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                    <DarkMode />
                </ul>

                {/* Mobile Dropdown */}
                {menuOpen && (
                    <div className="lg:hidden absolute top-12 left-0 right-0 bg-blue-600 dark:bg-gray-900 shadow-md z-50">
                        <ul className="flex flex-col items-center space-y-4 py-4">
                            {links.map((link, index) => (
                                <li key={index}>
                                    {link.onClick ? (
                                        <button
                                            onClick={link.onClick}
                                            className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                                before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                                        >
                                            {link.name}
                                        </button>
                                    ) : (
                                        <Link href={link.href} passHref>
                                            <span
                                                className="relative text-gray-100 dark:text-gray-300 hover:text-blue-200 dark:hover:text-blue-400 transition-transform duration-200 
                                                    before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-200 dark:before:bg-blue-400 
                                                    before:transition-all before:duration-300 hover:before:w-full hover:scale-105"
                                            >
                                                {link.name}
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                            <DarkMode />
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
