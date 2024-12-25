import React, { useState } from "react";

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
            <div className="max-w-screen-xl w-full px-6 py-8 flex flex-col lg:flex-row items-center">
                {/* Left Section: Info */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                        Contact Section
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-4">
                        Feel free to reach out to us for any inquiries or support. We're here to help!
                    </p>
                </div>

                {/* Right Section: Contact Form */}
                <div className="w-full lg:w-1/2 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
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
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
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
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

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
                                <option value="drJones">Dr. Jones</option>
                                <option value="drTaylor">Dr. Taylor</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 dark:text-gray-300"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

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
