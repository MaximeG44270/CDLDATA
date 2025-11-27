import React from "react";

interface Props {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  bgColor?: string;
}

export const StatsCard: React.FC<Props> = ({ title, value, description, icon, bgColor = "bg-gray-100" }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500 mt-2">{description}</p>
  </div>
);