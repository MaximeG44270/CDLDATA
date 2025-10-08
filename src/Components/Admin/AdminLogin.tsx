import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export const AdminLogin: React.FC = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword(form);
    if (error) setError(error.message);
    else navigate('/admin-cdldata');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="flex items-center justify-center h-screen bg-[#131517] font-cdl text-[#8e9098]">
      <form onSubmit={handleLogin} className="w-[90%] max-w-[400px] flex flex-col items-center gap-4">
        <img src="/public/logo/logo-svg.svg" alt="Logo" className="w-24 h-24" />
        <h2 className="text-2xl font-bold">Bienvenue dans CDL Data</h2>
        <h3 className="text-md text-white mb-4">Connecte-toi avec ton compte</h3>
        {['email', 'password'].map((field) => (
          <input key={field} required name={field} type={field} placeholder={field === 'email' ? 'Email' : 'Mot de passe'} value={form[field as keyof typeof form]} onChange={handleChange} className="w-full p-2.5 bg-[#f4f1f7] text-black rounded outline-none" />
        ))}
        <button type="submit" className="w-full p-2.5 bg-[#2495d8] text-white rounded hover:bg-opacity-90">Se connecter</button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};