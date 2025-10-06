import React from "react";

const SecondNav: React.FC = () => {
  return (
    <div className="fixed top-14 left-0 w-full flex justify-center gap-4 p-2 bg-[#1e1f25] border-t border-[#272c38] md:hidden z-40">
      <button className="px-6 py-2 text-xs bg-[#272c38] text-[#8e9098] rounded hover:bg-[#3a3b44] hover:text-white transition">
        Saison 2024-2025
      </button>
      <button className="px-6 py-2 text-xs bg-[#272c38] text-[#8e9098] rounded hover:bg-[#3a3b44] hover:text-white transition">
        Saison 2025-2026
      </button>
    </div>
  );
};

export default SecondNav;
