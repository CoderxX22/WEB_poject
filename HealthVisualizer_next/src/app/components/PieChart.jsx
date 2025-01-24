import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieChart = () => {
  const [asthmaCount, setAsthmaCount] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded values for asthma count and total count
  const hardcodedAsthmaCount = 250; // example count of asthma patients
  const hardcodedTotalCount = 10000; // example total patient count

  // Function to simulate fetching data and set hardcoded values
  const handleDataToPie = async () => {
    try {
      setLoading(true);

      // Set hardcoded values for asthma count and total count
      setAsthmaCount(hardcodedAsthmaCount);
      setTotalCount(hardcodedTotalCount);

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
    labels: ["Asthma", "Other Conditions"],
    datasets: [
      {
        data: asthmaCount !== null && totalCount !== null ? [asthmaCount, totalCount - asthmaCount] : [0, 0],
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
