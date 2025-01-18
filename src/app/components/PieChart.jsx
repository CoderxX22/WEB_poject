import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { db } from "../functionality/firebase"; // Correct relative path
import { collection, getDocs, query, where } from "firebase/firestore";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieChart = () => {
  const [asthmaCount, setAsthmaCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Function to fetch data and count asthma patients
  const handleDataToPie = async () => {
    try {
      const healthdataRef = collection(db, "healthdata");
      const q = query(healthdataRef, where("Medical_Condition", "==", 'Asthma'));
      const querySnapshot = await getDocs(q);
      console.log("Asthma query snapshot:", querySnapshot);

      if (!querySnapshot.empty) {
        // Count number of asthma patients
        setAsthmaCount(querySnapshot.docs.length);
        console.log("Number of asthma patients:", querySnapshot.docs.length);
      } else {
        setAsthmaCount(0);
      }

      // Get the total count of patients (all conditions)
      const totalSnapshot = await getDocs(healthdataRef);
      setTotalCount(totalSnapshot.size);
      console.log("Total number of patients:", totalSnapshot.size);
    } catch (err) {
      console.error("Error fetching healthdata:", err);
    }
  };

  // Run handleDataToPie function on component mount
  useEffect(() => {
    handleDataToPie();
  }, []);

  // Pie chart data
  const data = {
    labels: ["Asthma", "Other Conditions"],
    datasets: [
      {
        data: [asthmaCount, totalCount - asthmaCount],
        backgroundColor: ["lightsteelblue", "lightblue"],
        hoverBackgroundColor: ["steelblue", "dodgerblue"],
      },
    ],
  };

  // Pie chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`, // Custom tooltip label format
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl text-black mb-4 text-center dark:text-white">2024 Medical Conditions Chart</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
