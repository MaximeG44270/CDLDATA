import { useState } from 'react';
import { Menu, X, Home, BarChart3, PlusCircle, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';

export const NavbarreAdmin: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const menuItems = [
    { label: 'Accueil', path: '/admin-cdldata', icon: Home },
    { label: 'Résultats', path: '/admin-resultats', icon: BarChart3 },
    { label: 'Création', path: '/admin-creation', icon: PlusCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#131517] text-white px-4 py-3 shadow-md z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/public/logo/logo-svg.svg" alt="Logo" className="w-8 h-8" />
          <span className="font-semibold text-lg">Admin CDL</span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="p-2 hover:bg-[#2a2d33] rounded-lg transition"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen bg-[#131517] text-white z-50
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 flex flex-col
      `}>
        <div className="hidden lg:flex flex-col items-center px-6 py-5 border-b border-[#2a2d33]">
          <img src="/logo/logo-svg.svg" alt="Logo" className="w-28 h-28 mb-5" />
          <h1 className="font-bold text-xl text-center">Admin CDL</h1>
          <p className="text-sm text-gray-400 text-center">Dashboard</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 mt-16 lg:mt-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${active 
                    ? 'bg-[#2495d8] text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-[#2a2d33] hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-[#2a2d33]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};