import { NavbarreAdmin } from '../Navbarre/NavbarreAdmin';

export default function AdminResultats() {
  return (
    <div className="min-h-screen bg-[#f4f1f7] font-sans pt-16">
      <NavbarreAdmin />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Résultats</h1>
        <div className="bg-white p-4 rounded shadow">
          <p>Liste des résultats récents ici...</p>
        </div>
      </div>
    </div>
  );
}