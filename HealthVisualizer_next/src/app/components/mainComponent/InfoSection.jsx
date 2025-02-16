import React from "react";
const Maor = "/Maor.png";  // Doctor 1 image
const Nir = "/Nir.png";   // Doctor 2 image
const Daniel = "/Daniel.png";  // Doctor 3 image
const Bar = "/Bar.png";  // Doctor 3 image


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
            <div className="relative lg:2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Card 1: Maor Siboni */}
                <div className="relative group">
                    <img
                        src={Maor} // Replace with the correct image path
                        alt="Maor"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 text-white flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-bold mb-2">Maor Siboni</h3>
                        <p className="text-sm mb-4">UI Developer</p>
                        <p className="text-sm">Email: Maor.Siboni@e.braude.ac.il</p>
                    </div>
                </div>

                {/* Card 2: Nir Froimovich */}
                <div className="relative group">
                    <img
                        src={Nir} // Replace with the correct image path
                        alt="Nir"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 text-white flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-bold mb-2">Nir Froimovich</h3>
                        <p className="text-sm mb-4">Backend developer</p>
                        <p className="text-sm">Email: Nir.Froimovich@e.braude.ac.il</p>
                    </div>
                </div>

                {/* Card 3: Daniel Ayash */}
                <div className="relative group">
                    <img
                        src={Daniel} // Replace with the correct image path
                        alt="Daniel"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 text-white flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-bold mb-2">Daniel Ayash</h3>
                        <p className="text-sm mb-4">Fullstack Developer</p>
                        <p className="text-sm">Email: Daniel.Ayash@e.braude.ac.il</p>
                    </div>
                </div>

                {/* Card 4: Bar Harush */}
                <div className="relative group">
                    <img
                        src={Bar} // Replace with the correct image path
                        alt="Bar"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    {/* Overlay with information */}
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 text-white flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-bold mb-2">Bar Harush</h3>
                        <p className="text-sm mb-4">QA Developer</p>
                        <p className="text-sm">Email: Bar.Harush@e.braude.ac.il</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Info;
