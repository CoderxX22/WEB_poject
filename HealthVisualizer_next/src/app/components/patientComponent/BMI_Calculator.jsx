"use client"
import React, { useState } from "react"
import { UpdateBMI } from "../../functionality/getPatientData";
import { getCookie } from "../../functionality/loginlogic";
import { useEffect } from "react";

const BMI_Claculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState();
    const [category, setCategory] = useState('');
    const [explanation, setExplanation] = useState('');
    const [advise, setAdvis] = useState('');
    const [savedBmi, setSavedBmi] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const storedUserName = getCookie("userName");
        const storedUserEmail = getCookie("email");
        setUserEmail(storedUserEmail);
        setUserName(storedUserName || "Guest");
      }, []);

    const BMIcalc = () => {
        if (height > 0 && weight > 0) {
            const heightToMeter = height / 100;
            const bmi_calc = (weight / (heightToMeter * heightToMeter)).toFixed(1);
            setBmi(bmi_calc);
            if (bmi_calc < 18.5) {
                setCategory("Under Weight");
                setExplanation("It falls well below the normal BMI range (18.5–24.9), indicating that the person may not have enough body fat for optimal health. This can be associated with various health risks, such as nutrient deficiencies, weakened immune function, and potential organ dysfunction. A BMI this low often requires medical attention and a professional evaluation to understand the underlying causes and determine the appropriate steps for gaining weight and improving health.");
                setAdvis("Consult a Healthcare Professional: It's crucial to see a doctor or nutritionist to rule out any medical conditions (like thyroid issues, gastrointestinal problems, or eating disorders) and receive personalized guidance.\n\nFocus on Nutrient-Dense Foods: Instead of just increasing calorie intake, aim for a balanced diet that includes healthy fats, proteins, and complex carbohydrates. Foods like nuts, seeds, avocados, lean meats, and whole grains are good options.");
            }
            else if (bmi_calc >= 18.5 && bmi_calc < 25.0) {
                setCategory("Normal Weight");
                setExplanation("This indicates a healthy weight relative to height and is generally associated with a lower risk of developing health issues like heart disease, diabetes, and high blood pressure. It suggests that the person has a balanced amount of body fat and muscle, which is generally good for overall health. However, it’s still important to consider other factors, such as muscle mass, diet, and physical activity levels, to get a full picture of a person’s health.");
                setAdvis("Maintain a Balanced Diet: Continue eating a diverse and balanced diet with plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Focus on whole foods to ensure proper nutrition.\n\nRegular Exercise: Stay physically active by incorporating both cardiovascular and strength training exercises into your routine. Aim for at least 150 minutes of moderate-intensity activity per week, along with muscle-strengthening activities on two or more days.");
            }
            else if (bmi_calc >= 25.0 && bmi_calc < 30.0) {
                setCategory("Over Weight");
                setExplanation("While being overweight doesn’t necessarily mean a person is unhealthy, it can increase the risk of developing conditions like heart disease, high blood pressure, type 2 diabetes, and certain types of cancer. It's important to address factors such as diet, physical activity, and overall lifestyle to manage weight and reduce potential health risks. A healthcare provider can offer guidance on how to approach weight management in a safe and effective way.");
                setAdvis("Consult a Healthcare Professional: It's important to start by consulting a doctor or nutritionist to assess any underlying health conditions and get personalized advice for weight loss. They can help set realistic goals and create a plan tailored to the individual's needs.\n\nFocus on Nutrition: Prioritize a balanced, nutrient-dense diet with an emphasis on whole foods like vegetables, fruits, lean proteins (chicken, fish, legumes), whole grains (brown rice, quinoa, oats), and healthy fats (avocados, nuts, olive oil). Reduce processed and high-calorie foods, sugary drinks, and refined carbs.");
            } else {
                setCategory("Obesity");
                setExplanation("This indicates that the person has a significantly higher level of body fat compared to what is considered healthy for their height. Obesity is associated with an increased risk of developing serious health conditions, such as heart disease, stroke, type 2 diabetes, high blood pressure, and certain cancers. It is important to seek medical advice to assess the individual’s overall health and explore options for weight management. Addressing factors such as diet, physical activity, and possibly medical or psychological support can be important steps in managing obesity and reducing health risks.");
                setAdvis("Consult Healthcare Professionals: Its essential to work with a healthcare provider, such as a doctor, nutritionist, or therapist, to assess any medical conditions contributing to obesity and to develop a personalized plan. They can help set realistic goals and offer medical support if necessary, including recommendations for weight loss programs, medications, or even surgery if appropriate.");
            }
        } else {
            alert("Please enter your parameters to the BMI calculator");
        }
    };

    const saveBmi = async (userEmail) => {
      try {
          // Save the BMI to Firestore
          setSavedBmi(bmi);
          await UpdateBMI(userEmail, bmi);
          alert(`Your BMI (${bmi}) has been saved successfully!`);
      } catch (error) {
          alert("Failed to save BMI");
      }
    };

    return (
        <section id="bmi - claculator" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                BMI Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">BMI Calculator</h3>
                    <div className="mt-4">
                        <label className="block text-gray-600 dark:text-gray-400 mb-2">
                            Weight (kg):
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
                                placeholder="Enter your weight"
                            />
                        </label>
                        <label className="block text-gray-600 dark:text-gray-400 mb-2">
                            Height (cm):
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
                                placeholder="Enter your height"
                            />
                        </label>
                        <button
                            onClick={BMIcalc}
                            className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Calculate BMI
                        </button>
                    </div>
                    {bmi && (
                        <button
                            onClick={() => saveBmi(userEmail)}
                            className="w-full mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Save My BMI
                        </button>
                    )}
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">BMI Results</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {bmi ? `Your BMI: ${parseInt(bmi)}` : 'Enter your details to calculate BMI'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {category ? `Your Category is: ${category}` : " "}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {explanation ? `Explanation: ${explanation}` : " "}
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">What should I do next ?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {advise ? `${advise}` : " "}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BMI_Claculator;
