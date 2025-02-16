"use client"
import React from "react";
import PieChart from "../../components/mainComponent/PieChart";
import DynamicGraph from "./DynamicLinearGraph";

const StatisticsSection = (darkMode) => {
    return (
        <section
        id="statistics"
        className="h-auto md:h-auto lg:h-1600 bg-white dark:bg-gray-900 flex flex-col justify-center items-center px-6 py-12">
        {/* Header */}
        <h2 className="text-6xl font-bold text-blue-800 dark:text-blue-200 mb-8 text-center md:text-center sm:text-center">
            Statistics section {/* Title of the section */}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            <strong>
            Explore vital health stats, including life expectancy, disease trends, and fitness habits<br></br> 
            all backed by data to enhance global wellness understanding.
            </strong>
        </p>
        <PieChart darkMode={darkMode}/>
        <h2 className="text-xl text-black mb-4 text-center dark:text-white">
        Flu Cases Over Time
        </h2>
        <DynamicGraph/>
        </section>  
    );
};

export default StatisticsSection;
