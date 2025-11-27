import { NavbarreAdmin } from '../Navbarre/NavbarreAdmin';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f4f1f7]">
      <NavbarreAdmin />

      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Bienvenue dans la zone administrateur</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Utilisateurs</h3>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800">100</p>
              <p className="text-sm text-gray-500 mt-2">Utilisateurs actifs</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Équipes</h3>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800">24</p>
              <p className="text-sm text-gray-500 mt-2">Équipes enregistrées</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Activité</h3>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800">85%</p>
              <p className="text-sm text-gray-500 mt-2">Taux d'activité</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Actions rapides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin-saison" className="px-4 py-3 bg-[#2495d8] text-white rounded-lg hover:bg-[#1a73b8] transition font-medium inline-block text-center">
                Ajouter une saison
              </Link>
              <Link to="/admin-equipe" className="px-4 py-3 bg-[#2495d8] text-white rounded-lg hover:bg-[#1a73b8] transition font-medium inline-block text-center">
                Ajouter une équipe
              </Link>
              <Link to="/admin-joueurs" className="px-4 py-3 bg-[#2495d8] text-white rounded-lg hover:bg-[#1a73b8] transition font-medium inline-block text-center">
                Ajouter un joueur
              </Link>
              <Link to="/admin-maps" className="px-4 py-3 bg-[#2495d8] text-white rounded-lg hover:bg-[#1a73b8] transition font-medium inline-block text-center">
                Ajouter une map
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Activité récente</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Nouvelle équipe ajoutée</p>
                  <p className="text-xs text-gray-500">Il y a 5 minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Résultat de match enregistré</p>
                  <p className="text-xs text-gray-500">Il y a 1 heure</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Joueur mis à jour</p>
                  <p className="text-xs text-gray-500">Il y a 3 heures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}