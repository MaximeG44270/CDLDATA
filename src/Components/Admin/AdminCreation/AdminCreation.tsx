import { useNavigate } from "react-router-dom";
import { NavbarreAdmin } from "../Navbarre/NavbarreAdmin";

export default function AdminCreation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f1f7]">
      <NavbarreAdmin />

      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Création</h1>
            <p className="text-gray-600">
              Sélectionnez le type de contenu à créer
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              onClick={() => navigate("/admin-saison")}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Saison</h3>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Créer une nouvelle saison
              </p>
            </div>

            <div
              onClick={() => navigate("/admin-equipe")}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Équipe</h3>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Ajouter une nouvelle équipe
              </p>
            </div>

            <div
              onClick={() => navigate("/admin-joueurs")}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Joueur</h3>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎮</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Créer une fiche joueur
              </p>
            </div>

            <div
              onClick={() => navigate("/admin-maps")}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Map</h3>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🗺️</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Ajouter une nouvelle map
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}