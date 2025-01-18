"use client"
import React, { useState } from "react"

const BMI_Claculator = () => {
    const [height,setHeight] = useState('');
    const [weight,setWeight] = useState('');
    const [bmi,setBmi] = useState();

    const BMIcalc = () => {
        if (height > 0 && weight > 0){
            const heightToMeter = height /100;
            const bmi_calc = weight/(heightToMeter*heightToMeter).toFixed(1);
            setBmi(bmi_calc);
        }else{
            alert("Please enter you parameters to the BMI calculator")
        }
    };

    return (
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
        <p className="text-gray-600 dark:text-gray-400">
          {bmi ? `Your BMI: ${parseInt(bmi)}` : 'Enter your details to calculate BMI'}
        </p>
      </div>
    );
};



export default BMI_Claculator;