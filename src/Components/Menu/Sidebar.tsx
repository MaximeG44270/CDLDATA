import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Sidebar: React.FC = () => {
  const [isCdlOpen, setIsCdlOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#1e1f25] text-white h-screen fixed top-0 left-0 z-50">
      <div className="flex items-center justify-center h-16">
        <img src="/public/logo/logo-cdl-data.png" alt="CDL Data Logo" className="h-20 w-auto object-contain"/>
      </div>
      <nav className="flex flex-col mt-32">
        <a href="#" className="px-4 py-2 text-[#8e9098] font-cdl hover:text-[#8e9098] hover:bg-[#272c38] text-left">
          Dashboard
        </a>
        <a href="#" className="px-4 py-2 mt-6 text-[#8e9098] font-cdl hover:text-[#8e9098] hover:bg-[#272c38] text-left">
          Match
        </a>
        <div>
          <button onClick={() => setIsCdlOpen(!isCdlOpen)} className="flex items-center w-full px-4 py-2 mt-6 text-[#8e9098] font-cdl hover:text-[#8e9098] hover:border-[#8e9098] hover:bg-[#272c38] focus:outline-none text-left">
            CDL
            {isCdlOpen ? <HiChevronUp className="ml-auto" /> : <HiChevronDown className="ml-auto" />}
          </button>
          {isCdlOpen && (
            <div className="flex flex-col ml-6 mt-1">
              <a href="#" className="px-4 py-1 text-[#8e9098] hover:text-[#8e9098] font-cdl hover:bg-[#3a3b44] border-l-4 border-l-transparent text-left">
                Classement
              </a>
              <a href="#" className="px-4 py-1 text-[#8e9098] hover:text-[#8e9098] font-cdl hover:bg-[#3a3b44] border-l-4 border-l-transparent text-left">
                Équipe
              </a>
              <a href="#" className="px-4 py-1 text-[#8e9098] hover:text-[#8e9098] font-cdl hover:bg-[#3a3b44] border-l-4 border-l-transparent text-left">
                Joueurs
              </a>
            </div>
          )}
        </div>
        <div>
          <button onClick={() => setIsStatsOpen(!isStatsOpen)} className="flex items-center w-full px-4 py-2 mt-6 text-[#8e9098] font-cdl hover:text-[#8e9098] hover:bg-[#272c38]  hover:border-[#8e9098] focus:outline-none text-left">
            Statistiques
            {isStatsOpen ? <HiChevronUp className="ml-auto" /> : <HiChevronDown className="ml-auto" />}
          </button>
          {isStatsOpen && (
            <div className="flex flex-col ml-6 mt-1">
              <a href="#" className="px-4 py-1 text-[#8e9098] hover:text-[#8e9098] hover:bg-[#3a3b44] font-cdl border-l-4 border-l-transparent text-left">
                Joueurs
              </a>
              <a href="#" className="px-4 py-1 text-[#8e9098] hover:text-[#8e9098] hover:bg-[#3a3b44] font-cdl border-l-4 border-l-transparent text-left">
                Équipe
              </a>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;