import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarreAdmin } from "../../Navbarre/NavbarreAdmin";
import { supabase } from "../../../../lib/supabaseClient";

interface Saison {
  id: number;
  name: string;
  start_date: string | null;
  end_date: string | null;
}

export default function AdminSaison() {
  const [saisons, setSaisons] = useState<Saison[]>([]);
  const [nomSaison, setNomSaison] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSaisons = async () => {
    const { data, error } = await supabase.from("seasons").select("*").order("id");
    if (error) {
      console.error(error);
      setMessage("❌ Erreur lors du chargement des saisons.");
    } else if (data) setSaisons(data);
  };

  const addSaison = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomSaison.trim()) {
      setMessage("⚠️ Veuillez entrer un nom de saison.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.from("seasons").insert([{ name: nomSaison.trim() }]);
    if (error) setMessage("❌ Erreur lors de l'ajout de la saison.");
    else {
      setNomSaison("");
      setMessage("✅ Saison ajoutée !");
      fetchSaisons();
    }
    setIsLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const deleteSaison = async (id: number, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la saison "${name}" ?`)) return;
    setIsLoading(true);
    const { error } = await supabase.from("seasons").delete().eq("id", id);
    if (error) setMessage("❌ Erreur lors de la suppression.");
    else {
      setMessage("🗑️ Saison supprimée !");
      fetchSaisons();
    }
    setIsLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    fetchSaisons();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f1f7] font-cdl pt-16">
      <NavbarreAdmin />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des saisons</h1>
          <button
            onClick={() => navigate("/admin-creation")}
            className="bg-[#2495d8] hover:bg-[#2495d8] text-white px-4 py-2 rounded transition"
          >
            Retour à l’accueil création
          </button>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded text-sm ${
            message.includes("❌") || message.includes("⚠️") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Ajouter une nouvelle saison</h2>
          <form onSubmit={addSaison} className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Nom de la saison (ex: Saison 1)"
              value={nomSaison}
              onChange={(e) => setNomSaison(e.target.value)}
              disabled={isLoading}
              className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#2495d8] disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#2495d8] hover:bg-[#2495d8] text-white px-6 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : "Ajouter"}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Liste des saisons</h2>
          {saisons.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b bg-gray-50">
                    <th className="p-3 text-gray-700">#</th>
                    <th className="p-3 text-gray-700">Nom</th>
                    <th className="p-3 text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {saisons.map((saison, index) => (
                    <tr key={saison.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3 text-gray-600 font-medium">{index + 1}</td>
                      <td className="p-3 text-gray-800">{saison.name}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteSaison(saison.id, saison.name)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-800 hover:underline transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-8">
              Aucune saison trouvée. Commencez par en ajouter une !
            </p>
          )}
        </div>
      </div>
    </div>
  );
}