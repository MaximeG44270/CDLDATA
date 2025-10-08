import { supabase } from '../../../lib/supabaseClient';
import { NavbarreAdmin } from '../Navbarre/NavbarreAdmin';

export default function AdminDashboard() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#f4f1f7] font-sans pt-16">
      <NavbarreAdmin />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Tableau de bord</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
        <p className="mb-6">Bienvenue dans la zone administrateur. Ici, tu peux gérer les données sensibles.</p>
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Statistiques</h3>
          <p>Nombre d'utilisateurs : 100</p>
          <p>Activité récente : Aucune alerte</p>
        </div>
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Actions rapides</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Ajouter un utilisateur</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Gérer les rôles</button>
          </div>
        </div>
      </div>
    </div>
  );
}