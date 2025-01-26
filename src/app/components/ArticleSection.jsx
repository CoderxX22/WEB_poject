"use client";
import React, { useState } from "react";

const articles = [
    {
      title: "Mental Health Matters: Ways to Reduce Stress",
      content: `
        Mental well-being is as essential as physical health, yet it is often overlooked in today's fast-paced world.
        Chronic stress, anxiety, and burnout can significantly impact daily life, making it imperative to adopt strategies that promote mental resilience.
        Techniques such as mindfulness, meditation, and deep breathing exercises have been proven effective in calming the mind and enhancing focus.
        Furthermore, staying socially connected, engaging in fulfilling hobbies, and dedicating time to self-care are crucial components of emotional balance.
        A holistic approach that includes regular physical activity, mindful eating, and adequate rest can significantly improve mental well-being.
        Seeking professional guidance when needed is not a weakness but a step toward a healthier and more fulfilling life.
        Article by Sofia Bianchi
      `,
      image: "/mental.png",
    },
    {
      title: "Healthy Eating for a Stronger Body",
      content: `
        A well-balanced diet is the foundation of a strong and resilient body, ensuring sustained energy levels and a fortified immune system.
        Incorporating a rich variety of fruits, vegetables, whole grains, and lean proteins provides essential nutrients necessary for optimal well-being.
        On the other hand, processed foods laden with refined sugars and trans fats should be minimized, as they contribute to weight gain and increase the risk of cardiovascular diseases.
        Hydration is equally crucial—drinking sufficient water daily aids digestion, regulates body temperature, and promotes healthy skin.
        Small, mindful adjustments to dietary habits can yield long-term benefits, making every meal an opportunity to invest in overall health.
        Article by Giovanni Moretti
      `,
      image: "/healthy.png",
    },
    {
      title: "The Benefits of Regular Exercise",
      content: `
        Regular physical activity offers a multitude of health benefits, ranging from improved cardiovascular function to enhanced mental well-being.
        Engaging in activities such as running, swimming, or strength training helps regulate blood pressure, optimize circulation, and significantly lower the risk of chronic diseases.
        Moreover, exercise stimulates the release of endorphins—often referred to as "feel-good" hormones—which play a vital role in reducing stress and boosting overall mood.
        Health experts recommend dedicating at least 150 minutes per week to moderate-intensity exercise to sustain a strong and healthy body.
        Article by Alessandro Ricci
      `,
      image: "/exercise.jpg",
    },
  ];


const ArticleSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevArticle = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const nextArticle = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section
      id="articles"
      className="h-auto md:h-auto lg:min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center px-8 py-16 transition-colors duration-500"
    >
      {/* Header */}
      <h2 className="text-5xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center">
        Health Articles
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12 max-w-3xl">
        <strong>Discover essential health tips to improve your daily well-being.</strong>
      </p>

      {/* Article Wrapper with Gradient Background */}
      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row rounded-lg shadow-lg transition-all duration-500 bg-white dark:bg-gray-900 overflow-hidden">
        
        {/* Left: Article Content */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center sm:text-center md:text-left lg:text-left lg:ml-10">
          <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
            {articles[currentIndex].title}
          </h3>
          <div
            className="text-base sm:text-md text-gray-700 dark:text-gray-300 mt-2"
            dangerouslySetInnerHTML={{ __html: articles[currentIndex].content }} // Render HTML content
          />
        </div>

        {/* Right: Background Image */}
        <div
          className="w-full lg:w-1/2 h-auto min-h-[400px] lg:min-h-[500px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${articles[currentIndex].image})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {/* Gradient Fade Effect */}
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-white dark:from-gray-900 to-transparent"></div>
        </div>


        {/* Arrows for Small Screens (Lowered) */}
        <button
          className="absolute left-4 top-[68%] sm:top-[68%] md:top-1/2 transform -translate-y-1/2 lg:block bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={prevArticle}
        >
          ◀
        </button>

        <button
          className="absolute right-4 top-[68%] sm:top-[68%] md:top-1/2 transform -translate-y-1/2 lg:block bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={nextArticle}
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default ArticleSection;
