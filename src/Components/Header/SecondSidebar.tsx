import React from "react";

const SecondSidebar: React.FC = () => {
  return (
    <div className="hidden md:flex items-center justify-between bg-[#1e1f25] p-3 ml-64">
      <span className="text-white font-cdl font-semibold text-lg">Dashboard</span>

      <input
        type="text"
        placeholder="Rechercher..."
        className="flex-1 mx-4 px-4 py-2 rounded bg-[#272c38] text-white font-cdl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26927]"
      />

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-[#272c38] text-white font-cdl rounded hover:bg-[#3a3b44] hover:text-white transition">
          Saison 2024-2025
        </button>
        <button className="px-4 py-2 bg-[#272c38] text-white font-cdl rounded hover:bg-[#3a3b44] hover:text-white transition">
          Saison 2025-2026
        </button>
      </div>
    </div>
  );
};

export default SecondSidebar;
