"use client";
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DynamicGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/flu_data_2023_2025.json");
        const jsonData = await response.json();
        
        const formattedData = jsonData.map(item => ({
          date: `${item.month} ${item.year}`,
          cases: item.flu_cases
        }));
        
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            Cases: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg">
        <p className="text-center text-gray-600 dark:text-gray-300">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Flu Cases between 2023 - 2025
        </h2>
        <div className="w-full h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 40,
                left: 40,
                bottom: 65
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fill: 'rgb(75, 85, 99)' }}
                interval={0}
              />
              <YAxis
                tick={{ fill: 'rgb(75, 85, 99)' }}
                tickFormatter={(value) => value.toLocaleString()}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }}/>
              <Line
                type="monotone"
                dataKey="cases"
                name="Flu Cases"
                className="text-2xl font-bold mb-6 text-center dark:stroke-blue-400"
                strokeWidth={3}
                dot={{ r: 4, fill: "#4DB6AC" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DynamicGraph;