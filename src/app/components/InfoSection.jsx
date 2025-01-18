import React from "react";
const doctor1 = "/doctor1.jpeg";  // Doctor 1 image
const doctor2 = "/doctor2.jpg";   // Doctor 2 image
const doctor3 = "/doctor3.jpeg";  // Doctor 3 image

const Info = () => {
    return (
        <section
            id="info"
            className="h-auto md:h-auto lg:h-screen bg-white dark:bg-gray-900 flex flex-col justify-center items-center px-6 py-12">
            {/* Header */}
            <h2 className="text-5xl font-bold text-blue-800 dark:text-blue-200 mb-8 text-center md:text-center sm:text-center">
                <u>About our team</u> {/* Title of the section */}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
                <strong>
                    Explore detailed information about health insights and get guidance for a healthier lifestyle.<br />
                    Our team of highly experienced and certified doctors is here to provide you with personalized advice<br />
                    leveraging their expertise across various medical fields to ensure you receive the best care and recommendations tailored to your needs.
                </strong>
            </p>

            {/* Cards displaying doctor information */}
            <div className="relative lg:2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {/* Card 1: Dr. Jane Smith */}
                <div className="relative group">
                    <img
                        src={doctor1} // Replace with the correct image path
                        alt="Doctor 1"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 text-white flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-bold mb-2">Dr. Jane Smith</h3>
                        <p className="text-sm mb-4">Cardiologist</p>
                        <p className="text-sm">Contact: +1 555-123-4567</p>
                        <p className="text-sm">Email: jane.smith@example.com</p>
                    </div>
                </div>

                {/* Card 2: Dr. John Doe */}
                <div className="relative group">
                    <img
                        src={doctor2} // Replace with the correct image path
                        alt="Doctor 2"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 text-white flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-bold mb-2">Dr. John Doe</h3>
                        <p className="text-sm mb-4">Pediatrician</p>
                        <p className="text-sm">Contact: +1 555-987-6543</p>
                        <p className="text-sm">Email: john.doe@example.com</p>
                    </div>
                </div>

                {/* Card 3: Dr. Kenneth Brown */}
                <div className="relative group">
                    <img
                        src={doctor3} // Replace with the correct image path
                        alt="Doctor 3"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 text-white flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-bold mb-2">Dr. Kenneth Brown</h3>
                        <p className="text-sm mb-4">Dermatologist</p>
                        <p className="text-sm">Contact: +1 555-654-3210</p>
                        <p className="text-sm">Email: kenneth.brown@example.com</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Info;
