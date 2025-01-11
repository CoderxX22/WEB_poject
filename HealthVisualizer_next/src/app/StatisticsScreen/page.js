"use client"
import React from "react";
import Header from "../components/Header";
import PieChart from "../components/PieChart";
import Overlay from "../components/Overlay";

const StatisticsScreen = () => {
    return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-800">
        {/*Navbar Section*/}
        <Header/>
              {/* Main Content Section */}
              <Overlay
                backgroundImage="/Statuscope.jpg"
                spanText1="Statistics"
                spanText2="Page"
                paragraphText="Here You can View The Statistics That Is Relevant To The Health World."
                buttonText=""
                onClick={() => {}}
                >
            </Overlay>
            <PieChart />
    </div>    
    );
};

export default StatisticsScreen