import React, { useState } from "react";
import phoneLogo from './phone-call.png';


const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        doctor: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, like sending data to a server
        console.log("Form Data:", formData);
    };

    return (
        <section
            id="contact"
            className="h-screen bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center"
        >
            <div className="max-w-screen-xl w-full px-6 py-8 flex flex-col lg:flex-row items-center gap-4">
                {/* Left Section: Info */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                        Contact Section
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-4">
                    <i>Feel free to reach out to us for any inquiries or support. We're here to help!<br /><br />
                    Whether you have questions about our services, need assistance with an ongoing<br />
                    issue or simply want to share your feedback, don’t hesitate to get in touch.<br />
                    Our team is dedicated to providing prompt and friendly support to ensure your experience with us is exceptional.<br />
                    Let us know how we can assist you today!
                    </i></p>

                    {/* Phone Logo and Fake Phone Number */}
                    <div className="inline-flex items-center space-x-2 bg-gray-400 dark:bg-gray-800 p-3 rounded-lg shadow-md">
                        <img
                            src={phoneLogo} // Update this path to match your file location
                            alt="Phone Icon"
                            className="w-8 h-8 mr-2 filter invert dark:invert-1"
                        />
                        <p className="text-gray-600 dark:text-gray-300"><strong>+1 (555) 123-4567</strong></p>
                    </div>
                </div>

                {/* Right Section: Contact Form */}
                <div className="w-full lg:w-1/2 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        {/* Row 1: First Name and Last Name */}
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
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Row 2: Email */}
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
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Row 3: Choose a Doctor */}
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
                                className="w-full mt-2 px-2 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a doctor</option>
                                <option value="drSmith">Dr. Smith</option>
                                <option value="drJones">Dr. Doe</option>
                                <option value="drTaylor">Dr. Brown</option>
                            </select>
                        </div>

                        {/* Row 4: Free Text Input */}
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
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
