"use client"
import React, { useState } from 'react';
import Info from './components/mainComponent/InfoSection.jsx';
import Contact from './components/mainComponent/ContactSection.jsx';
import StatisticsSection from './components/mainComponent/StatisticsSection.jsx';
import ArticleSection from './components/mainComponent/ArticleSection.jsx';
import Header from './components/mainComponent/Header.jsx';
import Overlay from './components/mainComponent/Overlay.jsx';
const healthImage = '/Statuscope.jpg';

const MainPage = () => {
  // State to toggle dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark'); // Add/remove 'dark' class from <html>
  };

  return (
    <>
      {/* Main wrapper with dynamic background for light/dark mode */}
      <div className="relative min-h-screen md:h-auto sm:h-auto bg-gray-50 dark:bg-gray-800">
        {/* Navbar Section */}
        <Header />
        {/* Main Content Section */}
        <Overlay
            backgroundImage={healthImage}
            paragraphText={["Welcome to the health advisor website, you are welcome to check your health status",<br key="line-break" />,"and get the best advice from our professional doctors."]}
            spanText1="Welcome to"
            spanText2="HealthVisualizer"
            buttonText="About us"
            onClick={() => document.getElementById('info').scrollIntoView({ behavior: 'smooth' })}
        />
      </div>
      {/* Info Section */}
      <Info />
      {/* Contact Section */}
      <Contact />
      {/* Login Section */}
      <StatisticsSection darkMode={darkMode}/>
      {/* Article Section */}
      <ArticleSection />
    </>
  );
};

export default MainPage;
