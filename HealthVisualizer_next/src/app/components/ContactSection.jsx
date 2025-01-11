import React, { useState } from "react";
const phoneLogo = '/phone-call.png'; // Import the phone icon

const Contact = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        doctor: "",
        phone: "",
    });

    // Handle input changes and update the corresponding field in state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission (currently logs the data to console)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <section
            id="contact"
            className="h-auto md:h-auto lg:h-screen bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center"
        >
            <div className="max-w-screen-xl w-full px-6 py-8 flex flex-col lg:flex-row items-center gap-4">
                {/* Left Section: Contact Info and Introduction */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
                    <h2 className="text-5xl font-bold text-blue-800 dark:text-blue-200 mb-8">
                        Contact Section
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-4">
                        {/* Brief message introducing the contact section */}
                        <i>If you have any questions or need further assistance, feel free to get in touch with us.<br />
                        We're here to help you with any inquiries you may have. Reach out to us via email<br />
                        phone or through the contact form on our website, and we'll respond as soon as possible.<br /><br />
                        Your feedback and questions are important to us!<br /></i>
                    </p>

                    {/* Display phone logo and contact number */}
                    <div className="inline-flex items-center space-x-2 bg-gray-400 dark:bg-gray-600 p-3 rounded-lg shadow-md">
                        <img
                            src={phoneLogo} // Phone icon
                            alt="Phone Icon"
                            className="w-8 h-8 mr-2 filter invert dark:invert-1"
                        />
                        <p className="text-gray-600 dark:text-gray-300"><strong>+1 (555) 123-4567</strong></p>
                    </div>
                </div>

                {/* Right Section: Contact Form */}
                <div className="w-full lg:w-1/2 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        {/* First Name and Last Name Inputs */}
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label
                                    htmlFor="firstName"
                                    className="block text-gray-700 dark:text-gray-300"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Write your name here..."
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="w-1/2">
                                <label
                                    htmlFor="lastName"
                                    className="block text-gray-700 dark:text-gray-300"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Write your last name here..."
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
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
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Write your email here..."
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Doctor Selection Dropdown */}
                        <div className="mb-4">
                            <label
                                htmlFor="doctor"
                                className="block text-gray-700 dark:text-gray-300"
                            >
                                Doctor to Contact
                            </label>
                            <select
                                id="doctor"
                                name="doctor"
                                value={formData.doctor}
                                onChange={handleChange}
                                className="w-full mt-2 px-2 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a doctor</option>
                                <option value="drSmith">Dr. Smith</option>
                                <option value="drJones">Dr. Doe</option>
                                <option value="drTaylor">Dr. Brown</option>
                            </select>
                        </div>

                        {/* Message Text Area */}
                        <div className="mb-4">
                            <label
                                htmlFor="message"
                                className="block text-gray-700 dark:text-gray-300"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows="4"
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
