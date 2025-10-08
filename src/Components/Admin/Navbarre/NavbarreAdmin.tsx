import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NavbarreAdmin: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Accueil', path: '/admin-cdldata' },
    { label: 'Résultats', path: '/admin-resultats' },
    { label: 'Création', path: '/admin-creation' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#131517] text-white flex items-center justify-between px-6 py-3 shadow-md z-50">
      <div className="flex items-center gap-2">
        <img src="/public/logo/logo-svg.svg" alt="Logo" className="w-10 h-10" />
      </div>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-center">
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
      {open && (
        <div className="absolute top-full right-0 w-48 bg-[#131517] flex flex-col items-center py-3 shadow-lg rounded-bl-2xl">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className="w-full py-2 text-sm hover:bg-[#8e9098] rounded transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};