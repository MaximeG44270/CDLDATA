import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCdlOpen, setIsCdlOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#1e1f25] flex items-center justify-between px-4 h-16 md:hidden top-0 left-0 w-full z-50">
        <span className="font-bold text-lg whitespace-nowrap">
          <span className="text-[#f26927]">CDL</span> <span className="text-white">DATA</span>
        </span>
        <input
          type="text"
          placeholder="Rechercher..."
          className="flex-1 mx-4 px-3 py-1 rounded bg-[#272c38] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26927]"
        />
        <div className="flex flex-col justify-between w-6 h-6 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="block h-1 w-full bg-white rounded"></span>
          <span className="block h-1 w-3/4 bg-white rounded ml-auto"></span>
          <span className="block h-1 w-full bg-white rounded"></span>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-[#1e1f25] text-[#8e9098] flex flex-col p-4 space-y-2 z-40 shadow-lg animate-slideDown">
          {["Dashboard", "Match"].map((item) => (
            <a key={item} href="#" className="px-2 py-2 hover:border-l-[#8e9098] hover:text-[#8e9098] hover:border-[#8e9098] hover:border hover:bg-[#272c38] rounded text-left">
              {item}
            </a>
          ))}
          <div>
            <button onClick={() => setIsCdlOpen(!isCdlOpen)} className="flex items-center w-full px-2 py-2 hover:border-l-[#8e9098] hover:border-[#8e9098] hover:bg-[#272c38] rounded text-left focus:outline-none focus:border-[#8e9098]">
              CDL {isCdlOpen ? <HiChevronUp className="ml-auto" /> : <HiChevronDown className="ml-auto" />}
            </button>
            {isCdlOpen && (
              <div className="flex flex-col ml-4 mt-1">
                {["Classement", "Joueurs", "Équipes"].map((sub) => (
                  <a key={sub} href="#" className="px-2 py-1 hover:bg-[#3a3b44] hover:text-[#8e9098] rounded text-left">{sub}</a>
                ))}
              </div>
            )}
          </div>
          <div>
            <button onClick={() => setIsStatsOpen(!isStatsOpen)} className="flex items-center w-full px-2 py-2 hover:border-l-[#8e9098] hover:bg-[#272c38] rounded text-left focus:outline-none focus:border-[#8e9098]">
              Statistiques {isStatsOpen ? <HiChevronUp className="ml-auto" /> : <HiChevronDown className="ml-auto" />}
            </button>
            {isStatsOpen && (
              <div className="flex flex-col ml-4 mt-1">
                {["Joueurs", "Équipe"].map((sub) => (
                  <a key={sub} href="#" className="px-2 py-1 hover:bg-[#3a3b44] hover:text-[#8e9098] rounded text-left">{sub}</a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;