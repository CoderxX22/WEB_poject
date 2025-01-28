import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MedicalPieChart = ({ darkMode }) => {
  const [data, setData] = useState([]);
  const [totalOccurrences, setTotalOccurrences] = useState(0);
  const [loading, setLoading] = useState(true);

  // Specified diseases to show individually
  const SHOW_DISEASES = ["Asthma", "Osteoporosis", "Depression", "Migraine"];

  // Colors for light and dark modes
  const LIGHT_MODE_COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];
  const DARK_MODE_COLORS = ["#4f46e5", "#2563eb", "#0ea5e9", "#22d3ee", "#34d399"];

  // Function to fetch and parse JSON data
  const handleJSONData = async () => {
    try {
      setLoading(true);

      // Fetch the JSON file
      const response = await fetch('/medical_profiles.json');
      const jsonData = await response.json();

      // Initialize counts
      const counts = {
        Asthma: 0,
        Osteoporosis: 0,
        Depression: 0,
        Migraine: 0,
        Other: 0
      };

      // Process each profile in the JSON data
      jsonData.forEach(profile => {
        if (SHOW_DISEASES.includes(profile.disease)) {
          counts[profile.disease] += 1;
        } else {
          counts.Other += 1;
        }
      });

      // Convert counts object to array format for Recharts
      const chartData = Object.entries(counts).map(([name, value]) => ({
        name,
        value
      }));

      setData(chartData);
      setTotalOccurrences(counts.Asthma);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching or parsing JSON:", err);
      setLoading(false);
    }
  };

  // Run handleJSONData function on component mount
  useEffect(() => {
    handleJSONData();
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-2 border rounded shadow-sm ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm">{payload[0].value} patients</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className={`text-xl font-bold mb-4 text-center dark:text-white text-black`}>
        Distribution of Selected Medical Conditions
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading chart...</p>
      ) : (
        <div className="space-y-4">
          <div className={` p-7 h-96 dark:bg-gray-900 bg-white`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={darkMode ? DARK_MODE_COLORS[index % DARK_MODE_COLORS.length] : LIGHT_MODE_COLORS[index % LIGHT_MODE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalPieChart;
