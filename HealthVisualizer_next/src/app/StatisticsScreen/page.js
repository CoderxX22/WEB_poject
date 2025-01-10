"use client"
import React from "react";
import Navbar from "../components/Navbar";
import PieChart from "../components/PieChart";

const StatisticsScreen = () => {
    return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
        {/*Navbar Section*/}
        <Navbar/>
              {/* Main Content Section */}
        <div className="relative">
            {/* Background Section */}
            <div className="w-full h-[60vh] bg-cover bg-center" style={{backgroundImage: `url('/Statuscope.jpg')`,filter: "blur(2px)",zIndex: 1,}}>
                <div className="w-full h-full bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800"></div>
            </div>
                {/* Overlay Content Section */}
            <div className="absolute top-2/3 w-full text-center z-10 px-4">
                <h1 className="text-6xl font-extrabold mb-6 text-gray-800 dark:text-gray-100">
                Statistics 
                    <span className="text-blue-600 dark:text-blue-400"> Page</span>
                </h1>
                <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                    Here You can View The Statistics That Is Relevent To The Health World.
                </p>
                <PieChart/>
            </div>
        </div>
    </div>    );};

export default StatisticsScreen