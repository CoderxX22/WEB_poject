import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, elements } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieChart = () => {
  const [asthmaCount, setAsthmaCount] = useState(null);
  const [diabetesCount, setDiabetesCount] = useState(null);
  const [heartdiseaseCount, setHeartDiseaseCount] = useState(null);
  const [kidneydiseaseCount, setKidneyDiseaseCount] = useState(null); // תיקון פה
  const [lungdiseaseCount, setLungDiseaseCount] = useState(null); // תיקון פה
  const [obesityCount, setObesityCount] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [otherConditionsCount, setOtherConditionsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Hardcoded values for asthma count and total count
  const hardcodedAsthmaCount = 1250; // example count of asthma patients
  const hardcodedDiabetesCount = 1500;
  const hardcodedHeartDiseaseCount = 1000;
  const hardcodedKidneyDiseaseCount = 1720;
  const hardcodedLungDiseaseCount = 700;
  const hardcodedObesityCount = 2008;
  const hardcodedTotalCount = 10000; // example total patient count

  // Function to simulate fetching data and set hardcoded values
  const handleDataToPie = async () => {
    try {
      setLoading(true);

      // Set hardcoded values for asthma count and total count
      setAsthmaCount(hardcodedAsthmaCount);
      setDiabetesCount(hardcodedDiabetesCount);
      setHeartDiseaseCount(hardcodedHeartDiseaseCount);
      setKidneyDiseaseCount(hardcodedKidneyDiseaseCount); // תיקון פה
      setLungDiseaseCount(hardcodedLungDiseaseCount); // תיקון פה
      setObesityCount(hardcodedObesityCount);
      setTotalCount(hardcodedTotalCount);

      const hardcodedOtherConditions = hardcodedTotalCount - (hardcodedAsthmaCount + hardcodedDiabetesCount + hardcodedHeartDiseaseCount + hardcodedKidneyDiseaseCount + hardcodedLungDiseaseCount + hardcodedObesityCount);
      setOtherConditionsCount(hardcodedOtherConditions);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching healthdata:", err);
      setLoading(false);
    }
  };

  // Run handleDataToPie function on component mount
  useEffect(() => {
    handleDataToPie();
  }, []);

  // Pie chart data
  const data = {
    labels: ["Asthma", "Diabetes", "Heart Disease", "Kidney Disease", "Lung Disease", "Obesity", "Other Conditions"],
    datasets: [
      {
        data: [
          asthmaCount !== null ? asthmaCount : 0,
          diabetesCount !== null ? diabetesCount : 0,
          heartdiseaseCount !== null ? heartdiseaseCount : 0,
          kidneydiseaseCount !== null ? kidneydiseaseCount : 0, // תיקון פה
          lungdiseaseCount !== null ? lungdiseaseCount : 0, // תיקון פה
          obesityCount !== null ? obesityCount : 0,
          otherConditionsCount !== null ? otherConditionsCount : 0,
        ],
        backgroundColor: ["lightsteelblue", "lightblue", "lightskyblue", "cornflowerblue", "powderblue", "deepskyblue", "aliceblue"],
        hoverBackgroundColor: ["mediumblue", "royalblue", "dodgerblue", "deepskyblue", "cornflowerblue", "lightseagreen", "turquoise", "steelblue"],
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
      <h2 className="text-xl text-black mb-4 text-center dark:text-white">2025 Medical Conditions Chart</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading chart...</p>
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
};

export default PieChart;